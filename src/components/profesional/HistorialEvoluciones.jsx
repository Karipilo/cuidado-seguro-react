import React, { useState } from "react";

import { Card, Table, Button, Modal, Form } from "react-bootstrap";

import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";
const HistorialEvoluciones = ({ paciente, onActualizarPaciente }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [evolucionSeleccionada, setEvolucionSeleccionada] = useState(null);

  const [descripcion, setDescripcion] = useState("");

  const abrirModal = (evolucion) => {
    setEvolucionSeleccionada(evolucion);

    setDescripcion(evolucion.descripcion || "");

    setMostrarModal(true);
  };

  const actualizarEvolucion = async () => {
    try {
      if (!evolucionSeleccionada) {
        return;
      }

      const sesion = getMemoryJSON("sesion");

      await request(`/evoluciones/${evolucionSeleccionada.id}`, {
        method: "PUT",
        token: sesion?.accessToken,
        body: {
          ...evolucionSeleccionada,
          descripcion,
        },
      });
      setMostrarModal(false);
      await onActualizarPaciente();
      alert("Evolución actualizada");
    } catch (error) {
      console.error(error);

      alert("Error al actualizar evolución");
    }
  };
  return (
    <Card className="dashboard-modern-card">
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Evolución</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={6}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>

          <Button variant="success" onClick={actualizarEvolucion}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Evoluciones Clínicas
        </Card.Title>

        {paciente?.evoluciones?.length > 0 ? (
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Fecha</th>

                <th>Evolución</th>

                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {paciente.evoluciones
                .slice()
                .reverse()
                .map((evolucion) => (
                  <tr key={evolucion.id}>
                    <td>{evolucion.fecha}</td>

                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {evolucion.descripcion}
                    </td>

                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => abrirModal(evolucion)}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <p>No existen evoluciones registradas.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialEvoluciones;
