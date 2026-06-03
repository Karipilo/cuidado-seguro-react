import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageSection from "../components/dashboard/MessageSection";
//import { usuarios } from "../data/usuario";
import HeaderProfesional from "../components/profesional/HeaderProfesional";
import HistorialClinico from "../components/profesional/HistorialClinico";
import PacienteResumen from "../components/profesional/PacienteResumen";
import Antropometria from "../components/profesional/Antropometria";
import SignosVitales from "../components/profesional/SignosVitales";
import TabsClinicas from "../components/profesional/TabsClinicas";
import "../styles/dashboard.css";
import FormularioFichaClinica from "../components/profesional/FormularioFichaClinica";
import { Alert } from "react-bootstrap";
import AccionesRapidas from "../components/profesional/AccionesRapidas";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";
import { getMemoryJSON, setMemoryJSON } from "../utils/memoryStore";
import { request } from "../utils/api";
import PerfilProfesional from "../components/profesional/PerfilProfesional";

const DashboardProfesional = () => {
  const navigate = useNavigate();

  const [profesional, setProfesional] = useState(null);

  const [rutBusqueda, setRutBusqueda] = useState("");

  const [paciente, setPaciente] = useState(null);

  const [evolucion, setEvolucion] = useState("");

  const [indicacion, setIndicacion] = useState("");

  const evoluciones = getMemoryJSON("evoluciones", []);

  const indicaciones = getMemoryJSON("indicaciones", []);

  const ultimoRegistro = paciente?.antropometria?.length
    ? paciente.antropometria[paciente.antropometria.length - 1]
    : null;

  const [modo, setModo] = useState("ver");

  const indicacionesPaciente = indicaciones.filter(
    (i) => i.rutPaciente === paciente?.numeroDocumento,
  );

  useEffect(() => {
    const sesion = getMemoryJSON("sesion");

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

      const fichas = await request("/fichas", { token });

      //console.log("FICHAS:", fichas);
      //console.log("TIPO:", typeof fichas);

      const encontrado = fichas.find((f) => {
        return String(f.rutPaciente).trim() === String(rutBusqueda).trim();
      });
      console.log("ENCONTRADO:", encontrado);

      if (!encontrado) {
        alert("Paciente no encontrado");

        return;
      }

      console.log("PACIENTE ENCONTRADO:", encontrado);

      /* =========================
       OBTENER MEDICAMENTOS
    ========================== */

      const medicamentos = await request("/medicamentos", { token });

      console.log("MEDICAMENTOS:", medicamentos);

      /* =========================
       FILTRAR POR ficha_id
    ========================== */

      const medicamentosPaciente = medicamentos.filter(
        (m) => m.ficha?.id === encontrado.id,
      );

      console.log("MEDICAMENTOS PACIENTE:", medicamentosPaciente);

      /* =========================
       FORMATEAR TEXTO
    ========================== */

      const medicamentosTexto =
        medicamentosPaciente.length > 0
          ? medicamentosPaciente.map((m) => m.nombre).join(", ")
          : "Sin medicamentos registrados";

      /* =========================
       SET PACIENTE
    ========================== */

      setPaciente({
        id: encontrado.id,

        numeroDocumento: encontrado.rutPaciente,

        nombres: encontrado.nombrePaciente,

        edad: encontrado.edad,

        genero: encontrado.genero,

        alergias: encontrado.alergias,

        diagnostico: encontrado.diagnostico,

        observaciones: encontrado.observaciones,

        medicamentosActuales: medicamentosTexto,
      });
    } catch (error) {
      console.error("Error buscando paciente:", error);

      alert("No se pudo obtener la información");
    }
  };
  /* GUARDAR EVOLUCION */

  const guardarEvolucion = async () => {
     console.log("ENTRO A GUARDAR EVOLUCION");
    try {
      if (!evolucion) {
        alert("Debe escribir una evolución");
        return;
      }

      await request("/evoluciones", {
        method: "POST",
        token: profesional?.accessToken,
        body: {
          fecha: new Date().toLocaleString(),
          descripcion: evolucion,
          observaciones: "",
          pacienteId: paciente?.id,
        },
      });

      alert("Evolución guardada en BD");

      setEvolucion("");
    } catch (error) {
      console.error("ERROR EVOLUCION:", error);

      alert("Error guardando evolución");
    }
  };

  const guardarIndicacion = () => {
    if (!indicacion) {
      alert("Debe escribir una indicación");

      return;
    }

    const indicaciones = getMemoryJSON("indicaciones", []);

    indicaciones.push({
      rutPaciente: paciente.numeroDocumento,

      texto: indicacion,

      fecha: new Date().toLocaleString(),

      profesional: `${profesional.nombres}
            ${profesional.apellidos}`,

      profesion: profesional.profesion,
    });

    setMemoryJSON("indicaciones", indicaciones);

    alert("Indicación guardada");

    setIndicacion("");
  };

  if (!profesional) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <DashboardLayout usuario={profesional} paciente={paciente}>
      <Container fluid className="dashboard-top-spacing">
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
                  <PacienteResumen paciente={paciente} />
                </div>

                <Row className="mb-4">
                  <Col className="d-flex gap-2">
                    <Button
                      variant={modo === "ver" ? "primary" : "outline-primary"}
                      onClick={() => setModo("ver")}
                    >
                      Ver Información
                    </Button>

                    <Button
                      variant={
                        modo === "agregar" ? "success" : "outline-success"
                      }
                      onClick={() => setModo("agregar")}
                    >
                      Agregar Información
                    </Button>

                    <Button
                      variant={
                        modo === "editar" ? "warning" : "outline-warning"
                      }
                      onClick={() => setModo("editar")}
                    >
                      Modificar Información
                    </Button>
                  </Col>
                </Row>

                {/* BOTONES */}

                {modo === "ver" && (
                  <Card className="dashboard-modern-card mb-4">
                    <Card.Body>
                      <h5>Información General</h5>

                      {modo === "agregar" && (
                        <Alert variant="success" className="mb-4">
                          Selecciona una pestaña clínica para agregar nueva
                          información al paciente.
                        </Alert>
                      )}

                      {modo === "editar" && (
                        <Alert variant="warning" className="mb-4">
                          Modo edición activado. Aquí podrás modificar registros
                          existentes.
                        </Alert>
                      )}

                      <p>
                        <strong>Diagnóstico:</strong> {paciente?.diagnostico}
                      </p>

                      <p>
                        <strong>Alergias:</strong> {paciente?.alergias}
                      </p>

                      <p>
                        <strong>Observaciones:</strong>{" "}
                        {paciente?.observaciones}
                      </p>
                    </Card.Body>
                  </Card>
                )}
                {/* TABS CLINICAS */}

                <Row className="mt-4">
                  <Col lg={3}>
                    <PerfilProfesional profesional={profesional} />
                  </Col>

                  <Col lg={6}>
                    <TabsClinicas
                      fichaClinicaComponent={
                        <FormularioFichaClinica
                          paciente={paciente}
                          setPaciente={setPaciente}
                        />
                      }
                      resumenComponent={
                        <Card className="dashboard-modern-card">
                          <Card.Body>
                            <Card.Title>Resumen clínico</Card.Title>

                            <p>Paciente actualmente en seguimiento clínico.</p>
                          </Card.Body>
                        </Card>
                      }
                      antropometriaComponent={
                        <Antropometria paciente={paciente} />
                      }
                      signosVitalesComponent={
                        <>
                          <FormularioSignosVitales
                            paciente={paciente}
                            setPaciente={setPaciente}
                          />

                          <div className="mt-4">
                            <SignosVitales paciente={paciente} />
                          </div>

                          <div className="mt-4">
                            <ExamenesClinicos />
                          </div>
                        </>
                      }
                      evolucionComponent={
                        <Card id="evolucion" className="dashboard-modern-card">
                          <Card.Body>
                            <Card.Title className="dashboard-card-title">
                              Registrar evolución clínica
                            </Card.Title>

                            <Form.Control
                              as="textarea"
                              className="dashboard-textarea"
                              rows={5}
                              placeholder="Escriba evolución clínica..."
                              value={evolucion}
                              onChange={(e) => setEvolucion(e.target.value)}
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
                      indicacionesComponent={
                        <Card className="dashboard-modern-card">
                          <Card.Body>
                            <Card.Title className="dashboard-card-title">
                              Indicaciones clínicas
                            </Card.Title>

                            <Form.Control
                              as="textarea"
                              rows={4}
                              className="dashboard-textarea"
                              placeholder="Escriba indicaciones..."
                              value={indicacion}
                              onChange={(e) => setIndicacion(e.target.value)}
                            />

                            <Button
                              className="mt-3 btn-dashboard-primary"
                              onClick={guardarIndicacion}
                            >
                              Guardar indicación
                            </Button>
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
      </Container>
    </DashboardLayout>
  );
};

export default DashboardProfesional;
