import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";

import "../styles/dashboard.css";

import SignosVitales from "../components/profesional/SignosVitales";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import ResumenClinico from "../components/profesional/ResumenClinico";

const DashboardPaciente = () => {

  const [user, setUser] = useState(null);

  const [pacienteActivo, setPacienteActivo] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const obtenerUsuario = async () => {

      try {

        const sesion = JSON.parse(
          localStorage.getItem("sesion")
        );

        const token = sesion?.accessToken;

        if (!token) {

          navigate("/login", {
            replace: true
          });

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

        console.log(
          "STATUS:",
          response.status
        );

        if (!response.ok) {

          if (response.status === 401) {

            localStorage.removeItem(
              "sesion"
            );

            navigate("/login", {
              replace: true
            });

            return;

          }

          const errorText =
            await response.text();

          console.error(
            "ERROR BACKEND:",
            errorText
          );

          throw new Error(
            `HTTP ${response.status}`
          );

        }

        // EVITA:
        // Unexpected end of JSON input

        const text =
          await response.text();

        if (
          !text ||
          text.trim() === ""
        ) {

          throw new Error(
            "Respuesta vacía del backend"
          );

        }

        const data = JSON.parse(text);

        console.log("DATA:", data);

        const persona =
          data?.usuario?.persona || {};

        const usuarioCompleto = {

          nombres:
            persona?.nombres || "",

          apellidos:
            persona?.apellidos || "",

          numeroDocumento:
            persona?.numeroDocumento || "",

          fechaNacimiento:
            persona?.fechaNacimiento || "",

          genero:
            persona?.genero || "",

          telefono:
            persona?.telefono || "",

          email:
            persona?.email || "",

          direccion:
            persona?.direccion || "",

          grupoSanguineo:
            data?.grupoSanguineo || "",

          factorRh:
            data?.factorRh || "",

          alergias:
            data?.alergias || "",

          enfermedadesCronicas:
            data?.enfermedadesCronicas || "",

          medicamentosActuales:
            data?.medicamentosActuales || "",

          contactoEmergencia:
            data?.contactoEmergencia || "",

          telefonoEmergencia:
            data?.telefonoEmergencia || "",

          seguroMedico:
            data?.prevision || ""

        };

        setUser(usuarioCompleto);

        setPacienteActivo(
          usuarioCompleto
        );

      } catch (error) {

        console.error(
          "Error obteniendo usuario:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    obtenerUsuario();

  }, [navigate]);

  if (loading) {

    return (
      <div className="text-center mt-5">
        <p>Cargando información...</p>
      </div>
    );

  }

  if (!user) {

    return (
      <div className="text-center mt-5">
        <p>
          No se pudo cargar la información
          del usuario.
        </p>
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

              Panel del Profesional -
              Paciente:
              {" "}
              {user?.nombres}
              {" "}
              {user?.apellidos}

            </h2>

            <p className="dashboard-subtitle">

              Profesional, aquí encontrarás
              toda la información relevante
              de tus pacientes.

            </p>

          </div>

          <Badge
            bg="success"
            className="status-badge"
          >
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

        {/* INFORMACIÓN */}

        <Row>

          {/* PERSONAL */}

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
                    {user?.telefono}
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

          {/* CLÍNICA */}

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

          <Col lg={12} className="mb-4">

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
                    {user?.telefonoEmergencia}
                  </p>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>

        {/* RESUMEN */}

        <Row>

          <Col lg={12} className="mb-4">

            <ResumenClinico
              paciente={pacienteActivo}
            />

          </Col>

        </Row>

      </Container>

    </DashboardLayout>

  );

};

export default DashboardPaciente;