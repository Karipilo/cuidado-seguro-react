import React, { useState } from "react";

import { Card, Table, Button, Modal, Form } from "react-bootstrap";

import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";

const HistorialIndicaciones = ({
  paciente,
  onActualizarPaciente,
  profesional,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [indicacionSeleccionada, setIndicacionSeleccionada] = useState(null);

  const [textoIndicacion, setTextoIndicacion] = useState("");

  const abrirModal = (indicacion) => {
    setIndicacionSeleccionada(indicacion);

    setTextoIndicacion(indicacion.indicacion || "");

    setMostrarModal(true);
  };

  const actualizarIndicacion = async () => {
    try {
      if (!indicacionSeleccionada) {
        return;
      }

      const sesion = getMemoryJSON("sesion");

      await request(`/indicaciones/${indicacionSeleccionada.id}`, {
        method: "PUT",
        token: sesion?.accessToken,
        body: {
          ...indicacionSeleccionada,
          indicacion: textoIndicacion,
        },
      });

      setMostrarModal(false);

      await onActualizarPaciente();

      alert("Indicación actualizada");
    } catch (error) {
      console.error(error);

      alert("Error al actualizar indicación");
    }
  };

  return (
    <Card className="dashboard-modern-card">
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Indicación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={6}
            value={textoIndicacion}
            onChange={(e) => setTextoIndicacion(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>

          <Button variant="success" onClick={actualizarIndicacion}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Indicaciones Médicas
        </Card.Title>

        {paciente?.indicaciones?.length > 0 ? (
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Indicación</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {paciente.indicaciones
                .slice()
                .reverse()
                .map((indicacion) => (
                  <tr key={indicacion.id}>
                    <td>
                      {indicacion.fechaRegistro
                        ? new Date(indicacion.fechaRegistro).toLocaleDateString(
                            "es-CL",
                          )
                        : "-"}
                    </td>

                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {indicacion.indicacion}
                    </td>

                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => abrirModal(indicacion)}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <p>No existen indicaciones registradas.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialIndicaciones;
