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

const FormularioEvolucion = ({
    paciente,
    setPaciente
}) => {

    const [formulario, setFormulario] =
        useState({

            evolucion: "",
            observaciones: "",
            estado: ""

        });

    const handleChange = (e) => {

        setFormulario({

            ...formulario,
            [e.target.name]: e.target.value

        });
    };

    const guardarEvolucion = () => {

        if (
            !formulario.evolucion ||
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

        const nuevaEvolucion = {

            evolucion:
                formulario.evolucion,

            observaciones:
                formulario.observaciones,

            estado:
                formulario.estado,

            profesional:
                sesion?.username ||
                "Profesional",

            fecha:
                new Date().toLocaleString()

        };

        const pacienteActualizado = {

            ...paciente,

            evoluciones: [

                ...(paciente.evoluciones || []),

                nuevaEvolucion

            ]

        };

        setPaciente(
            pacienteActualizado
        );

        alert(
            "Evolución guardada"
        );

        setFormulario({

            evolucion: "",
            observaciones: "",
            estado: ""

        });
    };

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Registrar Evolución

                </Card.Title>

                <Row className="g-3">

                    <Col md={12}>

                        <Form.Label>

                            Evolución clínica

                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="evolucion"
                            value={formulario.evolucion}
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

                    <Col md={6}>

                        <Form.Label>

                            Estado paciente

                        </Form.Label>

                        <Form.Select
                            name="estado"
                            value={formulario.estado}
                            onChange={handleChange}
                        >

                            <option value="">

                                Seleccione

                            </option>

                            <option value="Estable">

                                Estable

                            </option>

                            <option value="Observación">

                                Observación

                            </option>

                            <option value="Crítico">

                                Crítico

                            </option>

                        </Form.Select>

                    </Col>

                </Row>

                <Button
                    className="mt-4 btn-dashboard-primary"
                    onClick={guardarEvolucion}
                >

                    Guardar evolución

                </Button>

            </Card.Body>

        </Card>
    );
};

export default FormularioEvolucion;