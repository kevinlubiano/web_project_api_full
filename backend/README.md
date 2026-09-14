# TripleTen web_project_around_express

## Around Express API

Este proyecto es una API desarrollada con **Node.js**, **Express** y **MongoDB** como parte del programa de TripleTen.  
Permite gestionar usuarios y tarjetas, con validaciones y manejo de errores.

---

## ✨ Funcionalidades

### Usuarios

- `GET /users` → devuelve todos los usuarios.
- `GET /users/:userId` → devuelve un usuario por su \_id.
- `POST /users` → crea un nuevo usuario.
- `PATCH /users/me` → actualiza el perfil del usuario.
- `PATCH /users/me/avatar` → actualiza el avatar del usuario.

### Tarjetas

- `GET /cards` → devuelve todas las tarjetas.
- `POST /cards` → crea una tarjeta con `name` y `link`.
- `DELETE /cards/:cardId` → elimina una tarjeta por su \_id.
- `PUT /cards/:cardId/likes` → da like a una tarjeta.
- `DELETE /cards/:cardId/likes` → quita el like (dislike).

### Manejo de errores

- `400` → datos inválidos.
- `404` → recurso no encontrado.
- `500` → error interno del servidor con mensaje: `"An error has occurred on the server"`.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- JavaScript (ES6)
- ESLint con configuración **airbnb-base**
- Git y GitHub

Kevin Lubiano
