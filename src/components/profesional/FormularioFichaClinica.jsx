import { Card, Button } from "react-bootstrap";
import { useState } from "react";

const FormularioFichaClinica = ({ paciente }) => {
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const profesionales = new Set();
  const conteoProfesionales = {};

  const registrarProfesional = (nombre) => {
    if (!nombre) return;

    profesionales.add(nombre);

    conteoProfesionales[nombre] = (conteoProfesionales[nombre] || 0) + 1;
  };

  paciente?.evoluciones?.forEach((item) =>
    registrarProfesional(item.profesional),
  );

  paciente?.indicaciones?.forEach((item) =>
    registrarProfesional(item.profesional),
  );

  paciente?.examenes?.forEach((item) => registrarProfesional(item.profesional));

  paciente?.signosVitales?.forEach((item) =>
    registrarProfesional(item.profesional),
  );

  const actividades = [];
  paciente?.evoluciones?.forEach((item) => {
    actividades.push({
      tipo: "Evolución",
      profesional: item.profesional,
      fecha: item.fechaRegistro || item.fecha,
      detalle: item.descripcion,
    });
  });

  paciente?.indicaciones?.forEach((item) => {
    actividades.push({
      tipo: "Indicación",
      profesional: item.profesional,
      fecha: item.fechaRegistro || item.fecha,
      detalle: item.indicacion,
    });
  });
  paciente?.examenes?.forEach((item) => {
    actividades.push({
      tipo: "Examen",
      profesional: item.profesional,
      fecha: item.fechaRegistro || item.fecha,
      detalle: item.nombre,
    });
  });

  paciente?.signosVitales?.forEach((item) => {
    actividades.push({
      tipo: "Signos Vitales",
      profesional: item.profesional,
      fecha: item.fechaRegistro || item.fecha,
      detalle: item.presion,
    });
  });

  const ultimaActividad =
    actividades.length > 0 ? actividades[actividades.length - 1] : null;
  const evolucionesProfesional = paciente?.evoluciones || [];

  const indicacionesProfesional =
    paciente?.indicaciones?.filter(
      (item) => item.profesional === profesionalSeleccionado,
    ) || [];

  const examenesProfesional =
    paciente?.examenes?.filter(
      (item) => item.profesional === profesionalSeleccionado,
    ) || [];

  console.log("PROFESIONAL SELECCIONADO:", profesionalSeleccionado);

  console.log("EVOLUCIONES:", paciente?.evoluciones);

  console.log("EVOLUCIONES FILTRADAS:", evolucionesProfesional);
  return (
    <Card className="dashboard-modern-card">
      <Card.Body>
        <Card.Title className="dashboard-card-title">Ficha Clínica</Card.Title>

        <div className="mt-4">
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Última Actividad Clínica</Card.Title>

              {ultimaActividad ? (
                <>
                  <h6>{ultimaActividad.tipo}</h6>

                  <p className="mb-1">
                    <strong>Profesional:</strong>{" "}
                    {ultimaActividad.profesional || "No registrado"}
                  </p>

                  <p className="mb-1">
                    <strong>Fecha:</strong>{" "}
                    {ultimaActividad.fecha || "No disponible"}
                  </p>

                  <p className="mb-0">
                    <strong>Detalle:</strong>{" "}
                    {ultimaActividad.detalle || "Sin detalle"}
                  </p>
                </>
              ) : (
                <p className="text-muted mb-0">
                  No existen actividades registradas.
                </p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Profesionales Participantes</Card.Title>

              {[...profesionales].length > 0 ? (
                [...profesionales].map((profesional, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    className="w-100 text-start mb-2"
                    onClick={() => setProfesionalSeleccionado(profesional)}
                  >
                    👨‍⚕️ {profesional}
                    <span className="float-end">
                      {conteoProfesionales[profesional]} registros
                    </span>
                  </Button>
                ))
              ) : (
                <p>No existen profesionales registrados.</p>
              )}
            </Card.Body>
          </Card>
          {profesionalSeleccionado && (
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>Actividad del Profesional</Card.Title>

                <hr />

                <h6>🩺 Evoluciones</h6>
                {evolucionesProfesional.map((item, index) => (
                  <div key={index} className="border rounded p-2 mb-2 bg-light">
                    <small className="text-muted">{item.fecha}</small>

                    <p className="mb-0">{item.descripcion}</p>
                  </div>
                ))}

                
              </Card.Body>
            </Card>
          )}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Resumen Estadístico</Card.Title>
              <p>👨‍⚕️ Profesionales Participantes: {profesionales.size}</p>

              <p>🩺 Evoluciones: {paciente?.evoluciones?.length || 0}</p>

              <p>📋 Indicaciones: {paciente?.indicaciones?.length || 0}</p>

              <p>🧪 Exámenes: {paciente?.examenes?.length || 0}</p>

              <p>📏 Antropometría: {paciente?.antropometria?.length || 0}</p>

              <p>❤️ Signos Vitales: {paciente?.signosVitales?.length || 0}</p>
            </Card.Body>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FormularioFichaClinica;
