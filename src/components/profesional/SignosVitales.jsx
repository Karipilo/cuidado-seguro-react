import React from "react";

import {
    Card,
    Row,
    Col
} from "react-bootstrap";

import {
    HeartPulse,
    Activity,
    ThermometerHalf,
    DropletHalf
} from "react-bootstrap-icons";

const SignosVitales = () => {

    const signos = {

        presion: "120/80 mmHg",
        frecuencia: "78 lpm",
        temperatura: "36.5 °C",
        saturacion: "98%"

    };

    return (

        <Row className="g-4 mb-4">

            <Col md={6} xl={3}>

                <Card className="dashboard-modern-card h-100">

                    <Card.Body>

                        <div className="signo-icono">

                            <HeartPulse />

                        </div>

                        <h6 className="mt-3">

                            Presión Arterial

                        </h6>

                        <h4>

                            {signos.presion}

                        </h4>

                    </Card.Body>

                </Card>

            </Col>

            <Col md={6} xl={3}>

                <Card className="dashboard-modern-card h-100">

                    <Card.Body>

                        <div className="signo-icono">

                            <Activity />

                        </div>

                        <h6 className="mt-3">

                            Frecuencia Cardíaca

                        </h6>

                        <h4>

                            {signos.frecuencia}

                        </h4>

                    </Card.Body>

                </Card>

            </Col>

            <Col md={6} xl={3}>

                <Card className="dashboard-modern-card h-100">

                    <Card.Body>

                        <div className="signo-icono">

                            <ThermometerHalf />

                        </div>

                        <h6 className="mt-3">

                            Temperatura

                        </h6>

                        <h4>

                            {signos.temperatura}

                        </h4>

                    </Card.Body>

                </Card>

            </Col>

            <Col md={6} xl={3}>

                <Card className="dashboard-modern-card h-100">

                    <Card.Body>

                        <div className="signo-icono">

                            <DropletHalf />

                        </div>

                        <h6 className="mt-3">

                            Saturación O2

                        </h6>

                        <h4>

                            {signos.saturacion}

                        </h4>

                    </Card.Body>

                </Card>

            </Col>

        </Row>

    );
};

export default SignosVitales;