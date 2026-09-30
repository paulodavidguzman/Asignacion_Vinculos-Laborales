# Asignación de Vínculos Laborales

## Nombre del proyecto

**Asignación de Vínculos Laborales**

## Descripción

Aplicación destinada a la gestión de los vínculos laborales de los empleados.

El sistema permite consultar empleados, visualizar el vínculo laboral asociado, asignar nuevos vínculos y realizar la anulación de vínculos existentes.

El proyecto se desarrolla de manera incremental, incorporando funcionalidades a medida que avanza la cursada.

## Integrantes

- Guzmán Paulo David
- Menozzi Camila Florencia

## Features del proyecto

De acuerdo con las pautas del proyecto ABP, una Feature representa una funcionalidad concreta que permite al usuario realizar una acción, consultar información o alcanzar un objetivo.

El grupo cuenta con **2 integrantes**, por lo que el alcance mínimo esperado para la versión final es de **4 Features**.

| # | Feature | Estado actual |
|---|---|---|
| 1 | Listar empleados con sus vínculos laborales | Implementado |
| 2 | Asignar vínculo laboral a empleado | Implementado |
| 3 | Anular vínculo laboral del empleado | Implementado |
| 4 | Modificar vínculo laboral del empleado | Pendiente |

---

## Estado de avance

### 1. Listar empleados con sus vínculos laborales

**Estado: Implementado**

La aplicación móvil consulta los empleados registrados mediante el BackendAPI y muestra la información correspondiente a cada empleado.

Actualmente se visualizan:

- Nombre y apellido.
- DNI.
- Vínculo laboral actual.
- Estado del vínculo.

Cuando un empleado no posee un vínculo activo, la aplicación informa:

**Vínculo: Sin vínculo asignado**

**Estado: Sin vínculo**

Cuando existe un vínculo activo, se muestra su descripción y el estado correspondiente.

La información se obtiene desde el endpoint:

`GET /api/Empleado`

---

### 2. Asignar vínculo laboral a empleado

**Estado: Implementado**

La aplicación permite seleccionar un empleado que actualmente no posee un vínculo laboral activo y asignarle uno de los tipos de vínculos disponibles.

El flujo implementado es:

1. Consultar los empleados.
2. Identificar un empleado sin vínculo.
3. Presionar el botón **Asignar**.
4. Seleccionar un vínculo laboral.
5. Confirmar la asignación.
6. Enviar la información al BackendAPI.
7. Registrar el nuevo vínculo.
8. Actualizar automáticamente la información mostrada en la aplicación.

Los vínculos disponibles son obtenidos mediante:

`GET /api/VinculoLaboral`

La creación de la relación entre el empleado y el vínculo laboral se realiza mediante:

`POST /api/EmpleadoVinculoLaboral`

Después de una asignación correcta, el empleado pasa a mostrar el vínculo seleccionado y su estado como **Activo**.

---

### 3. Anular vínculo laboral del empleado

**Estado: Implementado**

La aplicación permite anular el vínculo laboral activo de un empleado.

Cuando el empleado posee un vínculo activo, se muestra el botón:

**Anular vínculo**

La operación se realiza mediante:

`PUT /api/EmpleadoVinculoLaboral/anular/{id}`

La anulación utiliza una baja lógica. El registro no se elimina físicamente de la base de datos.

El BackendAPI modifica:

- `evl_anulado = true`
- `evl_estado = false`
- fecha de modificación del registro.

Después de realizar la operación, la aplicación vuelve a consultar los datos y el empleado pasa a mostrarse como:

**Vínculo: Sin vínculo asignado**

**Estado: Sin vínculo**

También vuelve a habilitarse la opción **Asignar**, permitiendo registrar posteriormente un nuevo vínculo laboral.

---

### 4. Modificar vínculo laboral del empleado

**Estado: Pendiente**

El BackendAPI dispone actualmente de una operación para modificar un registro existente:

`PUT /api/EmpleadoVinculoLaboral/{id}`

Esta operación permite actualizar información correspondiente al vínculo laboral.

La integración completa de esta funcionalidad con la aplicación móvil queda pendiente para una siguiente etapa del desarrollo.

