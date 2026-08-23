# api-juegos

CRUD de videojuegos (`titulo`, `genero`, `año`, `plataforma`, `disponible`), migrado de un
array en memoria a persistencia real con **Sequelize + PostgreSQL**.

Parte del proyecto final "tres APIs integradas en la nube": esta es la **primera API**
(componente 1) — las otras dos (`api-usuarios`, `api-resenas`) viven en repos separados y
se conectan al mismo servidor PostgreSQL administrado, cada una en su propio schema.

## Variables de entorno

Ver `.env.example`. `DB_SCHEMA` debe ser `juegos` — es el schema dedicado de esta API dentro
del servidor PostgreSQL compartido.

## Cómo levantarlo local

```bash
docker-compose up --build
```

Esto levanta la API junto a un PostgreSQL local de prueba (no es el servidor de Azure).

## Endpoints

- `GET /juegos` — listar todos
- `GET /juegos/:id` — obtener uno
- `POST /juegos` — crear
- `PUT /juegos/:id` — actualizar
- `DELETE /juegos/:id` — eliminar

## CI/CD

`.github/workflows/deploy.yml` construye la imagen, la sube a Azure Container Registry y
despliega/actualiza el contenedor en Azure Container Instances en cada push a `main`.
