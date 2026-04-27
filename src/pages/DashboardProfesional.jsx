import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { usuarios } from "../data/usuario";
import "../styles/dashboard.css";

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
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Panel Profesional</h2>
        <p>{profesional?.nombres} - {profesional?.profesion}</p>
      </div>

      <div className="row">

        {/* BUSCADOR */}
        <div className="col-md-4">
          <div className="dashboard-card p-3 mb-4">
            <h5>Buscar paciente</h5>

            <Form.Control
              placeholder="Ingrese RUT del paciente"
              value={rutBusqueda}
              onChange={(e) => setRutBusqueda(e.target.value)}
            />

            <Button className="mt-3 w-100" onClick={buscarPaciente}>
              Buscar
            </Button>
          </div>

          {/* INFO PROFESIONAL */}
          <div className="dashboard-card p-3">
            <h6>Información profesional</h6>
            <p><strong>Institución:</strong> {profesional?.institucion}</p>
            <p><strong>Especialidad:</strong> {profesional?.especialidad}</p>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="col-md-8">

          {!paciente ? (
            <div className="dashboard-card p-4 text-center">
              <h5>Seleccione un paciente</h5>
              <p>Ingrese un RUT para comenzar</p>
            </div>
          ) : (
            <>
              {/* DATOS PACIENTE */}
              <div className="dashboard-card p-3 mb-4">
                <h5>Paciente</h5>

                <p><strong>Nombre:</strong> {paciente.nombres}</p>
                <p><strong>RUT:</strong> {paciente.numeroDocumento}</p>
                <p><strong>Alergias:</strong> {paciente.alergias}</p>
                <p><strong>Enfermedades:</strong> {paciente.enfermedadesCronicas}</p>
              </div>

              {/* EVOLUCIÓN */}
              <div className="dashboard-card p-3">
                <h5>Registrar evolución</h5>

                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escriba evolución clínica..."
                  value={evolucion}
                  onChange={(e) => setEvolucion(e.target.value)}
                />

                <Button className="mt-3" onClick={guardarEvolucion}>
                  Guardar evolución
                </Button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default DashboardProfesional;
