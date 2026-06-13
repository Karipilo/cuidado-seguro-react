import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { getMemoryJSON } from "../../utils/memoryStore";
import { request } from "../../utils/api";

const FormularioSignosVitales = ({ paciente, setPaciente,profesional }) => {
  const [formulario, setFormulario] = useState({
    sistolica: "",
    diastolica: "",
    frecuencia: "",
    temperatura: "",
    saturacion: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarSignos = async () => {
  try {

    if (
      !formulario.sistolica ||
      !formulario.diastolica ||
      !formulario.frecuencia ||
      !formulario.temperatura ||
      !formulario.saturacion
    ) {

      alert("Complete todos los campos");
      return;

    }

    if (
      isNaN(formulario.sistolica) ||
      isNaN(formulario.diastolica) ||
      isNaN(formulario.frecuencia) ||
      isNaN(formulario.temperatura) ||
      isNaN(formulario.saturacion)
    ) {

      alert("Solo se permiten números");
      return;

    }
      

      const sesion = getMemoryJSON("sesion");
      console.log("SESION COMPLETA:", sesion);

      console.log("PACIENTE:", paciente);
      console.log("SESION COMPLETA:", sesion);
      const nuevosSignos = await request(`/signos-vitales/${paciente.id}`, {
        method: "POST",
        token: sesion?.accessToken,
        body: {
          presion: `${formulario.sistolica}/${formulario.diastolica} mmHg`,
          frecuencia: Number(formulario.frecuencia),
          temperatura: Number(formulario.temperatura),
          saturacion: Number(formulario.saturacion),
          profesional: profesional,
          fecha: new Date().toISOString().slice(0, 19),
        },
      });

      console.log("SIGNOS VITALES GUARDADOS:", nuevosSignos);

      setPaciente((prev) => ({
        ...prev,
        signosVitales: [...(prev.signosVitales || []), nuevosSignos],
      }));

      alert("Signos vitales guardados en BD");

      setFormulario({
        sistolica: "",
        diastolica: "",
        frecuencia: "",
        temperatura: "",
        saturacion: "",
      });
    } catch (error) {
      console.error("ERROR GUARDANDO SIGNOS VITALES:", error);

      alert("No se pudieron guardar los signos vitales");
    }
  };

  return (
    <Card className="dashboard-modern-card mb-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Registrar Signos Vitales
        </Card.Title>

        <Row className="g-3">
          <Col md={6}>
            <div>
              <Form.Label className="fw-semibold mb-2">
                Presión Arterial
              </Form.Label>

              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  min="0"
                  max="300"
                  name="sistolica"
                  placeholder="Sistólica"
                  value={formulario.sistolica}
                  onChange={handleChange}
                />

                <Form.Control
                  type="number"
                  min="0"
                  max="300"
                  name="diastolica"
                  placeholder="Diastólica"
                  value={formulario.diastolica}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Col>

          <Col md={6}>
            <Form.Label className="fw-semibold mb-2">
              Frecuencia Cardíaca
            </Form.Label>

            <Form.Control
              type="number"
              min="0"
              max="300"
              name="frecuencia"
              placeholder="lpm"
              value={formulario.frecuencia}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label className="fw-semibold mb-2">Temperatura</Form.Label>

            <Form.Control
              type="number"
              step="0.1"
              min="0"
              max="50"
              name="temperatura"
              placeholder="°C"
              value={formulario.temperatura}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label className="fw-semibold mb-2">
              Saturación de Oxígeno
            </Form.Label>

            <Form.Control
              type="number"
              min="0"
              max="100"
              name="saturacion"
              placeholder="%"
              value={formulario.saturacion}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Button className="mt-4 btn-dashboard-primary" onClick={guardarSignos}>
          Guardar signos vitales
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FormularioSignosVitales;
