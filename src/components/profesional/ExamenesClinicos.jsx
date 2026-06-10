import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";

const ExamenesClinicos = ({ paciente, onActualizarPaciente }) => {
  console.log("EXAMENES PACIENTE:", paciente?.examenes);

  const [resultados, setResultados] = useState({});

  const guardarResultado = async (examen) => {
    try {
      const sesion = getMemoryJSON("sesion");

      await request(`/examenes/${examen.id}`, {
        method: "PUT",
        token: sesion?.accessToken,
        body: {
          ...examen,
          estado: "Completado",
          resultado: resultados[examen.id] || "",
        },
      });

      onActualizarPaciente();
      alert("Resultado guardado");
    } catch (error) {
      console.error(error);

      alert("Error al guardar resultado");
    }
  };

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
                    {examen.estado !== "Completado" && (
                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Ingrese resultado del examen..."
                          value={resultados[examen.id] || ""}
                          onChange={(e) =>
                            setResultados({
                              ...resultados,
                              [examen.id]: e.target.value,
                            })
                          }
                        />

                        <button
                          className="btn btn-success mt-2"
                          onClick={() => guardarResultado(examen)}
                        >
                          Guardar resultado
                        </button>
                      </div>
                    )}
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
