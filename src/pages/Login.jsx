import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/ui/Formulario";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    console.log("Usuario guardado:", usuarioGuardado);
    console.log("Ingresado:", username, password);
    console.log("Tipo usuario:", usuarioGuardado.tipoUsuario);

    if (!usuarioGuardado) {
      setError("No existe un usuario registrado");
      return;
    }

    if (
      usuarioGuardado.username?.trim() === username.trim() &&
      usuarioGuardado.password === password
    ) {

      console.log("LOGIN CORRECTO");

      localStorage.setItem("sesion", JSON.stringify(usuarioGuardado));

      // redirección estable
      if (usuarioGuardado.tipoUsuario === "PACIENTE") {
        navigate("/dashboardPaciente", { replace: true });
      } else if (usuarioGuardado.tipoUsuario === "TUTOR") {
        navigate("/dashboardTutor", { replace: true });
      } else if (usuarioGuardado.tipoUsuario === "MEDICO") {
        navigate("/dashboardProfesional", { replace: true });
      }

    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
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
  );
};

export default Login;