import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/ui/Formulario";
import "../styles/auth.css";


const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioGuardado = usuarios.find(
      (u) =>
        u.username?.trim() === username.trim() &&
        u.password === password
    );

    console.log("Usuario guardado:", usuarioGuardado);

    if (!usuarioGuardado) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    console.log("LOGIN CORRECTO");

    localStorage.setItem("sesion", JSON.stringify(usuarioGuardado));

    const tipo = usuarioGuardado.tipoUsuario?.toUpperCase();

    if (tipo === "PACIENTE") {
      navigate("/dashboardPaciente", { replace: true });
    } else if (tipo === "TUTOR") {
      navigate("/dashboardTutor", { replace: true });
    } else if (tipo === "PROFESIONAL") {
      navigate("/dashboardProfesional", { replace: true });
    }
  };

  return (
    <div className="auth-container">

      <Formulario
        title="Iniciar Sesión"
        buttonText="Iniciar Sesión"
        onSubmit={handleLogin}
      >

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

      </Formulario>

    </div>
  );
};

export default Login;