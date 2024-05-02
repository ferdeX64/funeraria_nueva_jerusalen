# Nueva Jerusalén
"Nueva Jerusalén" es una aplicación web destinada a facilitar la gestión de trabajo, monitorear tareas y pagos pendientes, así como también administrar clientes. Aquí tienes una descripción de las características principales que podría tener esta aplicación:

Características principales:

Gestión de órdenes de trabajo:
La aplicación permite a los usuarios crear y administrar órdenes de trabajo para diferentes proyectos o tareas.
Cada orden de trabajo incluye detalles como el nombre del proyecto, descripción, fecha de inicio, fecha de entrega, prioridad, asignación de personal, etc.
Los usuarios pueden agregar comentarios, archivos adjuntos y actualizar el estado de las órdenes de trabajo a medida que avanzan.
Monitoreo de tareas y secretaría:
La aplicación proporciona una interfaz para monitorear el progreso de las tareas asignadas a los miembros del equipo.
Los usuarios pueden ver el estado actual de cada tarea, los plazos de entrega y recibir notificaciones automáticas cuando se completen las tareas o cuando haya algún problema.
Gestión de deudas:
La aplicación registra las deudas pendientes, como pagos de clientes atrasados, facturas impagas, etc.
Los usuarios pueden ver un resumen de sus deudas pendientes, así como recibir alertas automáticas cuando se acerque la fecha de vencimiento de un pago.
Recordatorio de entregas:
La aplicación cuenta con un sistema de recordatorio para notificar a los usuarios sobre las próximas entregas de proyectos o tareas.
Los usuarios pueden establecer recordatorios personalizados y recibir notificaciones por correo electrónico o mensajes en la aplicación.
Gestión de clientes:
La aplicación almacena información detallada sobre los clientes, incluyendo nombres, información de contacto, historial de proyectos, notas, etc.
Los usuarios pueden ver y editar la información de los clientes, así como realizar un seguimiento de las comunicaciones y transacciones con ellos.
Interfaz de usuario intuitiva:
La aplicación cuenta con una interfaz de usuario fácil de usar y bien organizada, que permite a los usuarios navegar fácilmente por las diferentes funciones y realizar tareas de manera eficiente.


## Características
- Vue 3.2, Vite2, TypeScript
- [pinia](https://github.com/vuejs/pinia) store
- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`vite-plugin-vue-i18n`](https://github.com/intlify/vite-plugin-vue-i18n) - Vite plugin for Vue I18n
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import

- Tailwind CSS 3.0 w/ following plugins preinstalled:
  - `@tailwindcss/aspect-ratio`
  - `@tailwindcss/line-clamp`
  - `@tailwindcss/typography`
  - `@tailwindcss/forms`
  - `firefox`-variant
  - `daisyui`
- PostCSS 8 w/ `postcss-nesting` plugin and `cssnano` for minimizing production CSS
- Eslint
- Prettier
- Alias `@` to `<project_root>/src`
- Manually configured global components in `main.ts`
- Cypress.io e2e tests (configured similarly to `vue-cli`)
- Cypress.io component tests
- GitHub workflows
  - Dependabot
  - Automated e2e tests
  - Automated component tests
- GitLab CI
  - Automated e2e tests
  - Automated component tests

