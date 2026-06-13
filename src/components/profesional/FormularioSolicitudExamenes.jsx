import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { request } from "../../utils/api";
import { getMemoryJSON } from "../../utils/memoryStore";

const FormularioSolicitudExamenes = ({ paciente, onActualizarPaciente, profesional }) => {
  const [seleccionados, setSeleccionados] = useState([]);

  const [observaciones, setObservaciones] = useState({
    sangre: "",
    orina: "",
    imagenologia: "",
    cardiologia: "",
  });

  const toggleExamen = (nombreExamen) => {
    if (seleccionados.includes(nombreExamen)) {
      setSeleccionados(seleccionados.filter((e) => e !== nombreExamen));
    } else {
      setSeleccionados([...seleccionados, nombreExamen]);
    }
  };

  const obtenerObservacion = (nombreExamen) => {
    const examenesSangre = [
      "Hemograma Completo",
      "Perfil Bioquímico",
      "Glicemia",
      "Perfil Lipídico",
      "Función Hepática",
    ];

    const examenesOrina = [
      "Orina Completa",
      "Urocultivo",
      "Coproparasitológico",
      "Sangre Oculta",
    ];

    const examenesImagenologia = [
      "Radiografía",
      "Ecografía",
      "TAC",
      "Resonancia Magnética",
    ];

    if (examenesSangre.includes(nombreExamen)) {
      return observaciones.sangre;
    }

    if (examenesOrina.includes(nombreExamen)) {
      return observaciones.orina;
    }

    if (examenesImagenologia.includes(nombreExamen)) {
      return observaciones.imagenologia;
    }

    return observaciones.cardiologia;
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

            fecha: new Date().toISOString().slice(0, 19),

            estado: "Solicitado",

            profesional: profesional,

            observacion: obtenerObservacion(examen),
            ficha: paciente.id,
            
          },
        });
      }

      alert("Orden de exámenes generada");

      await onActualizarPaciente();

      setSeleccionados([]);
      setObservaciones({
        sangre: "",
        orina: "",
        imagenologia: "",
        cardiologia: "",
      });
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
              checked={seleccionados.includes("Hemograma Completo")}
              onChange={() => toggleExamen("Hemograma Completo")}
            />

            <Form.Check
              label="Perfil Bioquímico"
              checked={seleccionados.includes("Perfil Bioquímico")}
              onChange={() => toggleExamen("Perfil Bioquímico")}
            />

            <Form.Check
              label="Glicemia"
              checked={seleccionados.includes("Glicemia")}
              onChange={() => toggleExamen("Glicemia")}
            />

            <Form.Check
              label="Perfil Lipídico"
              checked={seleccionados.includes("Perfil Lipídico")}
              onChange={() => toggleExamen("Perfil Lipídico")}
            />

            <Form.Check
              label="Función Hepática"
              checked={seleccionados.includes("Función Hepática")}
              onChange={() => toggleExamen("Función Hepática")}
            />
          </Col>

          <Col md={6}>
            <h5>Orina y Deposiciones</h5>

            <Form.Check
              label="Orina Completa"
              checked={seleccionados.includes("Orina Completa")}
              onChange={() => toggleExamen("Orina Completa")}
            />

            <Form.Check
              label="Urocultivo"
              checked={seleccionados.includes("Urocultivo")}
              onChange={() => toggleExamen("Urocultivo")}
            />

            <Form.Check
              label="Coproparasitológico"
              checked={seleccionados.includes("Coproparasitológico")}
              onChange={() => toggleExamen("Coproparasitológico")}
            />

            <Form.Check
              label="Sangre Oculta"
              checked={seleccionados.includes("Sangre Oculta")}
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
              checked={seleccionados.includes("Radiografía")}
              onChange={() => toggleExamen("Radiografía")}
            />

            <Form.Check
              label="Ecografía"
              checked={seleccionados.includes("Ecografía")}
              onChange={() => toggleExamen("Ecografía")}
            />

            <Form.Check
              label="TAC"
              checked={seleccionados.includes("TAC")}
              onChange={() => toggleExamen("TAC")}
            />

            <Form.Check
              label="Resonancia Magnética"
              checked={seleccionados.includes("Resonancia Magnética")}
              onChange={() => toggleExamen("Resonancia Magnética")}
            />
          </Col>

          <Col md={6}>
            <h5>Cardiología y Funcionales</h5>

            <Form.Check
              label="Electrocardiograma"
              checked={seleccionados.includes("Electrocardiograma")}
              onChange={() => toggleExamen("Electrocardiograma")}
            />

            <Form.Check
              label="Holter"
              checked={seleccionados.includes("Holter")}
              onChange={() => toggleExamen("Holter")}
            />

            <Form.Check
              label="Espirometría"
              checked={seleccionados.includes("Espirometría")}
              onChange={() => toggleExamen("Espirometría")}
            />
          </Col>
        </Row>

        <Form.Group className="mt-4">
          <Form.Label>Observaciones Análisis de Sangre</Form.Label>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Ej: Exámenes en ayunas"
            value={observaciones.sangre}
            onChange={(e) =>
              setObservaciones({
                ...observaciones,
                sangre: e.target.value,
              })
            }
          />

          <Form.Label className="mt-3">
            Observaciones Orina y Deposiciones
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Ej: Primera orina de la mañana"
            value={observaciones.orina}
            onChange={(e) =>
              setObservaciones({
                ...observaciones,
                orina: e.target.value,
              })
            }
          />

          <Form.Label className="mt-3">Observaciones Imagenología</Form.Label>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Ej: Radiografía mano derecha"
            value={observaciones.imagenologia}
            onChange={(e) =>
              setObservaciones({
                ...observaciones,
                imagenologia: e.target.value,
              })
            }
          />

          <Form.Label className="mt-3">
            Observaciones Cardiología y Funcionales
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Ej: Paciente con antecedentes cardíacos"
            value={observaciones.cardiologia}
            onChange={(e) =>
              setObservaciones({
                ...observaciones,
                cardiologia: e.target.value,
              })
            }
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
