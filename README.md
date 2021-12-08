### Bootplate
Proyecto de arranque de sails js v1.0.2 y angular v7.0

---

# Información

## Descripción

El proyecto tiene las configuraciones necesarias para el entorno de desarrollo y produción. Para depurar el Front-End se hace por el puerto 4200 que es el que vien por defecto en Angular. Para verificar el build de producción del Front-End se puede hacer por el puerto 1337 que es el que utiliza Sails. El back-End y el Front-End se comunican por un proxy, de tal forma que no es necesario apuntar las peticiones de Angular al puerto 1337 de Sails.

## Dependencias

El proyecto tiene todas las dependencias de Sails y Angular  (Las dependencias de Serie)

# Desarrollo
El desarrollo del Back-End se hace desde la raíz del proyecto. El proyecto de Angular se encuentra localizado en el directorio assest/app.


# Instalación
Es necesario tener las dependencias de los frameworks principales como instalaciones globales.
* `npm install sails -g `: Sails para el Back-End (Si da problemas, mirar la versión que se indica en package.json)
* `npm install -g @angular/cli`: Angular para el Front-end (Si da problemas, mirar la versión que se indica en package.json)

# Arrancar
* `npm run start`: Arranca los dos proyectos en el entorno de desarrollo
* `npm run build`: Empaqueta la aplicación web(Angular) para producción, la misma está configurada para que se despliegue en el directorio assets/dist/.
* `npm run dev`: Inicia el Back (Sails) en desarrollo
* `npm run prod`: Inicial al Back-End para producción (Es necesario comprobar la configuración de despliegue)

## Copyleft y licencia

El trabajo es una recopilación de documentación libre que se puede encontrar en internet, por lo tanto, quien use el proyecto será libre de:

* Usarlo sin ninguna limitación.
* Libertad de estudio (ver cómo está hecho el trabajo).
* (re)distribuir cuantas copias desee.
* Modificarla de la manera que crea conveniente.

Copyleft (c) 2018 by Mamisho
