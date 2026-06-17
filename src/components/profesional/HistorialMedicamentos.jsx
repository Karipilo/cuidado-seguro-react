import React, { useState } from "react";

import { Card, Table, Button, Modal, Form } from "react-bootstrap";

import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";
const HistorialMedicamentos = ({
  paciente,
  onActualizarPaciente,
  profesional,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    dosis: "",
    frecuencia: "",
    diasTratamiento: "",
    observaciones: "",
  });
  const abrirModal = (medicamento) => {
    console.log("CLICK EDITAR:", medicamento);
    setMedicamentoSeleccionado(medicamento);

    setFormulario({
      nombre: medicamento.nombre || "",
      dosis: medicamento.dosis || "",
      frecuencia: medicamento.frecuencia || "",
      diasTratamiento: medicamento.diasTratamiento || "",
      observaciones: medicamento.observaciones || "",
    });

    setMostrarModal(true);
  };
  const actualizarMedicamento = async () => {
    try {
      const sesion = getMemoryJSON("sesion");

      await request(`/medicamentos/${medicamentoSeleccionado.id}`, {
        method: "PUT",
        token: sesion?.accessToken,

        body: {
          nombre: formulario.nombre,
          dosis: formulario.dosis,
          frecuencia: formulario.frecuencia,

          diasTratamiento: Number(formulario.diasTratamiento) || null,

          observaciones: formulario.observaciones,

          profesional: profesional,

          ficha: String(paciente.id),
        },
      });

      setMostrarModal(false);

      await onActualizarPaciente();

      alert("Medicamento actualizado");
    } catch (error) {
      console.error(error);

      alert("Error al actualizar medicamento");
    }
  };

  return (
    <>
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Medicamento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            className="mb-2"
            value={formulario.nombre}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                nombre: e.target.value,
              })
            }
          />

          <Form.Control
            className="mb-2"
            value={formulario.dosis}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                dosis: e.target.value,
              })
            }
          />

          <Form.Control
            className="mb-2"
            value={formulario.frecuencia}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                frecuencia: e.target.value,
              })
            }
          />

          <Form.Control
            className="mb-2"
            type="number"
            value={formulario.diasTratamiento}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                diasTratamiento: e.target.value,
              })
            }
          />

          <Form.Control
            as="textarea"
            rows={3}
            value={formulario.observaciones}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                observaciones: e.target.value,
              })
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>

          <Button variant="success" onClick={actualizarMedicamento}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="dashboard-modern-card">
        <Card.Body>
          <Card.Title className="dashboard-card-title">
            Medicamentos Prescritos
          </Card.Title>

          {paciente?.medicamentos?.length > 0 ? (
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Frecuencia</th>
                  <th>Días</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {paciente.medicamentos
                  .slice()
                  .reverse()
                  .map((medicamento) => {
                    console.log("MEDICAMENTO:", medicamento);

                    return (
                      <tr key={medicamento.id}>
                        <td>
                          {medicamento.fechaRegistro
                            ? new Date(
                                medicamento.fechaRegistro,
                              ).toLocaleDateString("es-CL")
                            : "-"}
                        </td>
                        <td>{medicamento.nombre}</td>
                        <td>{medicamento.dosis}</td>
                        <td>{medicamento.frecuencia}</td>
                        <td>{medicamento.diasTratamiento}</td>
                        <td>{medicamento.observaciones || "--"}</td>

                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => abrirModal(medicamento)}
                          >
                            Editar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            <p>No existen medicamentos prescritos.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default HistorialMedicamentos;
