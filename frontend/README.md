Around The U.S. - React
Descripción

Este proyecto es una migración de la aplicación Around The U.S. a React. En esta versión se implementó una arquitectura basada en componentes para hacer la aplicación más modular, reutilizable y fácil de mantener.

Actualmente permite visualizar el perfil del usuario, mostrar una lista de tarjetas con datos de prueba e interactuar con diferentes ventanas emergentes (popups).

Funcionalidades
Visualización del perfil del usuario.
Edición del perfil mediante un popup.
Cambio de avatar mediante un popup.
Apertura del formulario para agregar una nueva tarjeta.
Renderizado dinámico de tarjetas utilizando map().
Apertura de una imagen en un popup al hacer clic sobre una tarjeta.
Cierre de los popups mediante el botón de cerrar.
Tecnologías utilizadas
React
JavaScript (ES6+)
JSX
CSS3
HTML5
Vite
Conceptos de React aplicados
Componentes reutilizables
Props
children
useState
Renderizado condicional
Desestructuración de objetos
Renderizado de listas con map()
Uso de key en listas
Estructura del proyecto
src/
├── components/
│ ├── Main/
│ ├── Header/
│ ├── Footer/
│ └── ...
├── images/
├── vendor/
└── index.jsx
Instalación

Clona el repositorio:

git clone <URL_DEL_REPOSITORIO>

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

npm run dev
Próximas mejoras

En los siguientes sprints se implementarán:

Integración con una API.
Edición del perfil.
Cambio de avatar.
Creación de nuevas tarjetas.
Sistema de "Me gusta".
Eliminación de tarjetas.
Validación de formularios.
Persistencia de datos en el servidor.
