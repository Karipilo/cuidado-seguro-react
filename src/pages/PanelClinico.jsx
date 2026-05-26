import { useEffect, useRef, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import AccionesRapidas from "../components/profesional/AccionesRapidas";
import Antropometria from "../components/profesional/Antropometria";
import ExamenesClinicos from "../components/profesional/ExamenesClinicos";
import FormularioAntropometria from "../components/profesional/FormularioAntropometria";
import FormularioEvolucion from "../components/profesional/FormularioEvolucion";
import FormularioExamenes from "../components/profesional/FormularioExamenes";
import FormularioIndicaciones from "../components/profesional/FormularioIndicaciones";
import FormularioSignosVitales from "../components/profesional/FormularioSignosVitales";
import HistorialAntropometria from "../components/profesional/HistorialAntropometria";
import HistorialEvoluciones from "../components/profesional/HistorialEvoluciones";
import HistorialIndicaciones from "../components/profesional/HistorialIndicaciones";
import HistorialSignosVitales from "../components/profesional/HistorialSignosVitales";
import ResumenClinico from "../components/profesional/ResumenClinico";
import SignosVitales from "../components/profesional/SignosVitales";
import TabsClinicas from "../components/profesional/TabsClinicas";
import { getMemoryJSON, setMemoryJSON, getMemoryItem } from "../utils/memoryStore";
import { request, BFF_URL } from "../utils/api.js";

const PanelClinico = () => {

  const { rut } = useParams();

  const [mostrarFormularioSV, setMostrarFormularioSV] = useState(false);
  const [mostrarFormularioAntropometria, setMostrarFormularioAntropometria] = useState(false);
  const [mostrarFormularioEvolucion, setMostrarFormularioEvolucion] = useState(false);
  const [mostrarFormularioIndicaciones, setMostrarFormularioIndicaciones] = useState(false);
  const [mostrarFormularioExamenes, setMostrarFormularioExamenes] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [errorPaciente, setErrorPaciente] = useState("");

  const formularioRef = useRef(null);
  const [activeTab, setActiveTab] = useState("resumen");

  const irAFormulario = () => {
    setTimeout(() => {
      formularioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    if (!rut) return;

    const cargarPaciente = async () => {
      setCargando(true);
      setErrorPaciente("");

      try {
        // 1. Buscar sesión en memoria
        const sesionRaw = getMemoryItem("sesion");
        if (!sesionRaw) {
          setErrorPaciente("Sesión no válida. Por favor inicie sesión.");
          setCargando(false);
          return;
        }
        const sesion = typeof sesionRaw === "string"
          ? JSON.parse(sesionRaw)
          : sesionRaw;

        const token = sesion.accessToken || sesion.token;

        try {
          const data = await request(`/pacientes/rut/${encodeURIComponent(rut)}`, { token });

          const paciente = {
            id: data.id,
            numeroDocumento: data.rut || data.numeroDocumento || rut,
            nombres: data.nombres || data.nombre || "",
            apellidos: data.apellidos || data.apellidoPaterno || "",
            edad: data.edad || "",
            genero: data.genero || "",
            fechaNacimiento: data.fechaNacimiento || "",
            telefono: data.telefono || "",
            email: data.email || "",
            direccion: data.direccion || "",
            grupoSanguineo: data.grupoSanguineo || "",
            factorRh: data.factorRh || "",
            alergias: data.alergias || "",
            enfermedadesCronicas: data.enfermedadesCronicas || "",
            medicamentosActuales: data.medicamentosActuales || "",
            contactoEmergencia: data.contactoEmergencia?.nombre || "",
            telefonoEmergencia: data.contactoEmergencia?.telefono || "",
            diagnostico: data.diagnostico || "",
            observaciones: data.observaciones || "",
            signosVitales: data.signosVitales || [],
            antropometria: data.antropometria || [],
            evoluciones: data.evoluciones || [],
            indicaciones: data.indicaciones || [],
            examenes: data.examenes || [],
          };

          setPacienteActivo(paciente);
          setMemoryJSON(`paciente-${rut}`, paciente);
        } catch (err) {
          setErrorPaciente("No fue posible cargar los datos del paciente.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarPaciente();
  }, [rut]);

  if (cargando) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Cargando ficha clínica...</p>
        </div>
      </Container>
    );
  }

  if (!pacienteActivo) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5 border-0 shadow-sm rounded-4">
          <Card.Body>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <Card.Title className="text-danger">Paciente no encontrado</Card.Title>
            <Card.Text className="text-muted">
              {errorPaciente || "No se encontró un paciente con el RUT indicado."}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="panel-clinico py-4 px-4">

      {/* HEADER */}
      <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">
                {pacienteActivo.nombres} {pacienteActivo.apellidos}
              </h2>
              <p className="text-muted mb-0">RUT: {pacienteActivo.numeroDocumento}</p>
            </div>
            <div className="bg-success-subtle text-success px-3 py-2 rounded-pill">
              Paciente activo
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* DATOS DEL PACIENTE */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <strong>Género</strong>
              <p>{pacienteActivo.genero || "Sin información"}</p>
            </Col>
            <Col md={3}>
              <strong>Edad</strong>
              <p>{pacienteActivo.edad ? `${pacienteActivo.edad} años` : "Sin información"}</p>
            </Col>
            <Col md={3}>
              <strong>Alergias</strong>
              <p>{pacienteActivo.alergias || "Sin alergias registradas"}</p>
            </Col>
            <Col md={3}>
              <strong>Grupo sanguíneo</strong>
              <p>{pacienteActivo.grupoSanguineo} {pacienteActivo.factorRh}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* SIGNOS VITALES */}
      <SignosVitales paciente={pacienteActivo} />

      {/* ANTROPOMETRÍA */}
      <Antropometria paciente={pacienteActivo} />

      {/* FORMULARIOS */}
      {mostrarFormularioSV && (
        <div ref={formularioRef} className="mt-4">
          <FormularioSignosVitales paciente={pacienteActivo} setPaciente={setPacienteActivo} />
        </div>
      )}

      {mostrarFormularioAntropometria && (
        <div ref={formularioRef} className="mt-4">
          <FormularioAntropometria paciente={pacienteActivo} setPaciente={setPacienteActivo} />
        </div>
      )}

      {mostrarFormularioEvolucion && (
        <div ref={formularioRef} className="mt-4">
          <FormularioEvolucion paciente={pacienteActivo} setPaciente={setPacienteActivo} />
        </div>
      )}

      {mostrarFormularioIndicaciones && (
        <div ref={formularioRef} className="mt-4">
          <FormularioIndicaciones paciente={pacienteActivo} setPaciente={setPacienteActivo} />
        </div>
      )}

      {mostrarFormularioExamenes && (
        <div ref={formularioRef} className="mt-4">
          <FormularioExamenes paciente={pacienteActivo} setPaciente={setPacienteActivo} />
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <Row>
        <Col lg={8}>
          <TabsClinicas
            resumenComponent={<ResumenClinico paciente={pacienteActivo} />}
            historialComponent={<ExamenesClinicos paciente={pacienteActivo} />}
            signosVitalesComponent={<HistorialSignosVitales paciente={pacienteActivo} />}
            evolucionComponent={<HistorialEvoluciones paciente={pacienteActivo} />}
            indicacionesComponent={<HistorialIndicaciones paciente={pacienteActivo} />}
          />
        </Col>

        <Col lg={4} className="mt-4 mt-lg-0">
          <AccionesRapidas
            abrirFormularioSV={() => {
              setMostrarFormularioSV(!mostrarFormularioSV);
              setActiveTab("signos");
              irAFormulario();
            }}
            abrirFormularioAntropometria={() => {
              setMostrarFormularioAntropometria(!mostrarFormularioAntropometria);
              setActiveTab("resumen");
              irAFormulario();
            }}
            abrirFormularioEvolucion={() => {
              setMostrarFormularioEvolucion(!mostrarFormularioEvolucion);
              setActiveTab("evolucion");
              irAFormulario();
            }}
            abrirFormularioIndicaciones={() => {
              setMostrarFormularioIndicaciones(!mostrarFormularioIndicaciones);
              setActiveTab("indicaciones");
              irAFormulario();
            }}
            abrirFormularioExamenes={() => {
              setMostrarFormularioExamenes(!mostrarFormularioExamenes);
              setActiveTab("historial");
              irAFormulario();
            }}
          />

          {/* HISTORIAL ANTROPOMETRÍA COMO CARD LATERAL */}
          <div className="mt-4">
            <HistorialAntropometria paciente={pacienteActivo} />
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default PanelClinico;
