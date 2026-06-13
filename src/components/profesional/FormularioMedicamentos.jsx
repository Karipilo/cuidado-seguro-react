import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { getMemoryJSON } from "../../utils/memoryStore";
import { request } from "../../utils/api";

const FormularioMedicamentos = ({ paciente, setPaciente, profesional }) => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    dosis: "",
    frecuencia: "",
    diasTratamiento: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarMedicamento = async () => {
    try {
      if (!formulario.nombre || !formulario.dosis || !formulario.frecuencia) {
        alert("Complete los campos obligatorios");
        return;
      }

      const sesion = getMemoryJSON("sesion");
      console.log("PACIENTE COMPLETO:", paciente);
      console.log("PACIENTE ID:", paciente?.id);

      const nombreProf =
        sesion?.userInfo?.nombreCompleto || sesion?.username || "Profesional";
      const cargoProf = sesion?.userInfo?.profesion
        ? ` (${sesion.userInfo.profesion})`
        : "";
      const profesionalFirma = `${nombreProf}${cargoProf}`;

      console.log("MEDICAMENTO A ENVIAR:", {
        nombre: formulario.nombre,
        dosis: formulario.dosis,
        frecuencia: formulario.frecuencia,
        diasTratamiento: Number(formulario.diasTratamiento) || null,
        observaciones: formulario.observaciones,
        profesional: profesionalFirma,
        ficha: {
          id: paciente.id,
        },
      });
      const nuevoMedicamento = await request("/medicamentos", {
        method: "POST",
        token: sesion?.accessToken,
        body: {
          nombre: formulario.nombre,
          dosis: formulario.dosis,
          frecuencia: formulario.frecuencia,
          diasTratamiento: Number(formulario.diasTratamiento) || null,
          observaciones: formulario.observaciones,
          profesional: profesionalFirma,
          ficha: paciente.id,
        },
      });

      setPaciente((prev) => ({
        ...prev,
        medicamentos: [...(prev.medicamentos || []), nuevoMedicamento],
      }));

      alert("Medicamento guardado correctamente");

      setFormulario({
        nombre: "",
        dosis: "",
        frecuencia: "",
        diasTratamiento: "",
        observaciones: "",
      });
    } catch (error) {
      console.error("ERROR COMPLETO:", error);

      if (error?.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "No se pudo guardar el medicamento",
      );
    }
  };

  return (
    <Card className="dashboard-modern-card">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Prescripción de Medicamentos
        </Card.Title>

        <Row className="g-3">
          <Col md={6}>
            <Form.Label>Medicamento</Form.Label>
            <Form.Control
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label>Dosis</Form.Label>
            <Form.Control
              name="dosis"
              placeholder="Ej: 50 mg"
              value={formulario.dosis}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label>Frecuencia</Form.Label>
            <Form.Control
              name="frecuencia"
              placeholder="Ej: Cada 24 horas"
              value={formulario.frecuencia}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label>Días tratamiento</Form.Label>
            <Form.Control
              name="diasTratamiento"
              type="number"
              value={formulario.diasTratamiento}
              onChange={handleChange}
            />
          </Col>

          <Col md={12}>
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="observaciones"
              value={formulario.observaciones}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Button
          className="mt-4 btn-dashboard-primary"
          onClick={guardarMedicamento}
        >
          Guardar medicamento
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FormularioMedicamentos;
