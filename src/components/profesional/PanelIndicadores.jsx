import { Card, Col, Row } from "react-bootstrap";

const PanelIndicadores = ({
  pacientes = 0,
  fichas = 0,
  evoluciones = 0,
  examenes = 0,
}) => {
  return (
    <Row className="mb-4">

      <Col md={3}>
        <Card className="dashboard-modern-card text-center">
          <Card.Body>
            <h6>Pacientes Registrados</h6>
            <h2>{pacientes}</h2>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="dashboard-modern-card text-center">
          <Card.Body>
            <h6>Fichas Clínicas</h6>
            <h2>{fichas}</h2>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="dashboard-modern-card text-center">
          <Card.Body>
            <h6>Evoluciones</h6>
            <h2>{evoluciones}</h2>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card className="dashboard-modern-card text-center">
          <Card.Body>
            <h6>Exámenes</h6>
            <h2>{examenes}</h2>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  );
};

export default PanelIndicadores;