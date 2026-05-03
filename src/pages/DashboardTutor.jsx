import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
import { usuarios } from "../data/usuario";
import "../styles/dashboard.css";
import Antropometria from "../components/profesional/Antropometria";
import SignosVitales from "../components/profesional/SignosVitales";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import ResumenClinico from "../components/profesional/ResumenClinico";

const DashboardTutor = () => {

  const navigate = useNavigate();

  const [tutor, setTutor] =
    useState(null);

  const [pacientes, setPacientes] =
    useState([]);

  const [
    pacienteActivo,
    setPacienteActivo
  ] = useState(null);

  useEffect(() => {

    const sesion =
      JSON.parse(
        localStorage.getItem("sesion")
      );

    if (!sesion) {

      navigate("/login");

      return;
    }

    setTutor(sesion);

    /* BUSCAR PACIENTE */

    if (sesion.rutPaciente) {

      const paciente =
        usuarios.find(
          (u) =>
            u.tipoUsuario === "PACIENTE" &&
            u.numeroDocumento ===
            sesion.rutPaciente
        );

      if (paciente) {

        const datosGuardados =
          localStorage.getItem(
            `paciente-${paciente.numeroDocumento}`
          );

        const pacienteFinal =
          datosGuardados
            ? JSON.parse(datosGuardados)
            : paciente;

        setPacientes([pacienteFinal]);

        setPacienteActivo(
          pacienteFinal
        );
      }
    }

  }, [navigate]);

  if (!tutor) {

    return (
      <p className="text-center mt-5">
        Cargando...
      </p>
    );
  }

  return (

    <DashboardLayout usuario={tutor}>

      <Container fluid>

        {/* HEADER */}

        <div className="dashboard-top mb-4">

          <div>

            <h2 className="dashboard-title">
              Panel del Tutor
            </h2>

            <p className="dashboard-subtitle">

              Bienvenido,
              {" "}
              {tutor?.nombres}
              {" "}
              {tutor?.apellidos}

            </p>

          </div>

          <Badge bg="primary">

            Tutor activo

          </Badge>

        </div>

        <Row>

          {/* DATOS TUTOR */}

          <Col lg={5} className="mb-4">

            <Card
              id="perfil"
              className="dashboard-modern-card h-100"
            >

              <Card.Body>

                <Card.Title
                  className="dashboard-card-title"
                >
                  Información del tutor
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Nombre:</strong>
                    {" "}
                    {tutor?.nombres}
                    {" "}
                    {tutor?.apellidos}
                  </p>

                  <p>
                    <strong>Correo:</strong>
                    {" "}
                    {tutor?.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>
                    {" "}
                    +569 {tutor?.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong>
                    {" "}
                    {tutor?.direccion}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* PACIENTE */}

          <Col lg={7} className="mb-4">

            {pacientes.length === 0 ? (

              <Card className="dashboard-modern-card">

                <Card.Body>

                  <p className="mb-0">
                    No hay paciente asociado
                  </p>

                </Card.Body>

              </Card>

            ) : (

              pacientes.map((p, index) => (

                <Card
                  key={index}
                  className="dashboard-modern-card h-100"
                >

                  <Card.Body>

                    <Card.Title
                      className="dashboard-card-title"
                    >
                      Paciente asociado
                    </Card.Title>

                    <div className="dashboard-info-group">

                      <p>
                        <strong>Nombre:</strong>
                        {" "}
                        {p.nombres}
                        {" "}
                        {p.apellidos}
                      </p>

                      <p>
                        <strong>Documento:</strong>
                        {" "}
                        {p.numeroDocumento}
                      </p>

                      <p>
                        <strong>Grupo sanguíneo:</strong>
                        {" "}
                        {p.grupoSanguineo}
                      </p>

                      <p>
                        <strong>Factor RH:</strong>
                        {" "}
                        {p.factorRh}
                      </p>

                      <p>
                        <strong>Alergias:</strong>
                        {" "}
                        {p.alergias}
                      </p>

                      <p>
                        <strong>Enfermedades:</strong>
                        {" "}
                        {p.enfermedadesCronicas}
                      </p>

                      <p>
                        <strong>Medicamentos:</strong>
                        {" "}
                        {p.medicamentosActuales}
                      </p>

                      <p>
                        <strong>Previsión:</strong>
                        {" "}
                        {p.seguroMedico}
                      </p>

                    </div>

                  </Card.Body>

                </Card>

              ))

            )}

          </Col>

        </Row>

        <Row>

          <Col lg={12} className="mb-4">

            <ResumenClinico
              paciente={pacienteActivo}
            />

          </Col>

        </Row>

        <Row>

          <Col lg={6} className="mb-4">

            <HistorialEvoluciones
              paciente={pacienteActivo}
            />

          </Col>

          <Col lg={6} className="mb-4">

            <HistorialIndicaciones
              paciente={pacienteActivo}
            />

          </Col>

        </Row>

        <Row>

          <Col lg={12} className="mb-4">

            <SignosVitales
              paciente={pacienteActivo}
            />

          </Col>

        </Row>

        <Row>

          <Col lg={12} className="mb-4">

            <ExamenesClinicos
              paciente={pacienteActivo}
            />

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

export default DashboardTutor;

