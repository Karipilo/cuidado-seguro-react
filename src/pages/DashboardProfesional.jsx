import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
import { usuarios } from "../data/usuario";
import "../styles/dashboard.css";
import HeaderProfesional from "../components/profesional/HeaderProfesional";
import BuscadorPaciente from "../components/profesional/BuscadorPaciente";
import PacienteResumen from "../components/profesional/PacienteResumen";
import TabsClinicas from "../components/profesional/TabsClinicas";
import HistorialClinico from "../components/profesional/HistorialClinico";
import SignosVitales from "../components/profesional/SignosVitales";
import Antropometria from "../components/profesional/Antropometria";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";
import AccionesRapidas from "../components/profesional/AccionesRapidas";

const DashboardProfesional = () => {

  const navigate = useNavigate();

  const [profesional, setProfesional] =
    useState(null);

  const [rutBusqueda, setRutBusqueda] =
    useState("");

  const [paciente, setPaciente] =
    useState(null);

  const [evolucion, setEvolucion] =
    useState("");

  const [indicacion, setIndicacion] =
    useState("");

  const evoluciones =
    JSON.parse(
      localStorage.getItem("evoluciones")
    ) || [];

  const indicaciones =
    JSON.parse(
      localStorage.getItem("indicaciones")
    ) || [];

  const indicacionesPaciente =

    indicaciones.filter(

      (i) =>
        i.rutPaciente ===
        paciente?.numeroDocumento

    );

  useEffect(() => {

    const sesion =
      JSON.parse(
        localStorage.getItem("sesion")
      );

    if (!sesion) {

      navigate("/login");

      return;
    }

    setProfesional(sesion);

  }, [navigate]);

  /* BUSCAR PACIENTE */

  const buscarPaciente = () => {

    const encontrado =
      usuarios.find(
        (u) =>
          u.tipoUsuario === "PACIENTE" &&
          u.numeroDocumento === rutBusqueda
      );

    if (!encontrado) {

      alert("Paciente no encontrado");

      setPaciente(null);

      return;
    }

    setPaciente(encontrado);
  };

  /* GUARDAR EVOLUCION */

  const guardarEvolucion = () => {

    if (!evolucion) {

      alert("Debe escribir una evolución");

      return;
    }

    const evoluciones =
      JSON.parse(
        localStorage.getItem("evoluciones")
      ) || [];

    const indicaciones =
      JSON.parse(
        localStorage.getItem("indicaciones")
      ) || [];

    const indicacionesPaciente =

      indicaciones.filter(

        (i) =>
          i.rutPaciente ===
          paciente?.numeroDocumento

      );

    evoluciones.push({
      rutPaciente: paciente.numeroDocumento,
      texto: evolucion,
      fecha: new Date().toLocaleString(),
      profesional:
        `${profesional.nombres}
    ${profesional.apellidos}`,

      profesion:
        profesional.profesion,
    });

    localStorage.setItem(
      "evoluciones",
      JSON.stringify(evoluciones)
    );

    alert("Evolución guardada");

    setEvolucion("");
  };

  const guardarIndicacion = () => {

    if (!indicacion) {

      alert("Debe escribir una indicación");

      return;
    }

    const indicaciones =
      JSON.parse(
        localStorage.getItem("indicaciones")
      ) || [];

    indicaciones.push({

      rutPaciente:
        paciente.numeroDocumento,

      texto:
        indicacion,

      fecha:
        new Date().toLocaleString(),

      profesional:
        `${profesional.nombres}
            ${profesional.apellidos}`,

      profesion:
        profesional.profesion

    });

    localStorage.setItem(

      "indicaciones",

      JSON.stringify(indicaciones)

    );

    alert("Indicación guardada");

    setIndicacion("");

  };

  if (!profesional) {

    return (
      <p className="text-center mt-5">
        Cargando...
      </p>
    );
  }

  return (

    <DashboardLayout
      usuario={profesional}
      paciente={paciente}
    >

      <Container
        fluid
        className="dashboard-top-spacing">

        {/* HEADER */}

        <HeaderProfesional
          profesional={profesional}
          rutBusqueda={rutBusqueda}
          setRutBusqueda={setRutBusqueda}
          buscarPaciente={buscarPaciente}
        />


        <Row className="justify-content-center">

          <Col lg={10}>



            {paciente && (

              <>

                {/* DATOS PACIENTE */}

                <div id="historial">

                  <PacienteResumen
                    paciente={paciente}
                  />


                </div>

                {/* MEDICAMENTOS */}

                <Card
                  id="medicamentos"
                  className="dashboard-modern-card mb-4"
                >

                  <Card.Body>

                    <Card.Title
                      className="dashboard-card-title"
                    >

                      Medicamentos habituales

                    </Card.Title>

                    <p className="mb-0">

                      {paciente?.medicamentosActuales}

                    </p>

                  </Card.Body>

                </Card>

                {/* TABS CLINICAS */}

                <Row className="mt-4">

                  <Col lg={8}>

                    <TabsClinicas

                      resumenComponent={

                        <Card className="dashboard-modern-card">

                          <Card.Body>

                            <Card.Title
                              className="dashboard-card-title"
                            >

                              Resumen clínico

                            </Card.Title>

                            <p>

                              Paciente actualmente
                              en seguimiento clínico.

                            </p>

                            <p className="mb-0">

                              Último control
                              registrado correctamente.

                            </p>

                          </Card.Body>

                        </Card>

                      }

                      signosVitalesComponent={

                        <>

                          <FormularioSignosVitales
                            paciente={paciente}
                            setPaciente={setPaciente}
                          />

                          <div className="mt-4">

                            <SignosVitales
                              paciente={paciente}
                            />

                          </div>

                          <div className="mt-4">

                            <Antropometria />

                          </div>

                          <div className="mt-4">

                            <ExamenesClinicos />

                          </div>

                        </>

                      }

                      evolucionComponent={

                        <Card
                          id="evolucion"
                          className="dashboard-modern-card"
                        >

                          <Card.Body>

                            <Card.Title
                              className="dashboard-card-title"
                            >

                              Registrar evolución clínica

                            </Card.Title>

                            <Form.Control
                              as="textarea"
                              className="dashboard-textarea"
                              rows={5}
                              placeholder="Escriba evolución clínica..."
                              value={evolucion}
                              onChange={(e) =>
                                setEvolucion(
                                  e.target.value
                                )
                              }
                            />

                            <Button
                              className="mt-3 btn-dashboard-primary"
                              onClick={guardarEvolucion}
                            >

                              Guardar evolución

                            </Button>

                          </Card.Body>

                        </Card>

                      }

                      historialComponent={

                        <div id="controles">

                          <HistorialClinico
                            evoluciones={evoluciones}
                          />

                        </div>

                      }

                      indicacionesComponent={

                        <Card className="dashboard-modern-card">

                          <Card.Body>

                            <Card.Title
                              className="dashboard-card-title"
                            >

                              Indicaciones clínicas

                            </Card.Title>

                            <Form.Control
                              as="textarea"
                              rows={4}
                              className="dashboard-textarea"
                              placeholder="Escriba indicaciones..."
                              value={indicacion}
                              onChange={(e) =>
                                setIndicacion(e.target.value)
                              }
                            />

                            <Button
                              className="mt-3 btn-dashboard-primary"
                              onClick={guardarIndicacion}
                            >

                              Guardar indicación

                            </Button>

                            <hr />

                            <h5 className="mb-4">

                              Historial de indicaciones

                            </h5>

                            {indicacionesPaciente.length === 0 ? (

                              <p className="text-muted mb-0">

                                No existen indicaciones registradas

                              </p>

                            ) : (

                              indicacionesPaciente.map((ind, index) => (

                                <div
                                  key={index}
                                  className="timeline-content mb-3"
                                >

                                  <div className="timeline-header">

                                    <div>

                                      <h6 className="mb-1">

                                        {ind.profesional}

                                      </h6>

                                      <small className="text-muted">

                                        {ind.profesion}

                                      </small>

                                    </div>

                                    <small className="text-muted">

                                      {ind.fecha}

                                    </small>

                                  </div>

                                  <p className="mb-0 mt-3">

                                    {ind.texto}

                                  </p>

                                </div>

                              ))

                            )}

                          </Card.Body>

                        </Card>

                      }

                    />

                  </Col>

                  <Col lg={4}>

                    <AccionesRapidas />

                  </Col>

                </Row>

              </>

            )}

          </Col>

        </Row>






        {paciente && (

          <div id="mensajes">

            <MessageSection />

          </div>

        )}
      </Container>

    </DashboardLayout>

  );
};

export default DashboardProfesional;