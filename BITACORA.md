## RETO 1
- **Datos:** 16 minutos de trabajo y 2 prompts.
- **Qué hicimos y qué decidió la IA por nosotros:** Definimos el contexto de una clínica veterinaria, el uso de HTML, CSS y JavaScript y tres funcionalidades mínimas: registrar pacientes, registrar visitas y consultar pacientes con su historial. La IA decidió la estructura del proyecto, los nombres y organización de los archivos, el estilo visual de la aplicación y las condiciones y validaciones de los inputs.
- **Qué nos sorprendió o salió mal:** Nos sorprendió que con solo dos prompts la IA construyera prácticamente toda la aplicación. En general no tuvimos problemas relevantes: las funcionalidades solicitadas funcionaron, el diseño generado fue bueno y además la interfaz resultó responsive.
- **Qué haríamos distinto:** Para este alcance no cambiaríamos el proceso utilizado, ya que el resultado cumplió satisfactoriamente los criterios del reto. En un proyecto real definiríamos con mayor precisión las decisiones que no quisiéramos delegar a la IA.


## RETO 2
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


## RETO 3
- **Datos:** 18 minutos de trabajo y 1 prompt.
- **Qué recibimos:** Trabajamos sobre el código desarrollado por otro equipo. El proyecto tenía una estructura más completa de control y verificación que los retos anteriores: contaba con pruebas E2E automatizadas con Playwright, evidencias mediante capturas y documentación de decisiones anteriores. La versión actual estaba ubicada en `reto2/` y correspondía a una aplicación en HTML, CSS y JavaScript puro, con persistencia en `localStorage`.
- **Qué decidimos nosotros:** A partir de los criterios del reto definimos que:
  - Se debía crear una vista independiente con las visitas de los últimos 30 días.
  - Las visitas anteriores a ese periodo no debían aparecer, pero tampoco eliminarse.
  - La vista debía permitir exportar los resultados a CSV.
  - El CSV debía contener como mínimo: mascota, responsable, fecha y motivo.
  - La nueva funcionalidad debía respetar la arquitectura, diseño y comportamiento del proyecto heredado.
  - Debían reutilizarse los controles existentes y comprobar que las funcionalidades anteriores siguieran funcionando.

  También le pedimos a la IA que primero analizara el README, la estructura y el código existente antes de realizar modificaciones.
- **Qué decidió la IA:** La IA entendió la arquitectura existente y realizó el cambio reutilizando componentes y convenciones del proyecto. Decidió:
  - Crear la ruta `#/ultimos-30-dias`.
  - Considerar como válidas las visitas entre hoy y exactamente 30 días atrás, inclusive.
  - Ordenarlas de la más reciente a la más antigua.
  - Mantener una fila por visita en el CSV; si existen varios responsables, separarlos mediante `;`.
  - Generar el CSV en UTF-8 con BOM y protecciones para facilitar su uso seguro en Excel.
  - Nombrar el archivo `visitas-ultimos-30-dias-AAAA-MM-DD.csv`.
  - Agregar el acceso a la nueva vista desde la sección de Visitas.
  - Reutilizar funciones, estilos y mecanismos de navegación existentes en lugar de crear una implementación paralela.

  Además, agregó una nueva prueba E2E y una captura de evidencia. La suite terminó con 18 de 18 pruebas exitosas, incluyendo las 17 heredadas y la nueva prueba.
- **Qué nos sorprendió o salió mal:** Nos sorprendió la importancia de los controles y documentación dejados por el equipo anterior. Tener pruebas E2E, capturas de evidencia y una estructura documentada permitió que la IA entendiera mejor el comportamiento esperado y verificara que el cambio no rompiera funcionalidades existentes. También fue interesante que la IA resolviera detalles que el requerimiento no especificaba, como el tratamiento exacto del día 30, múltiples responsables dentro del CSV, codificación para Excel y protección frente a valores interpretables como fórmulas.
- **Hallazgos del código heredado:** La IA también identificó algunas deudas técnicas: gran parte de la lógica está concentrada en un único `app.js`, existen dos versiones (`reto1/` y `reto2/`), algunos datos de ejemplo tienen fechas fijas y existen inconsistencias menores en documentación y nombre del producto. Aun así, los controles existentes permitieron modificar el sistema y verificar automáticamente la regresión.
- **Qué haríamos distinto:** Antes de implementar, definiríamos explícitamente algunas reglas que dejamos abiertas: si el día 30 exacto debe incluirse, cómo representar múltiples responsables en el CSV y cuál será el consumidor final del archivo. También aprovecharíamos desde el inicio las pruebas y evidencias heredadas como parte de la especificación del comportamiento existente, ya que demostraron ser muy útiles para que tanto nosotros como la IA pudiéramos modificar código ajeno con mayor confianza.
