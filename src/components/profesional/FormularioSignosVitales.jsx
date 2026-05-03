import React, {
    useState
} from "react";

import {
    Card,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap";

const FormularioSignosVitales = ({
    paciente,
    setPaciente
}) => {

    const [formulario, setFormulario] =
        useState({

            sistolica: "",
            diastolica: "",
            frecuencia: "",
            temperatura: "",
            saturacion: ""

        });

    const handleChange = (e) => {

        setFormulario({

            ...formulario,
            [e.target.name]: e.target.value

        });
    };

    const guardarSignos = () => {

        if (
            !formulario.sistolica ||
            !formulario.diastolica ||
            !formulario.frecuencia ||
            !formulario.temperatura ||
            !formulario.saturacion
        ) {

            alert(
                "Complete todos los campos"
            );

            return;
        }

        const nuevoRegistro = {

            presion:
                `${formulario.sistolica}/${formulario.diastolica} mmHg`,

            frecuencia:
                `${formulario.frecuencia} lpm`,

            temperatura:
                `${formulario.temperatura} °C`,

            saturacion:
                `${formulario.saturacion} %`,

            fecha:
                new Date().toLocaleString()

        };

        const pacienteActualizado = {

            ...paciente,

            signosVitales: [

                ...(paciente.signosVitales || []),

                nuevoRegistro

            ]

        };

        setPaciente(pacienteActualizado);

        localStorage.setItem(

            "pacienteActivo",

            JSON.stringify(
                pacienteActualizado
            )

        );

        alert(
            "Signos vitales guardados"
        );

        setFormulario({

            sistolica: "",
            diastolica: "",
            frecuencia: "",
            temperatura: "",
            saturacion: ""

        });
    };

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

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
                                    name="sistolica"
                                    placeholder="Sistólica"
                                    value={formulario.sistolica}
                                    onChange={handleChange}
                                />

                                <Form.Control
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
                            name="frecuencia"
                            placeholder="lpm"
                            value={formulario.frecuencia}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label className="fw-semibold mb-2">

                            Temperatura

                        </Form.Label>

                        <Form.Control
                            name="temperatura"
                            placeholder="°C"
                            value={formulario.temperatura}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label className="fw-semibold mb-2">

                            Saturación O2

                        </Form.Label>

                        <Form.Control
                            name="saturacion"
                            placeholder="%"
                            value={formulario.saturacion}
                            onChange={handleChange}
                        />

                    </Col>

                </Row>

                <Button
                    className="mt-4 btn-dashboard-primary"
                    onClick={guardarSignos}
                >

                    Guardar signos vitales

                </Button>

            </Card.Body>

        </Card>

    );
};

export default FormularioSignosVitales;