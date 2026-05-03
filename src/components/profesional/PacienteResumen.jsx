import React from "react";

import {
    Card,
    Row,
    Col,
    Badge
} from "react-bootstrap";

const PacienteResumen = ({ paciente }) => {

    if (!paciente) {

        return null;
    }

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <div className="d-flex justify-content-between align-items-start mb-4">

                    <div>

                        <h4 className="mb-1">

                            {paciente?.nombres}
                            {" "}
                            {paciente?.apellidos}

                        </h4>

                        <p className="text-muted mb-0">

                            {paciente?.numeroDocumento}

                        </p>

                    </div>

                    <Badge bg="secondary">

                        Paciente activo

                    </Badge>

                </div>

                <Row>

                    <Col md={6} className="mb-3">

                        <strong>
                            Grupo sanguíneo:
                        </strong>

                        <p className="mb-0">

                            {paciente?.grupoSanguineo}

                        </p>

                    </Col>

                    <Col md={6} className="mb-3">

                        <strong>
                            Alergias:
                        </strong>

                        <p className="mb-0">

                            {paciente?.alergias}

                        </p>

                    </Col>

                    <Col md={6}>

                        <strong>
                            Enfermedades:
                        </strong>

                        <p className="mb-0">

                            {paciente?.enfermedadesCronicas}

                        </p>

                    </Col>

                    <Col md={6}>

                        <strong>
                            Medicamentos:
                        </strong>

                        <p className="mb-0">

                            {paciente?.medicamentosActuales}

                        </p>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );
};

export default PacienteResumen;