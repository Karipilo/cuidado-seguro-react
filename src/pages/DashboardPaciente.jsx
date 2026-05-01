import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
import "../styles/dashboard.css";

const DashboardPaciente = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('sesion');

    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

  }, [navigate]);

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>Cargando información...</p>
      </div>
    );
  }

  return (

    <DashboardLayout usuario={user}>

      <Container fluid>

        {/* HEADER */}

        <div className="dashboard-top mb-4">

          <div>

            <h2 className="dashboard-title">
              Panel del Paciente
            </h2>

            <p className="dashboard-subtitle">
              Bienvenido,
              {" "}
              {user?.nombres}
              {" "}
              {user?.apellidos}
            </p>

          </div>

          <Badge bg="success" className="status-badge">
            Sesión activa
          </Badge>

        </div>

        <Row>

          {/* INFORMACION PERSONAL */}

          <Col lg={6} className="mb-4">

            <Card
              id="perfil"
              className="dashboard-modern-card h-100"
            >

              <Card.Body>

                <Card.Title className="dashboard-card-title">
                  Información personal
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Nombre:</strong>
                    {" "}
                    {user?.nombres}
                    {" "}
                    {user?.apellidos}
                  </p>

                  <p>
                    <strong>Documento:</strong>
                    {" "}
                    {user?.numeroDocumento}
                  </p>

                  <p>
                    <strong>Correo:</strong>
                    {" "}
                    {user?.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>
                    {" "}
                    +569 {user?.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong>
                    {" "}
                    {user?.direccion}
                  </p>

                  <p>
                    <strong>Género:</strong>
                    {" "}
                    {user?.genero}
                  </p>

                  <p>
                    <strong>Fecha nacimiento:</strong>
                    {" "}
                    {user?.fechaNacimiento}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* INFORMACION CLINICA */}

          <Col lg={6} className="mb-4">

            <Card className="dashboard-modern-card h-100">

              <Card.Body>

                <Card.Title className="dashboard-card-title">
                  Información clínica
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Grupo sanguíneo:</strong>
                    {" "}
                    {user?.grupoSanguineo}
                  </p>

                  <p>
                    <strong>Factor RH:</strong>
                    {" "}
                    {user?.factorRh}
                  </p>

                  <p>
                    <strong>Alergias:</strong>
                    {" "}
                    {user?.alergias}
                  </p>

                  <p>
                    <strong>Enfermedades crónicas:</strong>
                    {" "}
                    {user?.enfermedadesCronicas}
                  </p>

                  <p>
                    <strong>Medicamentos:</strong>
                    {" "}
                    {user?.medicamentosActuales}
                  </p>

                  <p>
                    <strong>Previsión:</strong>
                    {" "}
                    {user?.seguroMedico}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>



        {/* CONTACTO EMERGENCIA */}

        <Row>

          <Col lg={12}>

            <Card className="dashboard-modern-card">

              <Card.Body>

                <Card.Title className="dashboard-card-title">
                  Contacto de emergencia
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Contacto:</strong>
                    {" "}
                    {user?.contactoEmergencia}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>
                    {" "}
                    +569 {user?.telefonoEmergencia}
                  </p>

                </div>

              </Card.Body>

            </Card>

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

export default DashboardPaciente;