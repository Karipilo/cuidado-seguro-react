import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/dashboard.css";

import SignosVitales from "../components/profesional/SignosVitales";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import ResumenClinico from "../components/profesional/ResumenClinico";

const DashboardPacienteNormal = () => {

  const [user, setUser] = useState(null);

  const [pacienteActivo, setPacienteActivo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const obtenerUsuario = async () => {

      try {

        const sesion = JSON.parse(
          localStorage.getItem("sesion")
        );

        const token = sesion?.accessToken;

        console.log("TOKEN:", token);

        if (!token) {

          navigate("/login", { replace: true });

          return;

        }

        const response = await fetch(
          "http://localhost:8090/bff/auth/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        console.log("STATUS:", response.status);

        if (!response.ok) {

          if (response.status === 401) {

            localStorage.removeItem("sesion");

            navigate("/login", { replace: true });

            return;

          }

          throw new Error("Error obteniendo usuario");

        }

        const data = await response.json();

        console.log("DATA:", data);

        const persona = data?.usuario?.persona || {};

        const usuarioCompleto = {

          nombres: persona?.nombres || "",
          apellidos: persona?.apellidos || "",
          numeroDocumento: persona?.numeroDocumento || "",
          fechaNacimiento: persona?.fechaNacimiento || "",
          genero: persona?.genero || "",
          telefono: persona?.telefono || "",
          email: persona?.email || "",
          direccion: persona?.direccion || "",

          grupoSanguineo: data?.grupoSanguineo || "",
          factorRh: data?.factorRh || "",
          alergias: data?.alergias || "",
          enfermedadesCronicas: data?.enfermedadesCronicas || "",
          medicamentosActuales: data?.medicamentosActuales || "",

          contactoEmergencia: data?.contactoEmergencia || "",
          telefonoEmergencia: data?.telefonoEmergencia || "",

          seguroMedico: data?.prevision || ""
        };

        setUser(usuarioCompleto);

        setPacienteActivo(usuarioCompleto);

      } catch (error) {

        console.error("ERROR:", error);

      }

    };

    obtenerUsuario();

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
              Bienvenido{" "}
              {user?.nombres}{" "}
              {user?.apellidos}
            </p>

          </div>

          <Badge bg="success" className="status-badge">
            Sesión activa
          </Badge>

        </div>

        {/* SIGNOS VITALES */}

        <Row>

          <Col lg={12} className="mb-4">

            <SignosVitales
              paciente={pacienteActivo}
            />

          </Col>

        </Row>

        {/* INFORMACIÓN PERSONAL */}

        <Row>

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
                    <strong>Nombre:</strong>{" "}
                    {user?.nombres}{" "}
                    {user?.apellidos}
                  </p>

                  <p>
                    <strong>Documento:</strong>{" "}
                    {user?.numeroDocumento}
                  </p>

                  <p>
                    <strong>Correo:</strong>{" "}
                    {user?.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>{" "}
                    {user?.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong>{" "}
                    {user?.direccion}
                  </p>

                  <p>
                    <strong>Género:</strong>{" "}
                    {user?.genero}
                  </p>

                  <p>
                    <strong>Fecha nacimiento:</strong>{" "}
                    {user?.fechaNacimiento}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* CONTACTO EMERGENCIA */}

          <Col lg={6} className="mb-4">

            <Card className="dashboard-modern-card h-100">

              <Card.Body>

                <Card.Title className="dashboard-card-title">
                  Contacto de emergencia
                </Card.Title>

                <div className="dashboard-info-group">

                  <p>
                    <strong>Contacto:</strong>{" "}
                    {user?.contactoEmergencia}
                  </p>

                  <p>
                    <strong>Teléfono:</strong>{" "}
                    {user?.telefonoEmergencia}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>
      </Container>

    </DashboardLayout>

  );

};

export default DashboardPacienteNormal;