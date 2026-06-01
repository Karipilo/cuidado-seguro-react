import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getMemoryJSON } from "../../utils/memoryStore";
import { request } from "../../utils/api";

const FormularioFichaClinica = ({ paciente, setPaciente }) => {
  const [formulario, setFormulario] = useState({
    diagnostico: paciente?.diagnostico || "",

    alergias: paciente?.alergias || "",

    observaciones: paciente?.observaciones || "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,

      [e.target.name]: e.target.value,
    });
  };

  const guardarFicha = async () => {
    try {
      const sesion = getMemoryJSON("sesion");

      const token = sesion?.accessToken;

      await request(
        `/fichas/rut/${paciente.numeroDocumento}`,

        {
          method: "PUT",

          token,

          body: {
            diagnostico: formulario.diagnostico,

            alergias: formulario.alergias,

            observaciones: formulario.observaciones,

            edad: paciente.edad,

            genero: paciente.genero,
          },
        },
      );

      setPaciente({
        ...paciente,

        diagnostico: formulario.diagnostico,

        alergias: formulario.alergias,

        observaciones: formulario.observaciones,
      });

      alert("Ficha clínica actualizada");
    } catch (error) {
      console.error(error);

      alert("Error al actualizar ficha clínica");
    }
  };

  return (
    <Card className="dashboard-modern-card">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Editar Ficha Clínica
        </Card.Title>

        <Form.Group className="mb-3">
          <Form.Label>Diagnóstico</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="diagnostico"
            value={formulario.diagnostico}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alergias</Form.Label>

          <Form.Control
            name="alergias"
            value={formulario.alergias}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Observaciones</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            name="observaciones"
            value={formulario.observaciones}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="btn-dashboard-primary" onClick={guardarFicha}>
          Guardar cambios
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FormularioFichaClinica;
