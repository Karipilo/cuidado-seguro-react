import React, { useState } from "react";
import { Card, Badge, Table, Modal, Button, Form } from "react-bootstrap";
import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";

const ExamenesClinicos = ({ paciente, onActualizarPaciente, profesional }) => {
  console.log("EXAMENES PACIENTE:", paciente?.examenes);

  const [resultados, setResultados] = useState({});

  const [mostrarModal, setMostrarModal] = useState(false);

  const [examenSeleccionado, setExamenSeleccionado] = useState(null);

  const abrirModal = (examen) => {
    setExamenSeleccionado(examen);

    setResultados({
      ...resultados,
      [examen.id]: examen.resultado || "",
    });

    setMostrarModal(true);
  };

  const guardarResultado = async (examen) => {
    try {
      const sesion = getMemoryJSON("sesion");

      await request(`/examenes/${examen.id}`, {
        method: "PUT",
        token: sesion?.accessToken,
        body: {
          nombreExamen: examen.nombreExamen,
        tipoExamen: examen.tipoExamen,
        fechaExamen: examen.fechaExamen,
        estado: "Completado",
        resultado: resultados[examen.id] || "",
        fichaId: examen.ficha?.id || examen.fichaId,
      },
      });

      await onActualizarPaciente();
      alert("Resultado guardado");
    } catch (error) {
      console.error(error);

      alert("Error al guardar resultado");
    }
  };

  const actualizarResultado = async (examen) => {
  try {
    const sesion = getMemoryJSON("sesion");

    await request(`/examenes/${examen.id}`, {
      method: "PUT",
      token: sesion?.accessToken,
      body: {
        nombreExamen: examen.nombreExamen,
        tipoExamen: examen.tipoExamen,
        fechaExamen: examen.fechaExamen,
        estado: "Completado",
        resultado: resultados[examen.id] || "",
        fichaId: examen.ficha?.id || examen.fichaId,
      }
    });

    await onActualizarPaciente();

    alert("Resultado actualizado");
    console.log("RESULTADO ACTUALIZADO:", JSON.stringify(resultados[examen.id], null, 2));

  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error, null, 2));
    
    alert("Error al actualizar resultado");
  }
};

  return (
    <Card className="dashboard-modern-card mb-4">
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado de Examen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>{examenSeleccionado?.nombre}</strong>
          </p>

          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Ingrese resultado..."
            value={resultados[examenSeleccionado?.id] || ""}
            onChange={(e) =>
              setResultados({
                ...resultados,
                [examenSeleccionado.id]: e.target.value,
              })
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>

          <Button
            variant="success"
            onClick={async () => {
              if (examenSeleccionado.estado === "Completado") {
                await actualizarResultado(examenSeleccionado);
              } else {
                await guardarResultado(examenSeleccionado);
              }

              setMostrarModal(false);
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Exámenes Clínicos
        </Card.Title>

        <div className="examenes-lista">
          {paciente?.examenes?.length > 0 ? (
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Fecha</th>

                  <th>Examen</th>

                  <th>Estado</th>

                  <th>Profesional</th>

                  <th>Observación</th>

                  <th>Resultado</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {paciente.examenes
                  .slice()
                  .reverse()
                  .map((examen) => {
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
                      <tr key={examen.id}>
                        <td>{examen.fecha}</td>

                        <td>{examen.nombre}</td>

                        <td>
                          <Badge bg={obtenerColor()}>{examen.estado}</Badge>
                        </td>

                        <td>{examen.profesional}</td>

                        <td>{examen.observacion || "--"}</td>

                        <td style={{ whiteSpace: "pre-wrap" }}>
                          {examen.resultado || (
                            <span className="text-muted">Sin resultado</span>
                          )}
                        </td>

                        <td>
                          {examen.resultado ? (
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => abrirModal(examen)}
                            >
                              Editar
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => abrirModal(examen)}
                            >
                              Ingresar
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            <p>No existen exámenes registrados.</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExamenesClinicos;
