## RETO 1
- **Datos:** 16 minutos de trabajo y 2 prompts.
- **Qué hicimos y qué decidió la IA por nosotros:** Definimos el contexto de una clínica veterinaria, el uso de HTML, CSS y JavaScript y tres funcionalidades mínimas: registrar pacientes, registrar visitas y consultar pacientes con su historial. La IA decidió la estructura del proyecto, los nombres y organización de los archivos, el estilo visual de la aplicación y las condiciones y validaciones de los inputs.
- **Qué nos sorprendió o salió mal:** Nos sorprendió que con solo dos prompts la IA construyera prácticamente toda la aplicación. En general no tuvimos problemas relevantes: las funcionalidades solicitadas funcionaron, el diseño generado fue bueno y además la interfaz resultó responsive.
- **Qué haríamos distinto:** Para este alcance no cambiaríamos el proceso utilizado, ya que el resultado cumplió satisfactoriamente los criterios del reto. En un proyecto real definiríamos con mayor precisión las decisiones que no quisiéramos delegar a la IA.


## RETO 2 — Cambian las reglas
- **Datos:** 16 minutos de trabajo y 1 prompt.
- **Qué decidimos nosotros:** Durante los primeros 8 minutos, sin IA, identificamos en qué parte de la aplicación se almacenaba el responsable de cada mascota y empezamos a analizar cómo cambiar la estructura para permitir múltiples responsables. Definimos que: una mascota debía poder tener uno o varios responsables; el formulario mantendría inicialmente un solo responsable; se agregaría un botón "+" al lado del responsable para añadir nuevos mediante inputs adicionales; al consultar una mascota deberían verse todos sus responsables; al consultar un responsable deberían verse todas sus mascotas; y las funcionalidades existentes debían seguir funcionando.
- **Qué decidió la IA:** A partir de nuestros requisitos, la IA completó el diseño y la implementación:
  - Cambió la estructura de cada mascota de un único responsable a una colección `responsables: [{nombre, telefono}]`.
  - Implementó migración automática de los datos existentes al nuevo formato.
  - Añadió filas dinámicas con botones + y × para agregar o eliminar responsables.
  - Decidió que cada responsable tendría su propio teléfono.
  - Evitó responsables duplicados dentro de una misma mascota.
  - Creó una vista de responsables que permite consultar todas las mascotas asociadas.
  - Reutilizó el nombre como identificador del responsable.
  - Extendió el buscador para encontrar mascotas por cualquiera de sus responsables.
  - Conservó las funcionalidades anteriores, como visitas y sus validaciones.
  - No agregó edición de mascotas porque esta funcionalidad no existía previamente y estaba fuera del alcance.
- **Qué nos sorprendió o salió mal:** Teníamos una idea inicial clara de cómo permitir múltiples responsables, pero la IA llevó la solución más allá de lo que habíamos considerado. Por ejemplo, no habíamos tenido en cuenta que cada responsable podía tener un teléfono diferente. También agregó migración de datos anteriores, prevención de duplicados y navegación entre responsables y mascotas. En general, la IA tomó nuestra idea inicial y produjo una solución más completa.
- **Qué haríamos distinto:** Antes de pedirle a la IA que implemente el cambio, definiríamos con mayor detalle el modelo de datos y la identidad de un responsable. La IA decidió identificar responsables únicamente por nombre, lo cual funciona para el ejercicio, pero genera una limitación: dos personas diferentes con el mismo nombre serían consideradas el mismo responsable. En una siguiente iteración definiríamos nosotros esa decisión, por ejemplo utilizando un identificador único para cada responsable, y después dejaríamos que la IA implemente la solución.