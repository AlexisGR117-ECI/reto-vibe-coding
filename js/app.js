(() => {
  let pacientes = Storage.load();
  let seleccionado = null;

  const $ = (id) => document.getElementById(id);
  const hoy = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function escapar(t) {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  function formatoFecha(iso) {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function mensaje(el, texto, tipo) {
    el.textContent = texto;
    el.className = "msg " + tipo;
  }

  function validar(campos) {
    let primero = null;
    campos.forEach(([el, ok]) => {
      el.classList.toggle("invalid", !ok);
      if (!ok && !primero) primero = el;
    });
    if (primero) primero.focus();
    return !primero;
  }

  function limpiarInvalidos(form) {
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  }

  function renderSelectVisita() {
    const sel = $("v-paciente");
    const actual = sel.value;
    sel.innerHTML = '<option value="">Seleccione...</option>' +
      pacientes.map((p) => `<option value="${p.id}">${escapar(p.nombre)} (${escapar(p.especie)})</option>`).join("");
    sel.value = pacientes.some((p) => p.id === actual) ? actual : (seleccionado || "");
    actualizarMinFecha();
  }

  function renderLista() {
    const q = $("buscar").value.trim().toLowerCase();
    const lista = pacientes.filter((p) =>
      p.nombre.toLowerCase().includes(q) || p.responsable.toLowerCase().includes(q));
    const ul = $("lista-pacientes");
    if (!lista.length) {
      ul.innerHTML = '<li class="empty">No hay pacientes que coincidan.</li>';
      return;
    }
    ul.innerHTML = lista.map((p) => `
      <li tabindex="0" data-id="${p.id}" class="${p.id === seleccionado ? "selected" : ""}">
        <strong>${escapar(p.nombre)}</strong> · ${escapar(p.especie)}
        <small>Responsable: ${escapar(p.responsable)} · ${p.visitas.length} visita(s)</small>
      </li>`).join("");
  }

  function renderDetalle() {
    const cont = $("detalle-contenido");
    const p = pacientes.find((x) => x.id === seleccionado);
    if (!p) {
      cont.innerHTML = '<p class="empty">Seleccione un paciente de la lista para ver su información y visitas.</p>';
      return;
    }
    const visitas = [...p.visitas].sort((a, b) => b.fecha.localeCompare(a.fecha));
    cont.innerHTML = `
      <dl class="info">
        <dt>Nombre</dt><dd>${escapar(p.nombre)}</dd>
        <dt>Especie</dt><dd>${escapar(p.especie)}</dd>
        <dt>Raza</dt><dd>${escapar(p.raza)}</dd>
        <dt>Sexo</dt><dd>${escapar(p.sexo)}</dd>
        <dt>Nacimiento</dt><dd>${formatoFecha(p.nacimiento)}</dd>
        <dt>Responsable</dt><dd>${escapar(p.responsable)}</dd>
        <dt>Teléfono</dt><dd>${escapar(p.telefono)}</dd>
      </dl>
      <h3>Historial de visitas (${visitas.length})</h3>
      ${visitas.length ? visitas.map((v) => `
        <div class="visit">
          <strong>${formatoFecha(v.fecha)} — ${escapar(v.motivo)}</strong>
          <p>${escapar(v.observaciones)}</p>
        </div>`).join("") : '<p class="empty">Este paciente aún no tiene visitas registradas.</p>'}`;
  }

  function renderTodo() {
    renderSelectVisita();
    renderLista();
    renderDetalle();
  }

  function seleccionar(id) {
    seleccionado = id;
    $("v-paciente").value = id;
    actualizarMinFecha();
    renderLista();
    renderDetalle();
  }

  $("lista-pacientes").addEventListener("click", (e) => {
    const li = e.target.closest("li[data-id]");
    if (li) seleccionar(li.dataset.id);
  });
  $("lista-pacientes").addEventListener("keydown", (e) => {
    const li = e.target.closest("li[data-id]");
    if (li && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); seleccionar(li.dataset.id); }
  });
  $("buscar").addEventListener("input", renderLista);

  $("form-paciente").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = {
      nombre: $("p-nombre"), especie: $("p-especie"), raza: $("p-raza"), nacimiento: $("p-nacimiento"),
      sexo: $("p-sexo"), responsable: $("p-responsable"), telefono: $("p-telefono")
    };
    const v = (k) => f[k].value.trim();
    const ok = validar([
      [f.nombre, v("nombre").length >= 2],
      [f.especie, v("especie") !== ""],
      [f.raza, v("raza") !== ""],
      [f.nacimiento, v("nacimiento") !== "" && v("nacimiento") <= hoy()],
      [f.sexo, v("sexo") !== ""],
      [f.responsable, v("responsable").length >= 3],
      [f.telefono, /^[0-9+\-\s()]{7,20}$/.test(v("telefono"))]
    ]);
    const msg = $("msg-paciente");
    if (!ok) {
      mensaje(msg, "Complete todos los campos correctamente (fecha no futura, teléfono con 7+ dígitos).", "error");
      return;
    }
    const nuevo = { id: uid("p"), visitas: [] };
    Object.keys(f).forEach((k) => (nuevo[k] = v(k)));
    pacientes.push(nuevo);
    Storage.save(pacientes);
    seleccionado = nuevo.id;
    e.target.reset();
    limpiarInvalidos(e.target);
    renderTodo();
    mensaje(msg, `Paciente "${nuevo.nombre}" registrado.`, "ok");
  });

  $("form-visita").addEventListener("submit", (e) => {
    e.preventDefault();
    const sel = $("v-paciente"), fecha = $("v-fecha"), motivo = $("v-motivo"), obs = $("v-observaciones");
    const p = pacientes.find((x) => x.id === sel.value);
    const fechaValida = fecha.value !== "" && (!p || fecha.value >= p.nacimiento);
    const ok = validar([
      [sel, sel.value !== ""],
      [fecha, fechaValida],
      [motivo, motivo.value.trim().length >= 3],
      [obs, obs.value.trim().length >= 3]
    ]);
    const msg = $("msg-visita");
    if (!ok) {
      const antesDeNacer = p && fecha.value !== "" && !fechaValida;
      mensaje(msg, antesDeNacer
        ? `La fecha de la visita no puede ser anterior al nacimiento de ${p.nombre} (${formatoFecha(p.nacimiento)}).`
        : "Seleccione un paciente y complete fecha, motivo y observaciones.", "error");
      return;
    }
    p.visitas.push({ id: uid("v"), fecha: fecha.value, motivo: motivo.value.trim(), observaciones: obs.value.trim() });
    Storage.save(pacientes);
    seleccionado = p.id;
    e.target.reset();
    limpiarInvalidos(e.target);
    fecha.value = hoy();
    renderTodo();
    mensaje(msg, `Visita registrada para ${p.nombre}.`, "ok");
  });

  // El selector de fecha impide elegir días previos al nacimiento del paciente.
  function actualizarMinFecha() {
    const p = pacientes.find((x) => x.id === $("v-paciente").value);
    $("v-fecha").min = p ? p.nacimiento : "";
  }
  $("v-paciente").addEventListener("change", actualizarMinFecha);

  $("v-fecha").value = hoy();
  $("p-nacimiento").max = hoy();
  renderTodo();
})();
