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

const FormularioAntropometria = ({
    paciente,
    setPaciente
}) => {

    const [formulario, setFormulario] =
        useState({

            peso: "",
            altura: ""

        });

    const handleChange = (e) => {

        setFormulario({

            ...formulario,
            [e.target.name]: e.target.value

        });
    };

    const guardarAntropometria = () => {

        if (
            !formulario.peso ||
            !formulario.altura
        ) {

            alert(
                "Complete todos los campos"
            );

            return;
        }

        const nuevoRegistro = {

            peso:
                Number(formulario.peso),

            altura:
                Number(formulario.altura),

            fecha:
                new Date().toLocaleString()

        };

        const pacienteActualizado = {

            ...paciente,

            antropometria: [

                ...(paciente.antropometria || []),

                nuevoRegistro

            ]

        };

        setPaciente(
            pacienteActualizado
        );

        alert(
            "Antropometría guardada"
        );

        setFormulario({

            peso: "",
            altura: ""

        });
    };

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Registrar Antropometría

                </Card.Title>

                <Row className="g-3">

                    <Col md={6}>

                        <Form.Label>

                            Peso (kg)

                        </Form.Label>

                        <Form.Control
                            name="peso"
                            value={formulario.peso}
                            onChange={handleChange}
                            placeholder="Ej: 82"
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>

                            Altura (m)

                        </Form.Label>

                        <Form.Control
                            name="altura"
                            value={formulario.altura}
                            onChange={handleChange}
                            placeholder="Ej: 1.72"
                        />

                    </Col>

                </Row>

                <Button
                    className="mt-4 btn-dashboard-primary"
                    onClick={guardarAntropometria}
                >

                    Guardar antropometría

                </Button>

            </Card.Body>

        </Card>
    );
};

export default FormularioAntropometria;