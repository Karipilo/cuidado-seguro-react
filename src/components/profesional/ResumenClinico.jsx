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

const ResumenClinico = ({ paciente, onGuardar }) => {
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

    // Formato ISO de Spring Boot
    if (fecha.includes("T")) {
      return new Date(fecha).toLocaleString("es-CL");
    }

    return fecha;
  };
  const resumen = [];

  paciente?.signosVitales?.forEach((registro) => {
    resumen.push({
      tipo: "Signos Vitales",
      fecha:
        "Fecha y hora: " +
        formatearFecha(registro.fechaRegistro || registro.fecha),
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
      fecha:
        "Fecha y hora: " +
        formatearFecha(registro.fechaRegistro || registro.fecha),
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
      fecha:
        "Fecha y hora: " +
        formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: registro.descripcion,
    });
  });

  paciente?.indicaciones?.forEach((registro) => {
    resumen.push({
      tipo: "Indicación",
      fecha:
        "Fecha y hora: " +
        formatearFecha(registro.fechaRegistro || registro.fecha),
      profesional: registro.profesional,
      detalle: registro.indicacion,
    });
  });

  paciente?.examenes?.forEach((registro) => {
    resumen.push({
      tipo: "Examen",
      fecha:
        "Fecha y hora: " +
        formatearFecha(registro.fechaRegistro || registro.fecha),
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
  };

  const resumenOrdenado = resumen.reverse();

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

            default:
              return true;
          }
        });

  console.log("RESUMEN ORDENADO:", resumenOrdenado);
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
