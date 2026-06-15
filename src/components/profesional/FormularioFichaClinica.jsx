import { Card, Button } from "react-bootstrap";
import { useState } from "react";

const FormularioFichaClinica = ({ paciente }) => {
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const limpiarProfesional = (nombre) => {
    if (!nombre) return "";

    return nombre
      .replace(/\s*\(.*?\)\s*/g, "")
      .trim()
      .toUpperCase();
  };
  const profesionales = new Set();
  const conteoProfesionales = {};
  const nombresMostrar = {};

  const registrarProfesional = (nombre) => {
    if (!nombre) return;

    const nombreLimpio = limpiarProfesional(nombre);

    profesionales.add(nombreLimpio);

    conteoProfesionales[nombreLimpio] =
      (conteoProfesionales[nombreLimpio] || 0) + 1;

    if (!nombresMostrar[nombreLimpio] || nombre.includes("(")) {
      nombresMostrar[nombreLimpio] = nombre;
    }
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
  paciente?.antropometria?.forEach((item) =>
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

  paciente?.antropometria?.forEach((item) => {
    actividades.push({
      tipo: "Antropometría",
      profesional: item.profesional,
      fecha: item.fechaRegistro || item.fecha,
      detalle: `Peso: ${item.peso} kg`,
    });
  });

  const ultimaActividad =
    actividades.length > 0 ? actividades[actividades.length - 1] : null;
  const evolucionesProfesional =
    paciente?.evoluciones?.filter(
      (item) =>
        limpiarProfesional(item.profesional) ===
        limpiarProfesional(profesionalSeleccionado),
    ) || [];

  const indicacionesProfesional =
    paciente?.indicaciones?.filter(
      (item) =>
        limpiarProfesional(item.profesional) ===
        limpiarProfesional(profesionalSeleccionado),
    ) || [];

  const examenesProfesional =
    paciente?.examenes?.filter(
      (item) =>
        limpiarProfesional(item.profesional) ===
        limpiarProfesional(profesionalSeleccionado),
    ) || [];

  const signosVitalesProfesional =
    paciente?.signosVitales?.filter(
      (item) =>
        limpiarProfesional(item.profesional) ===
        limpiarProfesional(profesionalSeleccionado),
    ) || [];

  const antropometriaProfesional =
    paciente?.antropometria?.filter(
      (item) =>
        limpiarProfesional(item.profesional) ===
        limpiarProfesional(profesionalSeleccionado),
    ) || [];

  console.log("PROFESIONAL SELECCIONADO:", profesionalSeleccionado);

  console.log("EVOLUCIONES:", paciente?.evoluciones);
  console.log("INDICACIONES:", indicacionesProfesional);
  console.log("EXAMENES:", examenesProfesional);

  console.log("EVOLUCIONES FILTRADAS:", evolucionesProfesional);

  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";

    return new Date(fecha).toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("PROFESIONALES SET:", [...profesionales]);
  console.log("ANTROPOMETRIA:", paciente?.antropometria);
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
                    {formatearFecha(ultimaActividad.fecha)}
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
                    👨‍⚕️ {nombresMostrar[profesional]}
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
                    <small className="text-muted">
                      {formatearFecha(item.fechaRegistro || item.fecha)}
                    </small>

                    <p className="mb-0">{item.descripcion}</p>
                  </div>
                ))}

                <hr />

                <h6>📋 Indicaciones</h6>

                {indicacionesProfesional.map((item, index) => (
                  <div key={index} className="border rounded p-2 mb-2 bg-light">
                    <small className="text-muted">
                      {formatearFecha(item.fechaRegistro || item.fecha)}
                    </small>

                    <p className="mb-0">{item.indicacion}</p>
                  </div>
                ))}

                <hr />

                <h6>🧪 Exámenes</h6>

                {examenesProfesional.map((item, index) => (
                  <div key={index} className="border rounded p-2 mb-2 bg-light">
                    <small className="text-muted">
                      {formatearFecha(item.fechaRegistro || item.fecha)}
                    </small>

                    <p className="mb-0">
                      {item.nombre} - {item.estado}
                    </p>
                  </div>
                ))}

                <hr />

                <h6>❤️ Signos Vitales</h6>

                {signosVitalesProfesional.map((item, index) => (
                  <div key={index} className="border rounded p-2 mb-2 bg-light">
                    <small className="text-muted">
                      {formatearFecha(item.fechaRegistro || item.fecha)}
                    </small>

                    <p className="mb-1">PA: {item.presion}</p>

                    <p className="mb-1">FC: {item.frecuencia} lpm</p>

                    <p className="mb-1">Temperatura: {item.temperatura} °C</p>

                    <p className="mb-0">Saturación: {item.saturacion}%</p>
                  </div>
                ))}

                <hr />

                <h6>📏 Antropometría</h6>

                {antropometriaProfesional.map((item, index) => {
                  const imc =
                    item.peso && item.altura
                      ? (item.peso / (item.altura * item.altura)).toFixed(2)
                      : "No disponible";

                  return (
                    <div
                      key={index}
                      className="border rounded p-2 mb-2 bg-light"
                    >
                      <small className="text-muted">
                        {formatearFecha(item.fechaRegistro)}
                      </small>

                      <p className="mb-1">Peso: {item.peso} kg</p>

                      <p className="mb-1">Altura: {item.altura} m</p>

                      <p className="mb-0">IMC: {imc}</p>
                    </div>
                  );
                })}
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
