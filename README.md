# Clínica Veterinaria Patitas

Aplicación web sencilla (HTML + CSS + JavaScript, sin frameworks ni dependencias) para llevar el control básico de pacientes y visitas de una clínica veterinaria de barrio. Es un prototipo académico: los datos se guardan en el `localStorage` del navegador y todos los datos iniciales son ficticios.

## Funcionalidades

1. **Registrar paciente**: nombre, especie, raza, fecha de nacimiento, sexo, responsable y teléfono. Todos los campos son obligatorios; la fecha no puede ser futura y el teléfono debe ser válido.
2. **Registrar visita**: se elige un paciente existente y se guarda fecha, motivo y observaciones.
3. **Consultar pacientes e historial**: lista con buscador; al seleccionar un paciente se muestra su ficha y sus visitas (más recientes primero).

## Ejecutar (menos de 5 minutos)

1. Descargue o clone el repositorio.
2. Abra `index.html` con doble clic en cualquier navegador moderno.

No requiere instalación ni servidor.

Estructura:

```
index.html
css/styles.css
js/storage.js   # persistencia y datos de ejemplo
js/app.js       # lógica e interfaz
```

Para reiniciar los datos de ejemplo, borre los datos del sitio (localStorage) en el navegador.

## Verificación manual

**Registrar paciente**
1. En "Registrar paciente" pulse el botón sin llenar nada: aparece un error y los campos inválidos se marcan en rojo.
2. Complete todos los campos (p. ej. Nube, Conejo, Enano, fecha pasada, Hembra, "Responsable Prueba", 555-0199) y registre. Aparece en "Pacientes registrados" y queda seleccionado.
3. Recargue la página: el paciente sigue ahí.

**Registrar visita**
1. En "Registrar visita" elija "Coco" (sin visitas), deje campos vacíos y envíe: se muestra el error.
2. Complete fecha, motivo y observaciones y envíe: aparece el mensaje de confirmación.

**Consultar pacientes e historial**
1. Haga clic en "Luna": se ven su ficha y 2 visitas.
2. Haga clic en "Coco": debe mostrar la visita recién agregada.
3. Escriba "max" en el buscador: la lista se filtra.