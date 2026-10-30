// Persistencia en localStorage con datos ficticios iniciales.
const Storage = (() => {
  const KEY = "clinica-veterinaria-pacientes";

  const seed = () => [
    { id: "p1", nombre: "Luna", especie: "Gato", raza: "Siamés", nacimiento: "2020-03-14", sexo: "Hembra",
      responsable: "Responsable Ejemplo Uno", telefono: "555-0101",
      visitas: [
        { id: "v1", fecha: "2025-02-10", motivo: "Vacunación anual", observaciones: "Sin novedades. Peso 4 kg." },
        { id: "v2", fecha: "2025-09-05", motivo: "Control de peso", observaciones: "Se recomienda cambio de alimento." }
      ] },
    { id: "p2", nombre: "Max", especie: "Perro", raza: "Mestizo", nacimiento: "2018-07-02", sexo: "Macho",
      responsable: "Responsable Ejemplo Dos", telefono: "555-0102",
      visitas: [
        { id: "v3", fecha: "2025-06-21", motivo: "Dolor en una pata", observaciones: "Inflamación leve, reposo 5 días." }
      ] },
    { id: "p3", nombre: "Coco", especie: "Ave", raza: "Periquito", nacimiento: "2023-01-20", sexo: "Macho",
      responsable: "Responsable Ejemplo Tres", telefono: "555-0103", visitas: [] }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* datos corruptos: se reinician */ }
    const data = seed();
    save(data);
    return data;
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* sin almacenamiento */ }
  }

  return { load, save };
})();
