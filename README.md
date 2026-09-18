# Tripleten web_project_api_full

## Descripción del proyecto

Around es una red social de fotografías donde los usuarios pueden registrarse, iniciar sesión, editar su perfil y avatar, y compartir tarjetas con imágenes de lugares que han visitado. Los usuarios pueden dar "me gusta" a las tarjetas de otros y eliminar únicamente las tarjetas que ellos mismos crearon.

Este proyecto conecta un front-end en React con un back-end propio construido en Node.js/Express, sustituyendo el uso de datos simulados por una API real con autenticación de usuarios mediante JSON Web Tokens (JWT).

### Funcionalidad

- Registro e inicio de sesión de usuarios (correo electrónico y contraseña)
- Autenticación mediante JWT con expiración de 7 días
- Edición de perfil (nombre, descripción) y avatar
- Creación y eliminación de tarjetas (el usuario solo puede eliminar las suyas)
- Sistema de "me gusta" en las tarjetas
- Manejo centralizado de errores
- Validación de datos de entrada con Celebrate/Joi
- Registro de solicitudes y errores en archivos de log
- Despliegue en servidor remoto con dominio propio, HTTPS y recuperación automática ante caídas

## Tecnologías y técnicas utilizadas

**Back-end**

- Node.js y Express
- MongoDB con Mongoose
- JSON Web Tokens (jsonwebtoken) para autenticación
- bcryptjs para el hash de contraseñas
- Celebrate y Joi para validación de solicitudes
- Validator para validación de correos electrónicos y URLs
- Winston / logging propio para request.log y error.log
- ESLint para estilo de código

**Front-end**

- React
- Vite
- CSS

**Infraestructura y despliegue**

- Google Cloud Platform (Compute Engine)
- nginx como proxy inverso y servidor de archivos estáticos
- PM2 para la gestión y recuperación automática del proceso de Node.js
- Let's Encrypt (Certbot) para certificados HTTPS
- DuckDNS para el dominio del proyecto

## URL de la aplicación

https://around-kevin-api.duckdns.org

## Cómo ejecutar el proyecto en local

### Back-end

```
cd backend
npm install
npm run dev
```

### Front-end

```
cd frontend
npm install
npm run dev
```
