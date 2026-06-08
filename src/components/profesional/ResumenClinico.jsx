import React, { useState } from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";

const ResumenClinico = ({ paciente, onGuardar }) => {
  const [formulario, setFormulario] = useState({
    motivoConsulta: "",
    diagnostico: "",
    evolucionClinica: "",
    indicacionesMedicas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (onGuardar) onGuardar(formulario);
  };

  const resumen = [];

  paciente?.signosVitales?.forEach((registro) => {
    resumen.push({
      tipo: "Signos Vitales",
      fecha: registro.fecha,
      profesional: registro.profesional,
      detalle: `PA: ${registro.presion}\nFC: ${registro.frecuencia}\nTemp: ${registro.temperatura}\nSat: ${registro.saturacion}`,
    });
  });
  console.log(
    "ANTROPOMETRIA COMPLETA:",
    JSON.stringify(paciente?.antropometria, null, 2),
  );

  if (paciente?.antropometria?.length > 0) {
    const registro = paciente.antropometria[paciente.antropometria.length - 1];

    console.log("ULTIMA ANTROPOMETRIA:", registro);

    const imc =
      registro.altura && registro.peso
        ? (registro.peso / (registro.altura * registro.altura)).toFixed(1)
        : "No calculado";

    resumen.push({
      tipo: "Antropometría",
      fecha: registro.fecha,
      profesional: registro.profesional,
      detalle: `Peso: ${registro.peso} kg
Altura: ${registro.altura} m
IMC: ${imc}`,
    });
  }

  console.log("RESUMEN DESPUES ANTROPOMETRIA:", resumen);

  console.log(
    "EVOLUCIONES COMPLETAS:",
    JSON.stringify(paciente?.evoluciones, null, 2),
  );
  paciente?.evoluciones?.forEach((registro) => {
    console.log("EVOLUCION:", registro);

    resumen.push({
      tipo: "Evolución",
      fecha: registro.fecha,
      profesional: registro.profesional,
      detalle: registro.descripcion,
    });
  });

  paciente?.indicaciones?.forEach((registro) => {
    resumen.push({
      tipo: "Indicación",
      fecha: registro.fecha,
      profesional: registro.profesional,
      detalle: `${registro.medicamento}\n${registro.dosis}\n${registro.frecuencia}`,
    });
  });

  paciente?.examenes?.forEach((registro) => {
    resumen.push({
      tipo: "Examen",
      fecha: registro.fecha,
      profesional: registro.profesional,
      detalle: `${registro.examen}\nEstado: ${registro.estado}`,
    });
  });
  console.log("RESUMEN COMPLETO:", resumen);
  const resumenOrdenado = resumen.reverse();
  console.log("RESUMEN ORDENADO:", resumenOrdenado);

  return (
    <Card className="dashboard-modern-card">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Resumen Clínico
        </Card.Title>

        {/* ── Historial ── */}
        {resumenOrdenado.length > 0 ? (
          resumenOrdenado.map((item, index) => (
            <div key={index} className="border rounded-4 p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong>{item.profesional}</strong>
                  <p className="text-muted mb-0">{item.fecha}</p>
                </div>
                <Badge bg="primary">{item.tipo}</Badge>
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
