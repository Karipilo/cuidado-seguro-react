import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { getMemoryJSON } from "../../utils/memoryStore";
import { request } from "../../utils/api";

const FormularioAntropometria = ({ paciente, setPaciente }) => {
  const [formulario, setFormulario] = useState({
    peso: "",
    altura: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarAntropometria = async () => {
    try {
      if (!formulario.peso || !formulario.altura) {
        alert("Complete todos los campos");
        return;
      }
      if (isNaN(formulario.peso) || isNaN(formulario.altura)) {
        alert("Solo se permiten números");
        return;
      }

      const peso = Number(formulario.peso);
      const altura = Number(formulario.altura);

      const sesion = getMemoryJSON("sesion");

      console.log("PACIENTE:", paciente);

      const nuevaAntropometria = await request(
        `/antropometrias/${paciente.id}`,
        {
          method: "POST",
          token: sesion?.accessToken,
          body: {
            peso,
            altura,
          },
        },
      );

      console.log("ANTROPOMETRIA GUARDADA:", nuevaAntropometria);

      setPaciente((prev) => ({
        ...prev,
        antropometria: [...(prev.antropometria || []), nuevaAntropometria],
      }));

      alert("Antropometría guardada exitosamente");

      setFormulario({
        peso: "",
        altura: "",
      });
    } catch (error) {
      console.error("ERROR GUARDANDO ANTROPOMETRIA:", error);

      alert("No se pudo guardar la antropometría");
    }
  };

  return (
    <Card className="dashboard-modern-card mb-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Registrar Antropometría
        </Card.Title>

        <Row className="g-3">
          <Col md={6}>
            <Form.Label>Peso (kg)</Form.Label>

            <Form.Control
              type="number"
              min="1"
              max="500"
              step="0.001"
              name="peso"
              value={formulario.peso}
              onChange={handleChange}
              placeholder="Ej: 82"
            />
          </Col>

          <Col md={6}>
            <Form.Label>Altura (m)</Form.Label>

            <Form.Control
              type="number"
              min="0.1"
              max="3"
              step="0.01"
              name="altura"
              value={formulario.altura}
              onChange={handleChange}
              placeholder="Ej: 1.72"
            />
          </Col>
        </Row>

        <Button
          className="mt-4 btn-dashboard-primary"
          onClick={guardarAntropometria}
        >
          Guardar antropometría
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FormularioAntropometria;
