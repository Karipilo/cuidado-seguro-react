import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
import { getMemoryJSON } from "../utils/memoryStore";

import ExamenesClinicosTutor from "../components/tutor/ExamenesClinicosTutor";
import HistorialEvolucionesTutor from "../components/tutor/HistorialEvolucionesTutor";
import HistorialIndicacionesTutor from "../components/tutor/HistorialIndicacionesTutor";
import ResumenClinicoTutor from "../components/tutor/ResumenClinicoTutor";
import SignosVitalesTutor from "../components/tutor/SignosVitalesTutor";
import "../styles/dashboard.css";
import { request } from "../utils/api";

const DashboardTutor = () => {
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);

  const [pacientes, setPacientes] = useState([]);

  const [pacienteActivo, setPacienteActivo] = useState(null);

  useEffect(() => {
    const sesion = getMemoryJSON("sesion");

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
          const token = sesion?.accessToken;

          const rutPaciente = sesion.userInfo.pacientesRuts[0]
            .replace(/\./g, "")
            .trim();

          const data = await request(`/pacientes/rut/${rutPaciente}`, {
            token,
          });

          console.log("PACIENTE BASICO:", data);

          const rutLimpio = String(rutPaciente || "").replace(/\./g, "").replace(/-/g, "").trim();

          let misMedicamentos = [];
          let misSignos = [];
          let misEvoluciones = [];
          let misIndicaciones = [];
          let misExamenes = [];
          let misAntropometrias = [];

          try {
            const fichas = await request("/fichas", { token });
            const miFicha = fichas.find(
              (f) => String(f.rutPaciente || "").replace(/\./g, "").replace(/-/g, "").trim() === rutLimpio
            );

            if (miFicha) {
              misMedicamentos = miFicha.medicamentos || [];

              misSignos = await request(`/signos-vitales/ficha/${miFicha.id}`, { token });

              //console.log("SIGNOS VITALES DEL PACIENTE:",JSON.stringify(misSignos, null, 2));
              //console.log("FICHA DEL PACIENTE:", JSON.stringify(miFicha, null, 2));
              const todasEvoluciones = await request("/evoluciones", { token });
              misEvoluciones = todasEvoluciones.filter((e) => e.pacienteId === miFicha.id);


              const ultimaEvolucion = misEvoluciones.reduce(
                (max, actual) => (!max || actual.id > max.id ? actual : max),
                null
              );

              misEvoluciones = ultimaEvolucion ? [ultimaEvolucion] : [];
              //console.log("EVOLUCIONES DEL PACIENTE:", JSON.stringify(misEvoluciones, null, 2));

              const todasIndicaciones = await request("/indicaciones", { token });
              misIndicaciones = todasIndicaciones.filter((i) => i.ficha?.id === miFicha.id);

              const ultimaIndicacion = misIndicaciones.reduce(
                (max, actual) => (!max || actual.id > max.id ? actual : max),
                null
              );

              misIndicaciones = ultimaIndicacion ? [ultimaIndicacion] : [];

              const examenes = await request("/examenes", {
                      token,
                    });
              misExamenes = examenes.filter((e) => e.ficha === miFicha.id);

              const ultimaExamen = misExamenes.reduce(
                (max, actual) => (!max || actual.id > max.id ? actual : max),
                null
              );

              misExamenes = ultimaExamen ? [ultimaExamen] : [];

              console.log("TODOS LOS EXAMENES:", JSON.stringify(misExamenes, null, 2));
              try {
                misAntropometrias = await request(`/antropometrias/${miFicha.id}`, { token });
              } catch (e) {
                console.error("Error fetching antropometrias:", e);
              }
            }
          } catch (err) {
            console.error("Error al obtener detalles clínicos del paciente:", err);
          }

          const pacienteCompleto = {
            ...data,
            numeroDocumento: data.rut,
            nombres: data.nombre,
            apellidos: data.apellido,
            medicamentosRecetados: misMedicamentos,
            signosVitales: misSignos,
            evoluciones: misEvoluciones,
            indicaciones: misIndicaciones,
            examenes: misExamenes,
            antropometria: misAntropometrias
          };

          console.log("PACIENTE COMPLETO INTEGRADO:", pacienteCompleto);

          setPacientes([pacienteCompleto]);

          setPacienteActivo(pacienteCompleto);
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
              Bienvenido, {tutor?.userInfo?.nombreCompleto}
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
                    <strong>Nombre:</strong> {tutor?.userInfo?.nombreCompleto}
                  </p>

                  <p>
                    <strong>Correo:</strong> {tutor?.userInfo?.email}
                  </p>

                  <p>
                    <strong>Teléfono:</strong> {tutor?.userInfo?.telefono}
                  </p>

                  <p>
                    <strong>Dirección:</strong> {tutor?.userInfo?.direccion}
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
                        <strong>Correo:</strong> {p.email}
                      </p>

                      <p>
                        <strong>Teléfono:</strong>{" "}
                        {p.telefono}
                      </p>

                      <p>
                        <strong>Dirección:</strong>{" "}
                        {p.direccion}
                      </p>

                      <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {p.fechaNacimiento}
                      </p>

                      <p>
                        <strong>Género:</strong> {p.genero}
                      </p>

                      <p>
                        <strong>Alergias:</strong> {p.alergias}
                      </p>


                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>

        <Row></Row>

        <Row>
          <Col lg={6} className="mb-4">
            <HistorialEvolucionesTutor paciente={pacienteActivo} />
          </Col>

          <Col lg={6} className="mb-4">
            <HistorialIndicacionesTutor paciente={pacienteActivo} />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            <SignosVitalesTutor paciente={pacienteActivo} />
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="mb-4">
            
            <ExamenesClinicosTutor paciente={pacienteActivo} />
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardTutor;
