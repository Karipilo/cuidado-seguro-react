import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";

const FormularioSolicitudExamenes = ({ paciente }) => {
  const [seleccionados, setSeleccionados] = useState([]);

  const [observacion, setObservacion] = useState("");

  const toggleExamen = (nombreExamen) => {
    if (seleccionados.includes(nombreExamen)) {
      setSeleccionados(seleccionados.filter((e) => e !== nombreExamen));
    } else {
      setSeleccionados([...seleccionados, nombreExamen]);
    }
  };

  const generarOrden = async () => {
    try {
      if (seleccionados.length === 0) {
        alert("Debe seleccionar al menos un examen");
        return;
      }

      const sesion = getMemoryJSON("sesion");

      const token = sesion?.accessToken;

      for (const examen of seleccionados) {
        await request("/examenes", {
          method: "POST",

          token,

          body: {
            nombre: examen,

            fecha: new Date().toLocaleString(),

            estado: "Solicitado",

            profesional: `${sesion?.userInfo?.nombreCompleto} (${sesion?.userInfo?.profesion})`,

            observacion,

            ficha: {
              id: paciente.id,
            },
          },
        });
      }

      alert("Orden de exámenes generada");

      setSeleccionados([]);
      setObservacion("");
    } catch (error) {
      console.error(error);

      alert("Error al generar la orden");
    }
  };

  return (
    <Card className="dashboard-modern-card mb-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Solicitud de Exámenes Clínicos
        </Card.Title>

        <Row>
          <Col md={6}>
            <h5>Análisis de Sangre</h5>

            <Form.Check
              label="Hemograma Completo"
              onChange={() => toggleExamen("Hemograma Completo")}
            />

            <Form.Check
              label="Perfil Bioquímico"
              onChange={() => toggleExamen("Perfil Bioquímico")}
            />

            <Form.Check
              label="Glicemia"
              onChange={() => toggleExamen("Glicemia")}
            />

            <Form.Check
              label="Perfil Lipídico"
              onChange={() => toggleExamen("Perfil Lipídico")}
            />

            <Form.Check
              label="Función Hepática"
              onChange={() => toggleExamen("Función Hepática")}
            />
          </Col>

          <Col md={6}>
            <h5>Orina y Deposiciones</h5>

            <Form.Check
              label="Orina Completa"
              onChange={() => toggleExamen("Orina Completa")}
            />

            <Form.Check
              label="Urocultivo"
              onChange={() => toggleExamen("Urocultivo")}
            />

            <Form.Check
              label="Coproparasitológico"
              onChange={() => toggleExamen("Coproparasitológico")}
            />

            <Form.Check
              label="Sangre Oculta"
              onChange={() => toggleExamen("Sangre Oculta")}
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={6}>
            <h5>Imagenología</h5>

            <Form.Check
              label="Radiografía"
              onChange={() => toggleExamen("Radiografía")}
            />

            <Form.Check
              label="Ecografía"
              onChange={() => toggleExamen("Ecografía")}
            />

            <Form.Check label="TAC" onChange={() => toggleExamen("TAC")} />

            <Form.Check
              label="Resonancia Magnética"
              onChange={() => toggleExamen("Resonancia Magnética")}
            />
          </Col>

          <Col md={6}>
            <h5>Cardiología y Funcionales</h5>

            <Form.Check
              label="Electrocardiograma"
              onChange={() => toggleExamen("Electrocardiograma")}
            />

            <Form.Check
              label="Holter"
              onChange={() => toggleExamen("Holter")}
            />

            <Form.Check
              label="Espirometría"
              onChange={() => toggleExamen("Espirometría")}
            />
          </Col>
        </Row>

        <Form.Group className="mt-4">
          <Form.Label>Observaciones</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-4 btn-dashboard-primary" onClick={generarOrden}>
          Generar Orden de Exámenes
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FormularioSolicitudExamenes;
