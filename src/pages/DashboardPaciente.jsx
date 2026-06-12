import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import { getMemoryJSON, removeMemoryItem } from "../utils/memoryStore";
import "../styles/dashboard.css";
import { request } from "../utils/api";

import ResumenClinico from "../components/profesional/ResumenClinico";
import SignosVitales from "../components/profesional/SignosVitales";

const DashboardPaciente = () => {

  const [user, setUser] = useState(null);

  const [pacienteActivo, setPacienteActivo] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const obtenerUsuario = async () => {

      try {

        const sesion = getMemoryJSON("sesion");

        const token = sesion?.accessToken;

        if (!token) {

          navigate("/login", {
            replace: true
          });

          return;

        }

        const data = await request(
          "/auth/userinfo",
          { method: "GET", token }
        );

        console.log("DATA:", data);

        const persona = data?.usuario?.persona || {};
        const rutLimpio = String(persona?.numeroDocumento || "").replace(/\./g, "").replace(/-/g, "").trim();

        let misMedicamentos = [];
        let misSignos = [];
        let misEvoluciones = [];
        let misIndicaciones = [];

        try {
          const fichas = await request("/fichas", { token });
          const miFicha = fichas.find(
            (f) => String(f.rutPaciente || "").replace(/\./g, "").replace(/-/g, "").trim() === rutLimpio
          );

          if (miFicha) {
            misMedicamentos = miFicha.medicamentos || [];

            misSignos = await request(`/signos-vitales/ficha/${miFicha.id}`, { token });

            const todasEvoluciones = await request("/evoluciones", { token });
            misEvoluciones = todasEvoluciones.filter((e) => e.pacienteId === miFicha.id);

            const todasIndicaciones = await request("/indicaciones", { token });
            misIndicaciones = todasIndicaciones.filter((i) => i.ficha?.id === miFicha.id);
          }
        } catch (err) {
          console.error("Error al obtener detalles clínicos del paciente:", err);
        }

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
          seguroMedico: data?.prevision || "",
          medicamentosRecetados: misMedicamentos,
          signosVitales: misSignos,
          evoluciones: misEvoluciones,
          indicaciones: misIndicaciones
        };

        setUser(usuarioCompleto);
        setPacienteActivo(usuarioCompleto);

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

        {/* MEDICAMENTOS RECETADOS POR EL PROFESIONAL */}
        <Row>
          <Col lg={12} className="mb-4">
            <Card className="dashboard-modern-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Medicamentos recetados por el profesional</Card.Title>
                {user?.medicamentosRecetados?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Medicamento</th>
                          <th>Dosis</th>
                          <th>Frecuencia</th>
                          <th>Duración</th>
                          <th>Profesional</th>
                          <th>Observaciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.medicamentosRecetados.map((med, index) => (
                          <tr key={index}>
                            <td><strong>{med.nombre}</strong></td>
                            <td>{med.dosis}</td>
                            <td>{med.frecuencia}</td>
                            <td>{med.diasTratamiento} días</td>
                            <td>{med.profesional || "No registrado"}</td>
                            <td>{med.observaciones || "Sin observaciones"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted mb-0">No tienes medicamentos recetados por profesionales.</p>
                )}
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
