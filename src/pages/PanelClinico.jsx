import React, { useState, useEffect, useRef } from "react";
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
import HistorialSignosVitales from "../components/profesional/HistorialSignosVitales";
import FormularioAntropometria from "../components/profesional/FormularioAntropometria";
import HistorialAntropometria from "../components/profesional/HistorialAntropometria";
import FormularioEvolucion from "../components/profesional/FormularioEvolucion";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import FormularioIndicaciones from "../components/profesional/FormularioIndicaciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import FormularioExamenes from "../components/profesional/FormularioExamenes";
import ResumenClinico from "../components/profesional/ResumenClinico";

const PanelClinico = () => {

    const { rut } = useParams();

    const [mostrarFormularioSV, setMostrarFormularioSV] =
        useState(false);

    const [
        mostrarFormularioAntropometria,
        setMostrarFormularioAntropometria
    ] = useState(false);

    const [
        mostrarFormularioEvolucion,
        setMostrarFormularioEvolucion
    ] = useState(false);

    const [
        mostrarFormularioIndicaciones,
        setMostrarFormularioIndicaciones
    ] = useState(false);

    const [
        mostrarFormularioExamenes,
        setMostrarFormularioExamenes
    ] = useState(false);

    const paciente = usuarios.find(
        (u) =>
            u.tipoUsuario === "PACIENTE" &&
            u.numeroDocumento === rut
    );

    const [pacienteActivo, setPacienteActivo] =
        useState(() => {

            const guardado =
                localStorage.getItem(
                    `paciente-${rut}`
                );

            return guardado
                ? JSON.parse(guardado)
                : paciente;
        });

    const [activeTab, setActiveTab] =
        useState("resumen");

    const formularioRef =
        useRef(null);

    const irAFormulario = () => {

        setTimeout(() => {

            formularioRef.current?.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }, 100);
    };

    useEffect(() => {

        localStorage.setItem(

            `paciente-${rut}`,

            JSON.stringify(
                pacienteActivo
            )

        );

    }, [pacienteActivo, rut]);

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

            <Antropometria
                paciente={pacienteActivo}
            />
            {
                mostrarFormularioSV && (

                    <div ref={formularioRef}>

                        <FormularioSignosVitales
                            paciente={pacienteActivo}
                            setPaciente={setPacienteActivo}
                        />

                    </div>

                )
            }

            {
                mostrarFormularioAntropometria && (

                    <div ref={formularioRef}>

                        <FormularioAntropometria
                            paciente={pacienteActivo}
                            setPaciente={setPacienteActivo}
                        />

                    </div>

                )
            }

            {
                mostrarFormularioEvolucion && (

                    <div ref={formularioRef}>

                        <FormularioEvolucion
                            paciente={pacienteActivo}
                            setPaciente={setPacienteActivo}
                        />
                    </div>
                )
            }

            {
                mostrarFormularioIndicaciones && (

                    <div ref={formularioRef}>

                        <FormularioIndicaciones
                            paciente={pacienteActivo}
                            setPaciente={setPacienteActivo}
                        />

                    </div>

                )
            }



            {
                mostrarFormularioExamenes && (

                    <div ref={formularioRef}>

                        <FormularioExamenes
                            paciente={pacienteActivo}
                            setPaciente={setPacienteActivo}
                        />

                    </div>

                )
            }

            {/* CONTENIDO PRINCIPAL */}

            <Row>

                <Col lg={8}>

                    <TabsClinicas
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        resumenComponent={

                            <ResumenClinico
                                paciente={pacienteActivo}
                            />

                        }
                        historialComponent={

                            <ExamenesClinicos
                                paciente={pacienteActivo}
                            />

                        }
                        signosVitalesComponent={
                            <HistorialSignosVitales
                                paciente={pacienteActivo}
                            />
                        }

                        antropometriaComponent={
                            <HistorialAntropometria
                                paciente={pacienteActivo}
                            />
                        }
                        evolucionComponent={

                            <HistorialEvoluciones
                                paciente={pacienteActivo}
                            />

                        }
                        indicacionesComponent={

                            <HistorialIndicaciones
                                paciente={pacienteActivo}
                            />

                        }
                    />

                </Col>

                <Col lg={4}>

                    <AccionesRapidas
                        abrirFormularioSV={() => {

                            setMostrarFormularioSV(
                                !mostrarFormularioSV
                            );
                            setActiveTab("signos");

                            irAFormulario();
                        }}

                    abrirFormularioAntropometria={() => {

                        setMostrarFormularioAntropometria(
                            !mostrarFormularioAntropometria
                        );

                        setActiveTab("antropometria");
                        irAFormulario();
                    }}
                    abrirFormularioEvolucion={() => {

                        setMostrarFormularioEvolucion(
                            !mostrarFormularioEvolucion
                        );

                        setActiveTab("evolucion");
                        irAFormulario();
                    }}

                    abrirFormularioIndicaciones={() => {

                        setMostrarFormularioIndicaciones(
                            !mostrarFormularioIndicaciones
                        );

                        setActiveTab("indicaciones");
                        irAFormulario();
                    }}

                    abrirFormularioExamenes={() => {

                        setMostrarFormularioExamenes(
                            !mostrarFormularioExamenes
                        );

                        setActiveTab("historial");
                        irAFormulario();
                    }}


                    />
                </Col>

            </Row>

        </Container>
    );
};

export default PanelClinico;