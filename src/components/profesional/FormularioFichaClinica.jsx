import { Card } from "react-bootstrap";

const FormularioFichaClinica = ({ paciente }) => {
  const profesionales = new Set();

  paciente?.evoluciones?.forEach((item) => {
    if (item.profesional) profesionales.add(item.profesional);
  });

  paciente?.indicaciones?.forEach((item) => {
    if (item.profesional) profesionales.add(item.profesional);
  });

  paciente?.examenes?.forEach((item) => {
    if (item.profesional) profesionales.add(item.profesional);
  });

  paciente?.signosVitales?.forEach((item) => {
    if (item.profesional) profesionales.add(item.profesional);
  });

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
                  <p key={index} className="mb-2">
                    👨‍⚕️ {profesional}
                  </p>
                ))
              ) : (
                <p className="text-muted mb-0">
                  No existen profesionales registrados.
                </p>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Resumen Estadístico</Card.Title>

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
