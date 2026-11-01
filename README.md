# Asignación de Vínculos Laborales

## Descripción del proyecto

Este proyecto consiste en una aplicación móvil para consultar empleados y administrar sus vínculos laborales.

La aplicación está desarrollada con React Native, Expo y TypeScript. Para guardar y consultar la información utilizamos una API desarrollada en ASP.NET Core, conectada a una base de datos SQL Server.

Durante la cursada fuimos agregando funcionalidades y realizando pruebas para comprobar que las operaciones funcionaran correctamente.

## Integrantes

- Guzmán Paulo David
- Menozzi Camila Florencia

## Funcionalidades desarrolladas

Para el proyecto trabajamos sobre cuatro funcionalidades principales:

| N.º | Funcionalidad | Estado |
|---|---|---|
| 1 | Consultar empleados y sus vínculos laborales | Terminada |
| 2 | Asignar un vínculo laboral | Terminada |
| 3 | Anular un vínculo laboral | Terminada |
| 4 | Modificar un vínculo laboral | Terminada |

### 1. Consulta de empleados

Al ingresar a la aplicación se muestra un listado de empleados con su nombre, apellido, DNI y vínculo laboral.

También se puede ver si el empleado tiene un vínculo activo o si actualmente no tiene ninguno asignado.

Para obtener esta información utilizamos:

`GET /api/Empleado`

Además, agregamos un buscador para encontrar empleados por nombre, apellido o DNI.

### 2. Asignación de vínculos laborales

Cuando un empleado no tiene un vínculo activo, se puede seleccionar la opción para asignarle uno.

La aplicación muestra los tipos de vínculos disponibles y permite elegir el correspondiente.

Para consultar los tipos de vínculos utilizamos:

`GET /api/VinculoLaboral`

Para registrar la asignación utilizamos:

`POST /api/EmpleadoVinculoLaboral`

Una vez realizada la operación, se actualiza el listado y se muestra el vínculo asignado.

### 3. Anulación de vínculos

También implementamos la posibilidad de anular un vínculo laboral.

La operación se realiza mediante:

`PUT /api/EmpleadoVinculoLaboral/anular/{id}`

En este caso no se elimina el registro de la base de datos, sino que se modifica su estado.

Después de anularlo, el empleado vuelve a aparecer sin vínculo activo y puede recibir una nueva asignación.

### 4. Modificación de vínculos

Esta fue una de las funcionalidades que completamos después del primer parcial.

Permite cambiar el vínculo laboral que tiene asignado un empleado por otro de los disponibles.

Para realizar el cambio utilizamos:

`PUT /api/EmpleadoVinculoLaboral/{id}`

Después de guardar la modificación, la aplicación vuelve a mostrar los datos actualizados.

Probamos esta operación tanto durante el desarrollo como desde el celular Android.

## Mejoras realizadas para el segundo parcial

Además de completar la modificación de vínculos, trabajamos sobre algunos puntos que habían quedado pendientes en la primera entrega.

### Buscador de empleados

Agregamos un campo de texto para buscar empleados por nombre, apellido o DNI, sin tener que recorrer todo el listado.

### Selección de fotografías

Incorporamos un botón que permite seleccionar una fotografía de la galería del celular y mostrarla dentro de la aplicación.

Para esta función utilizamos `expo-image-picker`.

### Compartir información

Agregamos una opción para compartir información utilizando la función `Share` de React Native.

Al presionar el botón, Android muestra las aplicaciones disponibles para compartir.

### Navegación

Organizamos la aplicación en dos pestañas:

- **Empleados:** muestra el listado y las opciones para administrar vínculos.
- **Vínculos:** muestra los tipos de vínculos laborales disponibles.

También reemplazamos la pantalla Explore que venía como ejemplo en Expo por contenido relacionado con nuestro proyecto.

## Componentes utilizados

Durante el desarrollo trabajamos con distintos componentes y recursos de React Native, entre ellos:

- `View` y `Text` para mostrar la información.
- `TextInput` para el buscador.
- `Pressable` para los botones.
- `StyleSheet` para los estilos.
- `Image` para mostrar fotografías.
- `SafeAreaView` y el manejo de áreas seguras.
- `ThemeProvider` para el tema de la aplicación.
- `fetch` para consultar la API.
- `Share` para compartir información.
- Expo Router para la navegación.

## Tecnologías utilizadas

**Aplicación móvil**

- React Native
- Expo
- TypeScript
- Expo Router

**Backend**

- ASP.NET Core
- .NET 8
- Entity Framework Core
- API REST

**Base de datos**

- SQL Server

La aplicación móvil se comunica con el backend mediante solicitudes HTTP. El backend se encarga de consultar y modificar la información almacenada en la base de datos.

Para organizar las consultas utilizamos archivos de servicios como `api.ts`, `empleadoService.ts` y `vinculoLaboralService.ts`.

## Tipos de vínculos laborales

Los tipos de vínculos que utilizamos en las pruebas son:

- Media Jornada
- Jornada Completa
- Jornada Extendida

Estos datos se consultan desde el backend.

## Pruebas realizadas

Durante el desarrollo probamos las operaciones de consulta, asignación, modificación y anulación de vínculos laborales.

También ejecutamos la aplicación en un celular Android utilizando Expo Go.

Desde el celular pudimos comprobar que:

- La aplicación abre correctamente.
- Se muestra el listado de empleados obtenido desde la API.
- Se puede modificar un vínculo laboral.
- Se puede seleccionar una fotografía de la galería y visualizarla.
- Funciona el menú de compartir de Android.

Estas pruebas nos permitieron verificar que las funciones incorporadas también funcionan fuera del navegador.

## Estado del proyecto

Para esta segunda entrega completamos las cuatro funcionalidades principales que habíamos planteado.

También incorporamos las mejoras de interfaz, búsqueda, navegación y funciones del dispositivo que fuimos trabajando durante la cursada.

Es un proyecto que solamente se utilizo y utiliza para las materias laboratorio1 y laboratorio 2.