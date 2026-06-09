import React from "react";

import { Card, Badge } from "react-bootstrap";

const ExamenesClinicos = ({ paciente }) => {
  console.log("EXAMENES PACIENTE:", paciente?.examenes);

  return (
    <Card className="dashboard-modern-card mb-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Exámenes Clínicos
        </Card.Title>

        <div className="examenes-lista">
          {paciente?.examenes?.length > 0 ? (
            paciente.examenes
              .slice()
              .reverse()
              .map((examen, index) => {
                const obtenerColor = () => {
                  if (examen.estado === "Completado") {
                    return "success";
                  }

                  if (examen.estado === "En proceso") {
                    return "warning";
                  }

                  return "secondary";
                };

                return (
                  <div key={index} className="examen-item">
                    <div>
                      <h6 className="mb-1 fw-bold">{examen.nombre}</h6>

                      <small className="text-muted d-block">
                        Fecha: {examen.fecha}
                      </small>

                      <small className="text-muted d-block">
                        Profesional: {examen.profesional}
                      </small>

                      {examen.observacion && (
                        <small className="text-muted d-block">
                          Observación: {examen.observacion}
                        </small>
                      )}

                      {examen.resultado && (
                        <small className="text-success d-block mt-2">
                          Resultado: {examen.resultado}
                        </small>
                      )}
                      
                    </div>

                    <Badge bg={obtenerColor()}>{examen.estado}</Badge>
                  </div>
                );
              })
          ) : (
            <p>No existen exámenes registrados.</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExamenesClinicos;
