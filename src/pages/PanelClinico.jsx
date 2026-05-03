import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { usuarios } from "../data/usuario";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignosVitales from "../components/profesional/SignosVitales";
import TabsClinicas from "../components/profesional/TabsClinicas";
import Antropometria from "../components/profesional/Antropometria";
import AccionesRapidas from "../components/profesional/AccionesRapidas";
import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";

const PanelClinico = () => {

    const { rut } = useParams();

    const [mostrarFormularioSV, setMostrarFormularioSV] =
        useState(false);



    const paciente = usuarios.find(
        (u) =>
            u.tipoUsuario === "PACIENTE" &&
            u.numeroDocumento === rut
    );

    const [pacienteActivo, setPacienteActivo] =
        useState(paciente);

    if (!paciente) {

        return (

            <Container className="py-5">

                <h3>Paciente no encontrado</h3>

            </Container>
        );
    }

    return (

        <Container
            fluid
            className="panel-clinico py-4 px-4"
        >

            {/* HEADER */}

            <Card className="border-0 shadow-sm rounded-4 mb-4">

                <Card.Body>

                    <div
                        className="
            d-flex
            justify-content-between
            align-items-center
          "
                    >

                        <div>

                            <h2 className="fw-bold mb-1">

                                {paciente.nombres}
                                {" "}
                                {paciente.apellidos}

                            </h2>

                            <p className="text-muted mb-0">

                                RUT:
                                {" "}
                                {paciente.numeroDocumento}

                            </p>

                        </div>

                        <div
                            className="
              bg-success-subtle
              text-success
              px-3
              py-2
              rounded-pill
            "
                        >

                            Paciente activo

                        </div>

                    </div>

                </Card.Body>

            </Card>

            {/* DATOS PACIENTE */}

            <Card className="border-0 shadow-sm rounded-4 mb-4">

                <Card.Body>

                    <Row>

                        <Col md={3}>

                            <strong>

                                Género

                            </strong>

                            <p>

                                Masculino

                            </p>

                        </Col>

                        <Col md={3}>

                            <strong>

                                Edad

                            </strong>

                            <p>

                                34 años

                            </p>

                        </Col>

                        <Col md={3}>

                            <strong>

                                Alergias

                            </strong>

                            <p>

                                {paciente.alergias}

                            </p>

                        </Col>

                        <Col md={3}>

                            <strong>

                                Grupo sanguíneo

                            </strong>

                            <p>

                                {paciente.grupoSanguineo}
                                {paciente.factorRh}

                            </p>

                        </Col>

                    </Row>

                </Card.Body>

            </Card>

            {/* SIGNOS VITALES */}

            <SignosVitales paciente={pacienteActivo} />

            {/* ANTROPOMETRÍA */}

            <Antropometria />
            {
                mostrarFormularioSV && (

                    <FormularioSignosVitales
                        paciente={pacienteActivo}
                        setPaciente={setPacienteActivo}
                    />

                )
            }

            {/* CONTENIDO PRINCIPAL */}

            <Row>

                <Col lg={8}>

                    <TabsClinicas
                        resumenComponent={<div>Resumen clínico</div>}
                        historialComponent={<div>Historial clínico</div>}
                        signosVitalesComponent={
                            <SignosVitales paciente={pacienteActivo} />
                        }
                        evolucionComponent={<div>Evoluciones</div>}
                        indicacionesComponent={<div>Indicaciones</div>}
                    />

                </Col>

                <Col lg={4}>

                    <AccionesRapidas
                        abrirFormularioSV={() =>
                            setMostrarFormularioSV(
                                !mostrarFormularioSV
                            )
                        }
                    />
                </Col>

            </Row>

        </Container>
    );
};

export default PanelClinico;