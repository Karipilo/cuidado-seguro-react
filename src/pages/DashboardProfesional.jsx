import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { usuarios } from "../data/usuario";

const DashboardProfesional = () => {

  const navigate = useNavigate();

  const [profesional, setProfesional] = useState(null);
  const [rutBusqueda, setRutBusqueda] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [evolucion, setEvolucion] = useState("");

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));

    if (!sesion) {
      navigate("/login");
      return;
    }

    setProfesional(sesion);
  }, [navigate]);

  const buscarPaciente = () => {
    const encontrado = usuarios.find(
      (u) =>
        u.tipoUsuario === "PACIENTE" &&
        u.numeroDocumento === rutBusqueda
    );

    if (!encontrado) {
      alert("Paciente no encontrado");
      setPaciente(null);
      return;
    }

    setPaciente(encontrado);
  };

  const guardarEvolucion = () => {
    if (!evolucion) {
      alert("Debe escribir una evolución");
      return;
    }

    const evoluciones = JSON.parse(localStorage.getItem("evoluciones")) || [];

    evoluciones.push({
      rutPaciente: paciente.numeroDocumento,
      texto: evolucion,
      fecha: new Date().toLocaleString(),
      profesional: profesional.nombres
    });

    localStorage.setItem("evoluciones", JSON.stringify(evoluciones));

    alert("Evolución guardada");
    setEvolucion("");
  };

  return (
    <div className="container mt-4">

      <h1>Dashboard Profesional</h1>
      <p>Bienvenido {profesional?.nombres}</p>

      {/* BUSCADOR */}
      <Card className="p-3 mb-4">
        <h5>Buscar paciente por RUT</h5>

        <div className="d-flex">
          <Form.Control
            placeholder="Ingrese RUT (sin puntos ni guion)"
            value={rutBusqueda}
            onChange={(e) => setRutBusqueda(e.target.value)}
          />

          <Button className="ms-2" onClick={buscarPaciente}>
            Buscar
          </Button>
        </div>
      </Card>

      {/* DATOS PACIENTE */}
      {paciente && (
        <Card className="p-3 mb-4">
          <h5>Datos del paciente</h5>

          <p><strong>Nombre:</strong> {paciente.nombres} {paciente.apellidos}</p>
          <p><strong>RUT:</strong> {paciente.numeroDocumento}</p>
          <p><strong>Grupo sanguíneo:</strong> {paciente.grupoSanguineo}</p>
          <p><strong>Alergias:</strong> {paciente.alergias}</p>
          <p><strong>Enfermedades:</strong> {paciente.enfermedadesCronicas}</p>
          <p><strong>Medicamentos:</strong> {paciente.medicamentosActuales}</p>
        </Card>
      )}

      {/* EVOLUCIÓN */}
      {paciente && (
        <Card className="p-3">
          <h5>Registrar evolución</h5>

          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escriba evolución médica..."
            value={evolucion}
            onChange={(e) => setEvolucion(e.target.value)}
          />

          <Button className="mt-3" onClick={guardarEvolucion}>
            Guardar evolución
          </Button>
        </Card>
      )}

    </div>
  );
};

export default DashboardProfesional;
