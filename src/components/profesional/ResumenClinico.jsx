import React, { useState } from "react";
import {
  Card,
  Badge,
  Form,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";

const ResumenClinico = ({ paciente, onGuardar, profesional }) => {
  const [formulario, setFormulario] = useState({
    motivoConsulta: "",
    diagnostico: "",
    evolucionClinica: "",
    indicacionesMedicas: "",
  });

  const [tabActiva, setTabActiva] = useState("todas");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (onGuardar) onGuardar(formulario);
  };

  const obtenerColorBadge = (tipo) => {
    switch (tipo) {
      case "Evolución":
        return "info";

      case "Medicamento":
        return "primary";

      case "Examen":
        return "danger";

      case "Antropometría":
        return "warning";

      case "Signos Vitales":
        return "success";

      case "Indicación":
        return "secondary";

      default:
        return "primary";
    }
  };
  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";

    const fechaLimpia = fecha.split(".")[0];

    return new Date(fechaLimpia).toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const resumen = [];

  paciente?.signosVitales?.forEach((registro) => {
    resumen.push({
      tipo: "Signos Vitales",
      fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: `PA: ${registro.presion}\nFC: ${registro.frecuencia}\nTemp: ${registro.temperatura}\nSat: ${registro.saturacion}`,
    });
  });
  console.log(
    "ANTROPOMETRIA COMPLETA:",
    JSON.stringify(paciente?.antropometria, null, 2),
  );

  paciente?.antropometria?.forEach((registro) => {
    const imc =
      registro.altura && registro.peso
        ? (registro.peso / (registro.altura * registro.altura)).toFixed(1)
        : "No calculado";

    resumen.push({
      tipo: "Antropometría",
      fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: `Peso: ${registro.peso} kg
Altura: ${registro.altura} m
IMC: ${imc}`,
    });
  });

  console.log("RESUMEN DESPUES ANTROPOMETRIA:", resumen);

  console.log(
    "EVOLUCIONES COMPLETAS:",
    JSON.stringify(paciente?.evoluciones, null, 2),
  );
  paciente?.evoluciones?.forEach((registro) => {
    console.log("EVOLUCION:", registro);

    resumen.push({
      tipo: "Evolución",
      fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: registro.descripcion,
    });
  });

  paciente?.indicaciones?.forEach((registro) => {
    resumen.push({
      tipo: "Indicación",
      fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: registro.indicacion,
    });
  });

  resumen.push({
    tipo: "Medicamento",
    fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
    profesional: registro.profesional,
    detalle: `Medicamento: ${registro.nombre}

Dosis: ${registro.dosis}

Frecuencia: ${registro.frecuencia}

Duración: ${registro.diasTratamiento} días

${registro.observaciones || ""}`,
  });

  paciente?.examenes?.forEach((registro) => {
    resumen.push({
      tipo: "Examen",
      fecha: formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: `${registro.nombre}

Estado: ${registro.estado}

${registro.resultado ? `Resultado: ${registro.resultado}` : ""}

${registro.observacion ? `Observación: ${registro.observacion}` : ""}`,
    });
  });

  console.log("RESUMEN COMPLETO:", resumen);

  const contadores = {
    todas: resumen.length,

    evoluciones: resumen.filter((r) => r.tipo === "Evolución").length,

    indicaciones: resumen.filter((r) => r.tipo === "Indicación").length,

    examenes: resumen.filter((r) => r.tipo === "Examen").length,

    antropometria: resumen.filter((r) => r.tipo === "Antropometría").length,

    signos: resumen.filter((r) => r.tipo === "Signos Vitales").length,

    medicamentos: resumen.filter((r) => r.tipo === "Medicamento").length,
  };

  const resumenOrdenado = [...resumen].reverse();

  const resumenFiltrado =
    tabActiva === "todas"
      ? resumenOrdenado
      : resumenOrdenado.filter((item) => {
          switch (tabActiva) {
            case "evoluciones":
              return item.tipo === "Evolución";

            case "indicaciones":
              return item.tipo === "Indicación";

            case "examenes":
              return item.tipo === "Examen";

            case "antropometria":
              return item.tipo === "Antropometría";

            case "signos":
              return item.tipo === "Signos Vitales";

            case "medicamentos":
              return item.tipo === "Medicamento";

            default:
              return true;
          }
        });

  console.log("RESUMEN ORDENADO:", resumenOrdenado);
  /* ======================================
   PROFESIONALES PARTICIPANTES
====================================== */

  const profesionalesParticipantes = [
    ...new Set(resumen.map((r) => r.profesional).filter(Boolean)),
  ];

  /* ======================================
   ESTADÍSTICAS
====================================== */

  const estadisticas = {
    evoluciones: paciente?.evoluciones?.length || 0,

    indicaciones: paciente?.indicaciones?.length || 0,

    examenes: paciente?.examenes?.length || 0,

    medicamentos: paciente?.medicamentos?.length || 0,

    antropometria: paciente?.antropometria?.length || 0,

    signos: paciente?.signosVitales?.length || 0,
  };

  /* ======================================
   ÚLTIMA ACTIVIDAD
====================================== */

  const ultimaActividad =
    resumenOrdenado.length > 0 ? resumenOrdenado[0] : null;

  console.error("ULTIMA ACTIVIDAD:", ultimaActividad);
  console.log("RESUMEN FILTRADO:", resumenFiltrado);
  console.log("RESUMEN ORDENADO:", resumenOrdenado);
  console.log("ULTIMA ACTIVIDAD:", ultimaActividad);
  return (
    <Card className="dashboard-modern-card">
      <Card.Body
        style={{
          maxHeight: "750px",
          overflowY: "auto",
        }}
      >
        <Card.Title className="dashboard-card-title">
          Resumen Clínico
        </Card.Title>

        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h4>Última Actividad Clínica</h4>

            {ultimaActividad ? (
              <>
                <h5>{ultimaActividad.tipo}</h5>

                <p>
                  <strong>Profesional:</strong>{" "}
                  {ultimaActividad.profesional || "No informado"}
                </p>

                <p>
                  <strong>Fecha:</strong> {ultimaActividad.fecha}
                </p>

                <p>
                  <strong>Detalle:</strong> {ultimaActividad.detalle}
                </p>
              </>
            ) : (
              <p>No existen registros clínicos.</p>
            )}
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h4>Profesionales Participantes</h4>

            {profesionalesParticipantes.length > 0 ? (
              profesionalesParticipantes.map((prof, index) => {
                const cantidad = resumen.filter(
                  (r) => r.profesional === prof,
                ).length;

                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between border rounded p-2 mb-2"
                  >
                    <span>👨‍⚕️ {prof}</span>

                    <span>{cantidad} registros</span>
                  </div>
                );
              })
            ) : (
              <p>No existen profesionales registrados.</p>
            )}
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h4>Resumen Estadístico</h4>

            <p>
              👨‍⚕️ Profesionales Participantes:{" "}
              {profesionalesParticipantes.length}
            </p>

            <p>🩺 Evoluciones: {estadisticas.evoluciones}</p>

            <p>📋 Indicaciones: {estadisticas.indicaciones}</p>

            <p>🧪 Exámenes: {estadisticas.examenes}</p>

            <p>💊 Medicamentos: {estadisticas.medicamentos}</p>

            <p>📏 Antropometría: {estadisticas.antropometria}</p>

            <p>❤️ Signos Vitales: {estadisticas.signos}</p>
          </Card.Body>
        </Card>

        <Tabs
          activeKey={tabActiva}
          onSelect={(k) => setTabActiva(k)}
          className="mb-4"
          fill
        >
          <Tab eventKey="todas" title={`Todas (${contadores.todas})`} />

          <Tab
            eventKey="evoluciones"
            title={`Evoluciones (${contadores.evoluciones})`}
          />

          <Tab
            eventKey="indicaciones"
            title={`Indicaciones (${contadores.indicaciones})`}
          />

          <Tab
            eventKey="examenes"
            title={`Exámenes (${contadores.examenes})`}
          />

          <Tab
            eventKey="antropometria"
            title={`Antropometría (${contadores.antropometria})`}
          />

          <Tab
            eventKey="signos"
            title={`Signos Vitales (${contadores.signos})`}
          />

          <Tab
            eventKey="medicamentos"
            title={`Medicamentos (${contadores.medicamentos})`}
          />
        </Tabs>

        {/* ── Historial ── */}
        {resumenFiltrado.length > 0 ? (
          resumenFiltrado.map((item, index) => (
            <div
              key={index}
              className="border rounded-4 p-4 mb-3 shadow-sm bg-white"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong>{item.profesional}</strong>
                  <p className="text-muted mb-0">{item.fecha}</p>
                </div>
                <Badge bg={obtenerColorBadge(item.tipo)}>{item.tipo}</Badge>
              </div>
              <pre
                className="mb-0"
                style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
              >
                {item.detalle}
              </pre>
            </div>
          ))
        ) : (
          <p>No existen registros clínicos.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResumenClinico;
