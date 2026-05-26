import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
//import { usuarios } from "../data/usuario";
import HeaderProfesional from "../components/profesional/HeaderProfesional";
import HistorialClinico from "../components/profesional/HistorialClinico";
import PacienteResumen from "../components/profesional/PacienteResumen";
import SignosVitales from "../components/profesional/SignosVitales";
import TabsClinicas from "../components/profesional/TabsClinicas";
import "../styles/dashboard.css";

import AccionesRapidas from "../components/profesional/AccionesRapidas";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";
import { getMemoryJSON, setMemoryJSON } from "../utils/memoryStore";
import { request } from "../utils/api";

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
    getMemoryJSON("evoluciones", []);

  const indicaciones =
    getMemoryJSON("indicaciones", []);

  const indicacionesPaciente =

    indicaciones.filter(

      (i) =>
        i.rutPaciente ===
        paciente?.numeroDocumento

    );

  useEffect(() => {

    const sesion =
      getMemoryJSON("sesion");

    if (!sesion) {

      navigate("/login");

      return;
    }

    setProfesional(sesion);

  }, [navigate]);

  /* BUSCAR PACIENTE */

  //console.log("genero:", paciente?.genero);
const buscarPaciente = async () => {

  try {

    const sesion = getMemoryJSON("sesion");

    const token = sesion?.accessToken;

    if (!token) {

      alert("Sesión no válida");

      return;
    }

    /* =========================
       OBTENER FICHAS CLÍNICAS
    ========================== */

    const fichas = await request(
      "/fichas",
      { token }
    );

    const encontrado = fichas.find(
      (f) => f.rutPaciente === rutBusqueda
    );

    if (!encontrado) {

      alert("Paciente no encontrado");

      return;
    }

    console.log(
      "PACIENTE ENCONTRADO:",
      encontrado
    );

    /* =========================
       OBTENER MEDICAMENTOS
    ========================== */

    const medicamentos =
      await request(
        "/medicamentos",
        { token }
      );

    console.log(
      "MEDICAMENTOS:",
      medicamentos
    );

    /* =========================
       FILTRAR POR ficha_id
    ========================== */

    const medicamentosPaciente =
      medicamentos.filter(
        (m) =>
          m.ficha?.id === encontrado.id
      );

    console.log(
      "MEDICAMENTOS PACIENTE:",
      medicamentosPaciente
    );

    /* =========================
       FORMATEAR TEXTO
    ========================== */

    const medicamentosTexto =
      medicamentosPaciente.length > 0
        ? medicamentosPaciente
            .map((m) => m.nombre)
            .join(", ")
        : "Sin medicamentos registrados";

    /* =========================
       SET PACIENTE
    ========================== */

    setPaciente({

      id:
        encontrado.id,

      numeroDocumento:
        encontrado.rutPaciente,

      nombres:
        encontrado.nombrePaciente,

      edad:
        encontrado.edad,

      genero:
        encontrado.genero,

      alergias:
        encontrado.alergias,

      diagnostico:
        encontrado.diagnostico,

      observaciones:
        encontrado.observaciones,

      medicamentosActuales:
        medicamentosTexto
    });

  } catch (error) {

    console.error(
      "Error buscando paciente:",
      error
    );

    alert(
      "No se pudo obtener la información"
    );
  }
};
  /* GUARDAR EVOLUCION */

  const guardarEvolucion = () => {

    if (!evolucion) {

      alert("Debe escribir una evolución");

      return;
    }

    const evoluciones =
      getMemoryJSON("evoluciones", []);

    const indicaciones =
      getMemoryJSON("indicaciones", []);

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

    setMemoryJSON("evoluciones", evoluciones);

    alert("Evolución guardada");

    setEvolucion("");
  };

  const guardarIndicacion = () => {

    if (!indicacion) {

      alert("Debe escribir una indicación");

      return;
    }

    const indicaciones =
      getMemoryJSON("indicaciones", []);

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

    setMemoryJSON("indicaciones", indicaciones);

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
