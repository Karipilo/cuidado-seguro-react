import React from "react";

import {
    Card,
    Row,
    Col,
    Badge
} from "react-bootstrap";

const Antropometria = () => {

    const datos = {

        peso: 82,
        altura: 1.72

    };

    const imc =
        (
            datos.peso /
            (datos.altura * datos.altura)
        ).toFixed(1);

    const obtenerEstadoIMC = () => {

        if (imc < 18.5) {

            return {
                texto: "Bajo peso",
                color: "warning"
            };
        }

        if (imc < 25) {

            return {
                texto: "Normal",
                color: "success"
            };
        }

        if (imc < 30) {

            return {
                texto: "Sobrepeso",
                color: "warning"
            };
        }

        return {
            texto: "Obesidad",
            color: "danger"
        };
    };

    const estadoIMC =
        obtenerEstadoIMC();

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Antropometría

                </Card.Title>

                <Row>

                    <Col md={4}>

                        <div className="antropometria-item">

                            <small className="text-muted">

                                Peso

                            </small>

                            <h4>

                                {datos.peso} kg

                            </h4>

                        </div>

                    </Col>

                    <Col md={4}>

                        <div className="antropometria-item">

                            <small className="text-muted">

                                Altura

                            </small>

                            <h4>

                                {datos.altura} m

                            </h4>

                        </div>

                    </Col>

                    <Col md={4}>

                        <div className="antropometria-item">

                            <small className="text-muted">

                                IMC

                            </small>

                            <div className="d-flex align-items-center gap-2">

                                <h4 className="mb-0">

                                    {imc}

                                </h4>

                                <Badge bg={estadoIMC.color}>

                                    {estadoIMC.texto}

                                </Badge>

                            </div>

                        </div>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );
};

export default Antropometria;