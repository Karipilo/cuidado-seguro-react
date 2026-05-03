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

    const calcularEdad = (fechaNacimiento) => {

        const hoy = new Date();

        const nacimiento =
            new Date(fechaNacimiento);

        let edad =
            hoy.getFullYear() -
            nacimiento.getFullYear();

        const mes =
            hoy.getMonth() -
            nacimiento.getMonth();

        if (
            mes < 0 ||
            (
                mes === 0 &&
                hoy.getDate() <
                nacimiento.getDate()
            )
        ) {

            edad--;

        }

        return edad;
    };

    return (

        <Card className="paciente-banner mb-4">

            <Card.Body>

                <div className="paciente-header">

                    <div>

                        <h3 className="mb-1">

                            {paciente?.nombres}
                            {" "}
                            {paciente?.apellidos}

                        </h3>

                        <p className="text-muted mb-0">

                            RUT:
                            {" "}
                            {paciente?.numeroDocumento}

                        </p>

                    </div>

                    <div className="estado-paciente">

                        Paciente activo

                    </div>

                </div>

                <Row className="mt-4 g-3">

                    <Col md={4}>

                        <div className="paciente-info-card">

                            <small className="text-muted">

                                Edad

                            </small>

                            <h5>

                                {paciente?.fechaNacimiento
                                    ? calcularEdad(
                                        paciente.fechaNacimiento
                                    )
                                    : "--"}

                            </h5>

                        </div>

                    </Col>

                    <Col md={4}>

                        <div className="paciente-info-card">

                            <small className="text-muted">

                                Género

                            </small>

                            <h5>

                                {paciente?.genero}

                            </h5>

                        </div>

                    </Col>

                    <Col md={4}>

                        <div className="paciente-info-card">

                            <small className="text-muted">

                                Alergias

                            </small>

                            <h5>

                                {paciente?.alergias}

                            </h5>

                        </div>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );
};

export default PacienteResumen;