---

## Flujo funcional implementado

Actualmente el sistema permite realizar el siguiente circuito:

`Empleado → Consultar vínculo → Asignar vínculo → Activar vínculo → Anular vínculo → Sin vínculo`

Esto permite demostrar la comunicación completa entre la aplicación móvil, el BackendAPI y la persistencia de los datos.

---

## Arquitectura actual

El proyecto se encuentra dividido principalmente en:

### Frontend móvil

Desarrollado utilizando:

- React Native
- Expo
- TypeScript
- Expo Router

La aplicación móvil consume los endpoints proporcionados por el BackendAPI.

La comunicación con el backend se encuentra organizada mediante servicios, entre ellos:

- `api.ts`
- `empleadoService.ts`
- `vinculoLaboralService.ts`

### Backend

Desarrollado utilizando:

- ASP.NET Core
- .NET 8
- Entity Framework Core
- API REST
- Swagger

El backend contiene los controladores responsables de recibir las solicitudes realizadas desde la aplicación móvil y ejecutar las operaciones correspondientes.

Entre los principales endpoints utilizados actualmente se encuentran:

`GET /api/Empleado`

`GET /api/VinculoLaboral`

`POST /api/EmpleadoVinculoLaboral`

`PUT /api/EmpleadoVinculoLaboral/{id}`

`PUT /api/EmpleadoVinculoLaboral/anular/{id}`

### Base de datos

El sistema utiliza **SQL Server** como motor de base de datos.

Entity Framework Core permite realizar la comunicación entre el BackendAPI y la base de datos.

---

## Modelo funcional

Las principales entidades utilizadas por el sistema son:

### Empleado

Contiene los datos correspondientes al empleado.

### Vínculo Laboral

Representa los diferentes tipos de vínculos que pueden asignarse a los empleados.

Actualmente se utilizan, entre otros:

- Media Jornada
- Jornada Completa
- Jornada Extendida

### EmpleadoVínculoLaboral

Representa la relación entre un empleado y su vínculo laboral.

Permite almacenar información como:

- Empleado.
- Tipo de vínculo.
- Fecha desde.
- Fecha hasta.
- Temporalidad.
- Estado.
- Anulación.
- Fecha de modificación.

---

## Integración del sistema

La arquitectura utilizada actualmente puede representarse de la siguiente manera:

`Aplicación móvil (React Native + Expo)`

↓

`Servicios TypeScript / Fetch`

↓

`BackendAPI ASP.NET Core`

↓

`Entity Framework Core`

↓

`SQL Server`

La aplicación móvil no accede directamente a la base de datos. Todas las operaciones se realizan a través del BackendAPI.

---

## Prueba funcional realizada

Durante el desarrollo se verificó el siguiente escenario:

1. Consultar un empleado sin vínculo laboral.
2. Presionar **Asignar**.
3. Seleccionar un vínculo laboral.
4. Confirmar la operación.
5. Verificar que el empleado figure con el vínculo seleccionado.
6. Verificar que el estado figure como **Activo**.
7. Presionar **Anular vínculo**.
8. Verificar que el vínculo sea anulado mediante baja lógica.
9. Actualizar los datos.
10. Verificar que el empleado vuelva a figurar como **Sin vínculo**.

La prueba permitió comprobar la comunicación entre frontend móvil, BackendAPI y base de datos.

---

## Estado actual del proyecto

Actualmente se encuentran implementadas y probadas las funcionalidades de:

- Consulta de empleados y vínculos laborales.
- Visualización del estado actual del vínculo.
- Asignación de un vínculo laboral.
- Persistencia de la asignación mediante el BackendAPI.
- Anulación lógica de un vínculo laboral.
- Actualización automática de la información después de una operación.

La modificación de vínculos laborales queda pendiente para la siguiente etapa.

---

## Objetivo del proyecto

Desarrollar progresivamente una aplicación que permita gestionar los vínculos laborales de los empleados de manera organizada, facilitando la consulta, asignación, modificación y anulación de dichos vínculos.

El desarrollo se realiza de forma incremental, incorporando los contenidos trabajados durante la cursada y registrando el avance de cada Feature.