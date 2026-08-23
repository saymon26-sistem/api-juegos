require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;
const SCHEMA = process.env.DB_SCHEMA || 'juegos';

async function iniciar() {
  try {
    // 1. Verifica que la conexión a PostgreSQL funciona
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // 2. Se asegura de que el schema de esta API exista antes de sincronizar
    //    (además del CREATE SCHEMA + GRANT que se hace una sola vez al
    //    provisionar el servidor, esto es una salvaguarda extra).
    await sequelize.createSchema(SCHEMA, {}).catch(() => {
      // Si el schema ya existe, createSchema lanza error — lo ignoramos.
    });

    // 3. Sincroniza los modelos con la base de datos:
    //    - Si la tabla no existe, la crea.
    //    - Si el modelo cambió (nuevos campos), altera la tabla.
    //    - No borra datos existentes.
    await sequelize.sync({ alter: true });
    console.log(`Modelos sincronizados con la base de datos (schema: ${SCHEMA}).`);

    // 4. Arranca el servidor HTTP
    app.listen(PORT, () => {
      console.log(`api-juegos corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1); // sale con código de error para que Docker pueda reiniciar el contenedor
  }
}

iniciar();
