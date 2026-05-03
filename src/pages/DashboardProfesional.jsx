import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card} from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
import { usuarios } from "../data/usuario";
import "../styles/dashboard.css";
import HeaderProfesional from "../components/profesional/HeaderProfesional";
import BuscadorPaciente from "../components/profesional/BuscadorPaciente";
import PacienteResumen from "../components/profesional/PacienteResumen";
import TabsClinicas from "../components/profesional/TabsClinicas";
import HistorialClinico from "../components/profesional/HistorialClinico";

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

  const evoluciones = JSON.parse(localStorage.getItem("evoluciones")) || [];

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

    evoluciones.push({
      rutPaciente: paciente.numeroDocumento,
      texto: evolucion,
      fecha: new Date().toLocaleString(),
      profesional: profesional.nombres
    });

    localStorage.setItem(
      "evoluciones",
      JSON.stringify(evoluciones)
    );

    alert("Evolución guardada");

    setEvolucion("");
  };

  if (!profesional) {

    return (
      <p className="text-center mt-5">
        Cargando...
      </p>
    );
  }

  return (

    <DashboardLayout usuario={profesional}>

      <Container fluid>

        {/* HEADER */}

        <HeaderProfesional
          profesional={profesional}
        />

        <Row>

          {/* COLUMNA IZQUIERDA */}

          <Col lg={4}>

            {/* BUSCADOR */}

            <div id="buscar-paciente">

              <BuscadorPaciente
                rutBusqueda={rutBusqueda}
                setRutBusqueda={setRutBusqueda}
                buscarPaciente={buscarPaciente}
              />

            </div>

            {/* PERFIL */}

            <Card
              id="perfil"
              className="dashboard-modern-card"
            >

              <Card.Body>

                <Card.Title
                  className="dashboard-card-title"
                >
                  Información profesional
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Profesión:</strong>
                    {" "}
                    {profesional?.profesion}
                  </p>

                  <p>
                    <strong>Especialidad:</strong>
                    {" "}
                    {profesional?.especialidad}
                  </p>

                  <p>
                    <strong>Subespecialidad:</strong>
                    {" "}
                    {profesional?.subespecialidad}
                  </p>

                  <p>
                    <strong>Institución:</strong>
                    {" "}
                    {profesional?.institucion}
                  </p>

                  <p>
                    <strong>Universidad:</strong>
                    {" "}
                    {profesional?.universidad}
                  </p>

                  <p>
                    <strong>Experiencia:</strong>
                    {" "}
                    {profesional?.experienciaAños}
                    {" "}
                    años
                  </p>

                  <p>
                    <strong>Licencia:</strong>
                    {" "}
                    {profesional?.numeroLicencia}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* COLUMNA DERECHA */}

          <Col lg={8}>

            {!paciente ? (

              <Card className="dashboard-modern-card">

                <Card.Body className="text-center p-5">

                  <h5>
                    Seleccione un paciente
                  </h5>

                  <p className="text-muted mb-0">
                    Ingrese un RUT para comenzar
                  </p>

                </Card.Body>

              </Card>

            ) : (

              <>

                {/* DATOS PACIENTE */}

                <PacienteResumen
                  paciente={paciente}
                />

                {/* EVOLUCION */}

                <TabsClinicas

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
                          rows={5}
                          placeholder="Escriba evolución clínica..."
                          value={evolucion}
                          onChange={(e) =>
                            setEvolucion(e.target.value)
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

                />

                <Card
                  id="controles"
                  className="dashboard-modern-card mt-4"
                >

                  <Card.Body>

                    <Card.Title
                      className="dashboard-card-title"
                    >
                      Historial de evoluciones
                    </Card.Title>

                    {(JSON.parse(
                      localStorage.getItem("evoluciones")
                    ) || []).length === 0 ? (

                      <p className="mb-0">
                        No existen evoluciones registradas
                      </p>

                    ) : (

                      (JSON.parse(
                        localStorage.getItem("evoluciones")
                      ) || []).map((ev, index) => (

                        <div
                          key={index}
                          className="evolucion-item"
                        >

                          <p>
                            <strong>Profesional:</strong>
                            {" "}
                            {ev.profesional}
                          </p>

                          <p>
                            <strong>Fecha:</strong>
                            {" "}
                            {ev.fecha}
                          </p>

                          <p>
                            <strong>Evolución:</strong>
                            {" "}
                            {ev.texto}
                          </p>

                        </div>

                      ))

                    )}

                  </Card.Body>

                </Card>

              </>

            )}

          </Col>

        </Row>

        {/* MENSAJES */}

        <div id="mensajes">

          <MessageSection />

        </div>

      </Container>

    </DashboardLayout>

  );
};

export default DashboardProfesional;