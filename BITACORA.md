## RETO 1
- **Datos:** 16 minutos de trabajo y 2 prompts.
- **Qué hicimos y qué decidió la IA por nosotros:** Definimos el contexto de una clínica veterinaria, el uso de HTML, CSS y JavaScript y tres funcionalidades mínimas: registrar pacientes, registrar visitas y consultar pacientes con su historial. La IA decidió la estructura del proyecto, los nombres y organización de los archivos, el estilo visual de la aplicación y las condiciones y validaciones de los inputs.
- **Qué nos sorprendió o salió mal:** Nos sorprendió que con solo dos prompts la IA construyera prácticamente toda la aplicación. En general no tuvimos problemas relevantes: las funcionalidades solicitadas funcionaron, el diseño generado fue bueno y además la interfaz resultó responsive.
- **Qué haríamos distinto:** Para este alcance no cambiaríamos el proceso utilizado, ya que el resultado cumplió satisfactoriamente los criterios del reto. En un proyecto real definiríamos con mayor precisión las decisiones que no quisiéramos delegar a la IA.
- **Con lo que ya vimos en el curso, cambiaríamos:** Haríamos una **spec con criterios falsables**: por ejemplo, “una fecha futura se rechaza”, “al recargar se conserva el paciente” y “en una pantalla de 360 px no aparece scroll horizontal”, y probaríamos cada afirmación.

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
- **Con lo que ya vimos en el curso, cambiaríamos:** Registraríamos un **ADR** antes de implementar: “un responsable se identifica por ID, no por nombre”; incluiríamos alternativas, consecuencias y la decisión concreta para que la IA no la invente.

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
- **Con lo que ya vimos en el curso, cambiaríamos:** Usaríamos el **arnés como guardrail de regresión**: las pruebas E2E verificarían automáticamente los criterios del cambio y que las funciones heredadas sigan funcionando.

## RETO 4
- **Qué hicimos y qué recibimos del otro equipo:** Probamos el cambio contra los cuatro criterios y recibimos este reporte: “La pantalla de los últimos 30 días muestra las visitas desde hoy hasta hace 30 días justos, y las más viejas no salen ahí, pero siguen guardadas en cada mascota. El botón Exportar baja un CSV con mascota, responsable, fecha y motivo, igualito a lo que se ve en la tabla. Lo que ya existía (registrar, fichas, búsqueda, visitas) sigue andando como antes. Se intentó romperla con fechas futuras, textos con comas y comillas, la app vacía y desde el celular, y aguantó todo. Lo único que se encontró es un detalle y es que si el nombre de un responsable tiene punto y coma (;), en el CSV se mezcla con el separador entre responsables.”
- **Qué nos sorprendió o salió mal:** El otro equipo confirmó que los cuatro criterios del cambio funcionaban y que las pruebas con fechas futuras, comas, comillas, aplicación vacía y celular no rompieron la app. El único defecto encontrado fue real: nuestro formato usa `;` para separar responsables y no evita que un nombre que contenga `;` se mezcle con ese separador.
- **Qué haríamos distinto y si tenían razón:** Sí tenían razón: el hallazgo corresponde a un defecto de nuestra implementación, no a una interpretación del criterio. Corregiríamos el CSV escapando de manera consistente los valores que contengan el delimitador, o usaríamos una representación que no colisione con nombres válidos; también agregaríamos una prueba específica con un responsable cuyo nombre contenga `;`.
- **Con lo que ya vimos en el curso, cambiaríamos:** Pondríamos un **guardrail** de exportación: ningún valor puede romper la estructura del CSV y la prueba con comas, comillas y punto y coma debe bloquear CI si falla. El arnés de pruebas debe ser parte de la entrega, no una revisión manual opcional.

## Síntesis
- El cambio más caro fue modificar código heredado sin romper lo que ya funcionaba, porque primero tuvimos que entender decisiones, datos y pruebas que no habíamos creado.
- La IA escribió cambios en un prompt y pocos minutos; el costo real estuvo en entender el comportamiento heredado, revisar supuestos y probar casos que no estaban explícitos.
- Por eso, cambiar, entender y probar lo generado por IA puede costar más que escribirlo: la velocidad de generación no elimina el trabajo de validación.
- Para el proyecto integrador decidimos escribir primero una spec con criterios de aceptación falsables para el workflow de pruebas y validar cualquier salida de IA con un arnés antes de usarla para tomar decisiones.

> **Agregado después de la clase:** Esta bitácora incorpora la relación explícita con lo que hemos visto en el curso por cada reto, además del análisis de los hallazgos del Reto 4 y la síntesis.
