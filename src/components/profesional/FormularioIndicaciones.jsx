import React, {
    useState
} from "react";

import {
    Card,
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";

const FormularioIndicaciones = ({
    paciente,
    setPaciente
}) => {

    const [formulario, setFormulario] =
        useState({

            medicamento: "",
            dosis: "",
            frecuencia: "",
            duracion: "",
            observaciones: ""

        });

    const handleChange = (e) => {

        setFormulario({

            ...formulario,
            [e.target.name]: e.target.value

        });
    };

    const guardarIndicacion = () => {

        if (
            !formulario.medicamento ||
            !formulario.dosis
        ) {

            alert(
                "Complete los campos"
            );

            return;
        }

        const sesion =
            JSON.parse(
                localStorage.getItem(
                    "sesion"
                )
            );

        const nuevaIndicacion = {

            ...formulario,

            profesional:
                sesion?.username ||
                "Profesional",

            fecha:
                new Date().toLocaleString()

        };

        const pacienteActualizado = {

            ...paciente,

            indicaciones: [

                ...(paciente.indicaciones || []),

                nuevaIndicacion

            ]

        };

        setPaciente(
            pacienteActualizado
        );

        alert(
            "Indicaciones guardadas"
        );

        setFormulario({

            medicamento: "",
            dosis: "",
            frecuencia: "",
            duracion: "",
            observaciones: ""
            

        });
    };

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Registrar Indicaciones

                </Card.Title>

                <Row className="g-3">

                    <Col md={6}>

                        <Form.Label>

                            Medicamento

                        </Form.Label>

                        <Form.Control
                            name="medicamento"
                            value={formulario.medicamento}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>

                            Dosis

                        </Form.Label>

                        <Form.Control
                            name="dosis"
                            value={formulario.dosis}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>

                            Frecuencia

                        </Form.Label>

                        <Form.Control
                            name="frecuencia"
                            value={formulario.frecuencia}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>

                            Duración

                        </Form.Label>

                        <Form.Control
                            name="duracion"
                            value={formulario.duracion}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={12}>

                        <Form.Label>

                            Observaciones

                        </Form.Label>

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
                    onClick={guardarIndicacion}
                >

                    Guardar indicaciones

                </Button>

            </Card.Body>

        </Card>
    );
};

export default FormularioIndicaciones;