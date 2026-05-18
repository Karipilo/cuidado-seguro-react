import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";

import "../styles/dashboard.css";
import SignosVitales from "../components/profesional/SignosVitales";
import HistorialClinico from "../components/profesional/HistorialClinico";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
const DashboardTutor = () => {
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);

  const [pacientes, setPacientes] = useState([]);

  const [pacienteActivo, setPacienteActivo] = useState(null);

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion) {
      navigate("/login");

      return;
    }

    setTutor(sesion);
    console.log("SESION:", sesion);
    console.log("USER INFO:", JSON.stringify(sesion.userInfo, null, 2));

    /* BUSCAR PACIENTE */

    if (sesion.userInfo?.pacientesRuts?.length > 0) {
      const obtenerPaciente = async () => {
        try {
          const token = localStorage.getItem("token");

          const rutPaciente = sesion.userInfo.pacientesRuts[0];

          console.log("TOKEN:", token);
          console.log("RUT:", rutPaciente);

          const response = await fetch(
            `http://localhost:8090/bff/pacientes/rut/${rutPaciente}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            const errorText = await response.text();

            console.error("ERROR BACKEND:", errorText);

            throw new Error(errorText);
          }

          console.log("STATUS:", response.status);

          const data = await response.json();

          console.log("PACIENTE:", data);

          setPacientes([data]);

          setPacienteActivo(data);
        } catch (error) {
          console.error("ERROR PACIENTE:", error);
        }
      };

      obtenerPaciente();
    }
  }, [navigate]);

  if (!tutor) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <DashboardLayout usuario={tutor}>
      <Container fluid>
        {/* HEADER */}

        <div className="dashboard-top mb-4">
          <div>
            <h2 className="dashboard-title">Panel del Tutor</h2>

            <p className="dashboard-subtitle">
              Aquí puedes ver la información de tu paciente y comunicarte con su
              equipo de salud.
            </p>
          </div>

          <Badge bg="primary">Tutor activo</Badge>
        </div>

        <Row>
          {/* DATOS TUTOR */}

          <Col lg={5} className="mb-4">
            <Card id="perfil" className="dashboard-modern-card h-100">
              <Card.Body>
                <Card.Title className="dashboard-card-title">
                  Información del tutor
                </Card.Title>

                <div className="dashboard-info-group">
                  <p>
                    <strong>Nombre:</strong> {tutor?.nombre} {tutor?.apellido}
                  </p>

                  <p>
                    <strong>Correo:</strong> {tutor?.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong> +569 {tutor?.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong> {tutor?.direccion}
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
                  <p className="mb-0">No hay paciente asociado</p>
                </Card.Body>
              </Card>
            ) : (
              pacientes.map((p, index) => (
                <Card key={index} className="dashboard-modern-card h-100">
                  <Card.Body>
                    <Card.Title className="dashboard-card-title">
                      Paciente asociado
                    </Card.Title>

                    <div className="dashboard-info-group">
                      <p>
                        <strong>Nombre:</strong> {p.nombre} {p.apellido}
                      </p>

                      <p>
                        <strong>Documento:</strong> {p.rut}
                      </p>

                      <p>
                        <strong>Grupo sanguíneo:</strong> {p.grupoSanguineo}
                      </p>

                      <p>
                        <strong>Factor RH:</strong> {p.factorRh}
                      </p>

                      <p>
                        <strong>Alergias:</strong> {p.alergias}
                      </p>

                      <p>
                        <strong>Enfermedades:</strong> {p.enfermedadesCronicas}
                      </p>

                      <p>
                        <strong>Medicamentos:</strong> {p.medicamentosActuales}
                      </p>

                      <p>
                        <strong>Previsión:</strong> {p.seguroMedico}
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
            <Card className="dashboard-modern-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">
                  Información clínica resumida
                </Card.Title>

                <div className="dashboard-info-group">
                  <p>
                    <strong>Grupo sanguíneo:</strong>{" "}
                    {pacienteActivo?.grupoSanguineo}
                  </p>

                  <p>
                    <strong>Factor RH:</strong> {pacienteActivo?.factorRh}
                  </p>

                  <p>
                    <strong>Alergias:</strong> {pacienteActivo?.alergias}
                  </p>

                  <p>
                    <strong>Enfermedades crónicas:</strong>{" "}
                    {pacienteActivo?.enfermedadesCronicas}
                  </p>

                  <p>
                    <strong>Medicamentos actuales:</strong>{" "}
                    {pacienteActivo?.medicamentosActuales}
                  </p>

                  <p>
                    <strong>Previsión:</strong> {pacienteActivo?.seguroMedico}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <SignosVitales paciente={pacienteActivo} soloLectura={true} />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <HistorialClinico
              evoluciones={pacienteActivo?.evoluciones || []}
              soloLectura={true}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <HistorialEvoluciones
              paciente={pacienteActivo}
              modo="tutor"
              soloLectura={true}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <HistorialIndicaciones
              paciente={pacienteActivo}
              soloLectura={true}
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
