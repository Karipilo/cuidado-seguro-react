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
import ResumenClinico from "../components/profesional/ResumenClinico";
import FormularioAntropometria from "../components/profesional/FormularioAntropometria";
import FormularioSolicitudExamenes from "../components/profesional/FormularioSolicitudExamenes";
import FormularioMedicamentos from "../components/profesional/FormularioMedicamentos";
import HistorialAntropometria from "../components/profesional/HistorialAntropometria";
import HistorialSignosVitales from "../components/profesional/HistorialSignosVitales";
import AlertasSignosVitales from "../components/profesional/AlertasSignosVitales";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import HistorialMedicamentos from "../components/profesional/HistorialMedicamentos";

const DashboardProfesional = () => {
  const navigate = useNavigate();

  const [profesional, setProfesional] = useState(null);

  const [rutBusqueda, setRutBusqueda] = useState("");

  const [paciente, setPaciente] = useState(null);

  const [evolucion, setEvolucion] = useState("");

  const [indicacion, setIndicacion] = useState("");

  const evoluciones = getMemoryJSON("evoluciones", []);

  const ultimoRegistro = paciente?.antropometria?.length
    ? paciente.antropometria[paciente.antropometria.length - 1]
    : null;

  const [modo, setModo] = useState("ver");

  useEffect(() => {
    const sesion = getMemoryJSON("sesion");
    console.log("SESION:", sesion);

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
      console.log("EVOLUCION ENVIADA:", {
        fecha: new Date().toLocaleString(),
        profesional: `${profesional?.userInfo?.nombreCompleto} (${profesional?.userInfo?.profesion})`,
        descripcion: evolucion,
        observaciones: "",
        pacienteId: paciente?.id,
      });
      console.log("BODY COMPLETO:", {
        fecha: new Date().toLocaleString(),
        profesional: `${profesional?.userInfo?.nombreCompleto} (${profesional?.userInfo?.profesion})`,
        descripcion: evolucion,
        observaciones: "",
        pacienteId: paciente?.id,
      });
      const evoluciones = await request("/evoluciones", { token });

      /* =========================
       OBTENER FICHAS CLÍNICAS
    ========================== */

      const fichas = await request("/fichas", { token });

      //console.log("FICHAS:", fichas);
      //console.log("TIPO:", typeof fichas);

      const encontrado = fichas.find((f) => {
        return String(f.rutPaciente).trim() === String(rutBusqueda).trim();
      });
      if (!encontrado) {
        alert("Paciente no encontrado");
        return;
      }

      console.log(JSON.stringify(evoluciones, null, 2));

      console.log("ENCONTRADO:", encontrado);
      console.log("ID ENCONTRADO:", encontrado.id);
      const antropometrias = await request(`/antropometrias/${encontrado.id}`, {
        token,
      });

      const signosVitales = await request(
        `/signos-vitales/ficha/${encontrado.id}`,
        { token },
      );

      const examenes = await request("/examenes", {
        token,
      });

      console.log("EXAMENES:", examenes);

      const examenesPaciente = examenes.filter((e) => e.ficha === encontrado.id,);

      console.log("EXAMENES PACIENTE:", examenesPaciente);
      console.log(
        "PRIMER EXAMEN:",
        JSON.stringify(examenesPaciente[0], null, 2),
      );

      const indicaciones = await request("/indicaciones", {
        token,
      });

      console.log("INDICACIONES:", indicaciones);

      const indicacionesPaciente = indicaciones.filter(
        (i) => i.ficha?.id === encontrado.id,
      );

      console.log("INDICACIONES PACIENTE:", indicacionesPaciente);

      console.log("SIGNOS VITALES:", signosVitales);
      console.log("TIPO:", typeof antropometrias);
      console.log("ES ARRAY:", Array.isArray(antropometrias));
      console.log("RESPUESTA ANTROPOMETRIAS:");
      console.log(antropometrias);
      console.log(typeof antropometrias);
      console.log("ANTROPOMETRIAS:", antropometrias);

      const evolucionesPaciente = evoluciones.filter(
        (e) => e.pacienteId === encontrado.id,
      );

      console.log(
        "EVOLUCIONES PACIENTE:",
        JSON.stringify(evolucionesPaciente, null, 2),
      );

      /* =========================
       OBTENER MEDICAMENTOS
    ========================== */

      let medicamentos = [];

      try {
        medicamentos = await request("/medicamentos", { token });

        console.log("MEDICAMENTOS DESDE API:", medicamentos);
      } catch (error) {
        console.error("ERROR OBTENIENDO MEDICAMENTOS:", error);

        if (error?.response) {
          console.log("STATUS:", error.response.status);
          console.log("DATA:", error.response.data);
        }
      }

      console.log("MEDICAMENTOS:", medicamentos);
      console.log("MEDICAMENTOS JSON:", JSON.stringify(medicamentos, null, 2));

      medicamentos.forEach((m) => {
        console.log("MEDICAMENTO COMPLETO:", JSON.stringify(m, null, 2));
      });
      console.log("PACIENTE ENCONTRADO:", encontrado);

      console.log("ID PACIENTE:", encontrado.id);

      /* =========================
       FILTRAR POR ficha_id
    ========================== */

      const medicamentosPaciente = medicamentos.filter(
        (m) => m.ficha?.id === encontrado.id,
      );
      console.log("MEDICAMENTOS DESDE API:", medicamentos);
      console.log("MEDICAMENTOS FILTRADOS:", medicamentosPaciente);
      console.log("ID FICHA ENCONTRADO:", encontrado.id);

      console.log("MEDICAMENTOS PACIENTE:", medicamentosPaciente);

      /* =========================
       FORMATEAR TEXTO
    ========================== */

      const medicamentosTexto =
        encontrado.medicamentos?.length > 0
          ? encontrado.medicamentos.map((m) => m.nombre).join(", ")
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
        medicamentos: encontrado.medicamentos || [],
        antropometria: antropometrias,
        signosVitales: signosVitales,
        evoluciones: evolucionesPaciente,
        indicaciones: indicacionesPaciente,
        examenes: examenesPaciente,
      });
    } catch (error) {
      console.error("Error buscando paciente:", error);

      alert("No se pudo obtener la información");
    }
  };
  /* GUARDAR EVOLUCION */

  const guardarEvolucion = async () => {
    try {
      if (!evolucion) {
        alert("Debe escribir una evolución");
        return;
      }
      console.log("EVOLUCION ENVIADA:", {
        fecha: new Date().toISOString().slice(0, 19),
        profesional: profesional?.nombreCompleto,
        descripcion: evolucion,
        observaciones: "",
        pacienteId: paciente?.id,
      });
      console.log("PROFESIONAL COMPLETO:", profesional);
      console.log("PROFESIONAL COMPLETO:", profesional);

      console.log("NOMBRE PROFESIONAL:", profesional?.userInfo?.nombreCompleto);

      console.log("PROFESION:", profesional?.userInfo?.profesion);
      console.log("BODY EVOLUCION", {
        fecha: new Date().toLocaleString(),
        profesional: `${profesional?.userInfo?.nombreCompleto} (${profesional?.userInfo?.profesion})`,
        descripcion: evolucion,
        observaciones: "",
        pacienteId: paciente?.id,
      });
      await request("/evoluciones", {
        method: "POST",
        token: profesional?.accessToken,
        body: {
          fecha: new Date().toLocaleString(),
          profesional: `${profesional?.userInfo?.nombreCompleto} (${profesional?.userInfo?.profesion})`,
          descripcion: evolucion,
          observaciones: "",
          pacienteId: paciente?.id,
        },
      });

      await buscarPaciente();

      alert("Evolución guardada en BD");

      setEvolucion("");
    } catch (error) {
      console.error("ERROR EVOLUCION:", error);
    }
  };

  const guardarIndicacion = async () => {
    try {
      if (!indicacion) {
        alert("Debe escribir una indicación");
        return;
      }

      await request("/indicaciones", {
        method: "POST",
        token: profesional?.accessToken,
        body: {
          fecha: new Date().toLocaleString(),
          profesional: `${profesional?.userInfo?.nombreCompleto}`,
          indicacion: indicacion,
          ficha: {
            id: paciente.id,
          },
        },
      });

      await buscarPaciente();

      alert("Indicación guardada en BD");

      setIndicacion("");
    } catch (error) {
      console.error(error);
      alert("Error al guardar indicación");
    }
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
          <Col lg={12}>
            {paciente && (
              <>
                {/* DATOS PACIENTE */}

                <div id="historial">
                  <PacienteResumen paciente={paciente} />
                </div>

                {/* BOTONES */}

                {/* TABS CLINICAS */}

                <Row className="mt-4">
                  <Col lg={12}>
                    <TabsClinicas
                      fichaClinicaComponent={
                        <FormularioFichaClinica
                          paciente={paciente}
                          setPaciente={setPaciente}
                        />
                      }
                      resumenComponent={<ResumenClinico paciente={paciente} profesional={profesional?.userInfo?.nombreCompleto}/>}
                      antropometriaComponent={
                        <>
                          <FormularioAntropometria
                            paciente={paciente}
                            setPaciente={setPaciente}
                            profesional={profesional?.userInfo?.nombreCompleto}
                          />

                          <div className="mt-4">
                            <Antropometria paciente={paciente} 
                            profesional={profesional?.userInfo?.nombreCompleto}/>
                          </div>

                          <div className="mt-4">
                            <HistorialAntropometria paciente={paciente} profesional={profesional?.userInfo?.nombreCompleto}/>
                          </div>
                        </>
                      }
                      signosVitalesComponent={
                        <>
                          <div className="mt-4">
                            <SignosVitales paciente={paciente} profesional={profesional?.userInfo?.nombreCompleto}/>
                          </div>
                          <FormularioSignosVitales
                            paciente={paciente}
                            setPaciente={setPaciente}
                            profesional={profesional?.userInfo?.nombreCompleto}
                          />

                          <div className="mt-4">
                            <HistorialSignosVitales paciente={paciente} profesional={profesional?.userInfo?.nombreCompleto}/>
                          </div>
                        </>
                      }
                      medicamentosComponent={
                        <>
                          <FormularioMedicamentos
                            paciente={paciente}
                            setPaciente={setPaciente}
                            profesional={profesional?.userInfo?.nombreCompleto}
                          />

                          <div className="mt-4">
                            <HistorialMedicamentos
                              paciente={paciente}
                              onActualizarPaciente={buscarPaciente}
                              profesional={profesional?.userInfo?.nombreCompleto}
                            />
                          </div>
                        </>
                      }
                      evolucionComponent={
                        <>
                          {" "}
                          <Card
                            id="evolucion"
                            className="dashboard-modern-card"
                          >
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
                          <div className="mt-4">
                            <HistorialEvoluciones
                              paciente={paciente}
                              onActualizarPaciente={buscarPaciente}
                              profesional={profesional?.userInfo?.nombreCompleto}
                            />
                          </div>
                        </>
                      }
                      examenesClinicosComponent={
                        <>
                          <FormularioSolicitudExamenes
                            paciente={paciente}
                            onActualizarPaciente={buscarPaciente}
                            profesional={profesional?.userInfo?.nombreCompleto}
                          />

                          <div className="mt-4">
                            <ExamenesClinicos
                              paciente={paciente}
                              onActualizarPaciente={buscarPaciente}
                              profesional={profesional?.userInfo?.nombreCompleto}
                            />
                          </div>
                        </>
                      }
                      indicacionesComponent={
                        <>
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

                          <div className="mt-4">
                            <HistorialIndicaciones
                              paciente={paciente}
                              onActualizarPaciente={buscarPaciente}
                              profesional={profesional?.userInfo?.nombreCompleto}
                            />
                          </div>
                        </>
                      }
                    />
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
