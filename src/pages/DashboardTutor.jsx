import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { usuarios } from "../data/usuarios";

const DashboardTutor = () => {

  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {

  const sesion = JSON.parse(localStorage.getItem("sesion"));

  if (!sesion) {
    navigate("/login");
    return;
  }

  setTutor(sesion);

  // buscar pacientes asociados
  if (sesion.pacientesRuts && sesion.pacientesRuts.length > 0) {

    const pacientesAsociados = usuarios.filter(
      (u) =>
        u.tipoUsuario === "PACIENTE" &&
        sesion.pacientesRuts.includes(u.numeroDocumento)
    );

    setPacientes(pacientesAsociados);
  }

}, []);

  return (
    <div className="container mt-4">

      <h1>Dashboard Tutor</h1>

      <p>Bienvenido {tutor?.nombres || tutor?.username}</p>

      <hr />

      <h3>Pacientes asociados</h3>

      {pacientes.length === 0 ? (
        <p>No tiene pacientes asociados</p>
      ) : (
        pacientes.map((p, index) => (
          <Card key={index} className="mb-3 p-3">
            <h5>{p.nombres} {p.apellidos}</h5>
            <p><strong>RUT:</strong> {p.numeroDocumento}</p>
          </Card>
        ))
      )}

    </div>
  );
};

export default DashboardTutor;