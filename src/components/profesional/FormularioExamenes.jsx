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

const FormularioExamenes = ({
    paciente,
    setPaciente
}) => {

    const [formulario, setFormulario] =
        useState({

            examen: "",
            resultado: "",
            estado: "",
            observaciones: ""

        });

    const handleChange = (e) => {

        setFormulario({

            ...formulario,
            [e.target.name]: e.target.value

        });
    };

    const guardarExamen = () => {

        if (
            !formulario.examen ||
            !formulario.estado
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

        const nuevoExamen = {

            ...formulario,

            profesional:
                sesion?.username ||
                "Profesional",

            fecha:
                new Date().toLocaleString()

        };

        const pacienteActualizado = {

            ...paciente,

            examenes: [

                ...(paciente.examenes || []),

                nuevoExamen

            ]

        };

        setPaciente(
            pacienteActualizado
        );

        alert(
            "Examen guardado"
        );

        setFormulario({

            examen: "",
            resultado: "",
            estado: "",
            observaciones: ""

        });
    };

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Registrar Exámenes

                </Card.Title>

                <Row className="g-3">

                    <Col md={6}>

                        <Form.Label>

                            Examen

                        </Form.Label>

                        <Form.Control
                            name="examen"
                            value={formulario.examen}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>

                            Estado

                        </Form.Label>

                        <Form.Select
                            name="estado"
                            value={formulario.estado}
                            onChange={handleChange}
                        >

                            <option value="">

                                Seleccione

                            </option>

                            <option value="Pendiente">

                                Pendiente

                            </option>

                            <option value="En proceso">

                                En proceso

                            </option>

                            <option value="Completado">

                                Completado

                            </option>

                        </Form.Select>

                    </Col>

                    <Col md={12}>

                        <Form.Label>

                            Resultado

                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="resultado"
                            value={formulario.resultado}
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
                    onClick={guardarExamen}
                >

                    Guardar examen

                </Button>

            </Card.Body>

        </Card>
    );
};

export default FormularioExamenes;