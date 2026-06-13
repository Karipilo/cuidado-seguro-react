import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import HistorialClinico from "../components/profesional/HistorialClinico";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import ResumenClinico from "../components/profesional/ResumenClinico";
import SignosVitales from "../components/profesional/SignosVitales";
import "../styles/dashboard.css";
import { getMemoryJSON, removeMemoryItem } from "../utils/memoryStore";
import { request } from "../utils/api";

const DashboardPacienteNormal = () => {

  const [user, setUser] = useState(null);
  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const obtenerUsuario = async () => {
      try {
        const sesion = getMemoryJSON("sesion");
        const token = sesion?.accessToken;

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const data = await request(
          "/auth/userinfo",
          { method: "GET", token }
        );

        console.log("DATA:", data);

        //Agregar persona
        const persona = data?.usuario?.persona || {};

        //Agregar logs para revisar la estructura de los datos obtenidos
        const fichas = await request("/fichas", { token });

        console.log("FICHAS:", fichas);

        const fichaPaciente = fichas.find(
          (f) => 
            String(f.rutPaciente).trim() ===
            String(persona?.numeroDocumento || "")
              .replace(/\./g, "")
              .trim()
      );

      console.log("FICHA PACIENTE:", fichaPaciente);

      let signosVitales = [];
      let evolucionesPaciente = [];
      let indicacionesPaciente = [];

      if (fichaPaciente?.id) {
        signosVitales = await request(
          `/signos-vitales/ficha/${fichaPaciente.id}`,
          { token }
        );

        console.log("SIGNOS VITALES:", signosVitales);
      
      if (fichaPaciente?.id) {
        const evoluciones = await request(
          "/evoluciones",
          { token }
        );

        evolucionesPaciente = evoluciones. filter(
          (e) => e.pacienteId === fichaPaciente.id
        );
        console.log("EVOLUCIONES PACIENTE:", evolucionesPaciente);

        if (fichaPaciente?.id) {
          const indicaciones = await request(
            "/indicaciones",
            { token }
          );

          console.log("INDICACIONES:", indicaciones);

          indicacionesPaciente = indicaciones;

          console.log(
            "INDICACIONES PACIENTE:",
            indicacionesPaciente
          );
        }
      };
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
          signosVitales: signosVitales,
          evoluciones: evolucionesPaciente,
          indicaciones: indicacionesPaciente,
        };

        setUser(usuarioCompleto);
        setPacienteActivo(usuarioCompleto);

        console.log("USUARIO COMPLETO:", usuarioCompleto);

      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        if (error.message?.includes("401")) {
          removeMemoryItem("sesion");
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();

  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Cargando información...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <p>No se pudo cargar la información del usuario.</p>
      </div>
    );
  }

  // Revisar qué datos llegan desde el backend
  console.log(
    "PACIENTE ACTIVO:",
    pacienteActivo
  );

  console.log(
    "PACIENTE ACTIVO EVOLUCIONES:",
    pacienteActivo?.evoluciones
  );
  
  return (
    <DashboardLayout usuario={user}>
      <Container fluid>
        {/* HEADER */}
        <div className="dashboard-top mb-4">
          <div>
            <h2 className="dashboard-title">
              Panel de seguimiento clínico continuo
            </h2>
            <p className="dashboard-subtitle">
              Hola, {user?.nombres}. Aquí podrás ver tu información clínica y tu avance.
            </p>
          </div>
          <Badge bg="primary" className="status-badge">Paciente activo</Badge>
        </div>

        

        <Row>
          {/* INFORMACIÓN PERSONAL */}
          <Col lg={6} className="mb-4">
            <Card id="perfil" className="dashboard-modern-card h-100">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Información personal</Card.Title>
                <div className="dashboard-info-group">
                  <p><strong>Nombre:</strong> {user?.nombres} {user?.apellidos}</p>
                  <p><strong>Documento:</strong> {user?.numeroDocumento}</p>
                  <p><strong>Correo:</strong> {user?.email}</p>
                  <p><strong>Teléfono:</strong> {user?.telefono}</p>
                  <p><strong>Dirección:</strong> {user?.direccion}</p>
                  <p><strong>Género:</strong> {user?.genero}</p>
                  <p><strong>Fecha nacimiento:</strong> {user?.fechaNacimiento}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* INFORMACIÓN CLÍNICA */}
          <Col lg={6} className="mb-4">
            <Card className="dashboard-modern-card h-100">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Información clínica</Card.Title>
                <div className="dashboard-info-group">
                  <p><strong>Grupo sanguíneo:</strong> {user?.grupoSanguineo}</p>
                  <p><strong>Factor RH:</strong> {user?.factorRh}</p>
                  <p><strong>Alergias:</strong> {user?.alergias || "Ninguna"}</p>
                  <p><strong>Enfermedades crónicas:</strong> {user?.enfermedadesCronicas || "Ninguna"}</p>
                  <p><strong>Medicamentos:</strong> {user?.medicamentosActuales || "Ninguno"}</p>
                  <p><strong>Previsión:</strong> {user?.seguroMedico || "No registrada"}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CONTACTO DE EMERGENCIA */}
        <Row>
          <Col lg={12} className="mb-4">
            <Card className="dashboard-modern-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Contacto de emergencia</Card.Title>
                <div className="dashboard-info-group">
                  <p><strong>Contacto:</strong> {user?.contactoEmergencia || "No registrado"}</p>
                  <p><strong>Teléfono:</strong> {user?.telefonoEmergencia || "No registrado"}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SIGNOS VITALES */}
        <Row>
          <Col lg={12} className="mb-4">
            <SignosVitales paciente={pacienteActivo} />
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <HistorialEvoluciones paciente={pacienteActivo} />
          </Col>
          <Col lg={6} className="mb-4">
            <HistorialIndicaciones paciente={pacienteActivo} />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <HistorialClinico
              evoluciones={pacienteActivo?.evoluciones} 
            />
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPacienteNormal;
