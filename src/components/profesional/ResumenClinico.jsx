import React, { useState } from "react";
import { Card, Badge, Form, Button, Row, Col } from "react-bootstrap";

const ResumenClinico = ({ paciente, onGuardar }) => {

    const [formulario, setFormulario] = useState({
        motivoConsulta: "",
        diagnostico: "",
        evolucionClinica: "",
        indicacionesMedicas: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = () => {
        if (onGuardar) onGuardar(formulario);
    };

    const resumen = [];

    paciente?.signosVitales?.forEach((registro) => {
        resumen.push({
            tipo: "Signos Vitales",
            fecha: registro.fecha,
            profesional: registro.profesional,
            detalle: `PA: ${registro.presion}\nFC: ${registro.frecuencia}\nTemp: ${registro.temperatura}\nSat: ${registro.saturacion}`,
        });
    });

    paciente?.antropometria?.forEach((registro) => {
        const imc = (registro.peso / (registro.altura * registro.altura)).toFixed(1);
        resumen.push({
            tipo: "Antropometría",
            fecha: registro.fecha,
            profesional: registro.profesional,
            detalle: `Peso: ${registro.peso} kg\nAltura: ${registro.altura} m\nIMC: ${imc}`,
        });
    });

    paciente?.evoluciones?.forEach((registro) => {
        resumen.push({
            tipo: "Evolución",
            fecha: registro.fecha,
            profesional: registro.profesional,
            detalle: registro.evolucion,
        });
    });

    paciente?.indicaciones?.forEach((registro) => {
        resumen.push({
            tipo: "Indicación",
            fecha: registro.fecha,
            profesional: registro.profesional,
            detalle: `${registro.medicamento}\n${registro.dosis}\n${registro.frecuencia}`,
        });
    });

    paciente?.examenes?.forEach((registro) => {
        resumen.push({
            tipo: "Examen",
            fecha: registro.fecha,
            profesional: registro.profesional,
            detalle: `${registro.examen}\nEstado: ${registro.estado}`,
        });
    });

    const resumenOrdenado = resumen.reverse();

    return (
        <Card className="dashboard-modern-card">
            <Card.Body>

                <Card.Title className="dashboard-card-title">
                    Resumen Clínico
                </Card.Title>

                {/* ── Formulario de registro ── */}
                <Card className="mb-4 border rounded-4 bg-light">
                    <Card.Body>

                        <h6 className="fw-semibold mb-3 text-primary">
                            Nuevo Registro
                        </h6>

                        <Row className="g-3">

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Motivo de Consulta
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="motivoConsulta"
                                        value={formulario.motivoConsulta}
                                        onChange={handleChange}
                                        placeholder="Describa el motivo de consulta..."
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Diagnóstico
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="diagnostico"
                                        value={formulario.diagnostico}
                                        onChange={handleChange}
                                        placeholder="Ingrese el diagnóstico..."
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Evolución Clínica
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="evolucionClinica"
                                        value={formulario.evolucionClinica}
                                        onChange={handleChange}
                                        placeholder="Describa la evolución clínica..."
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Indicaciones Médicas
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="indicacionesMedicas"
                                        value={formulario.indicacionesMedicas}
                                        onChange={handleChange}
                                        placeholder="Ingrese las indicaciones médicas..."
                                    />
                                </Form.Group>
                            </Col>

                        </Row>

                        <div className="d-flex justify-content-end mt-3">
                            <Button
                                variant="primary"
                                className="rounded-3 px-4"
                                onClick={handleGuardar}
                            >
                                Guardar Registro
                            </Button>
                        </div>

                    </Card.Body>
                </Card>

                {/* ── Historial ── */}
                {resumenOrdenado.length > 0 ? (
                    resumenOrdenado.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-4 p-3 mb-3"
                        >
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <strong>{item.profesional}</strong>
                                    <p className="text-muted mb-0">{item.fecha}</p>
                                </div>
                                <Badge bg="primary">{item.tipo}</Badge>
                            </div>
                            <pre
                                className="mb-0"
                                style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
                            >
                                {item.detalle}
                            </pre>
                        </div>
                    ))
                ) : (
                    <p>No existen registros clínicos.</p>
                )}

            </Card.Body>
        </Card>
    );
};

export default ResumenClinico;