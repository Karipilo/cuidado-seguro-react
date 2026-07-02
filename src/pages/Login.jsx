import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { setMemoryJSON } from "../utils/memoryStore";
import { request } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: { username, password },
      });

      setMemoryJSON("sesion", data);

      const tipo = data.userInfo?.tipoUsuario?.toUpperCase();

      if (tipo === "PACIENTE") {
        navigate("/dashboardPacienteNormal", { replace: true });
      } else if (tipo === "PROFESIONAL") {
        navigate("/dashboard-profesional", { replace: true });
      } else if (tipo === "TUTOR") {
        navigate("/dashboardTutor", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);

      if (err.message === "Failed to fetch") {
        setError(
          "No fue posible conectar con el servidor. Intente nuevamente más tarde.",
        );
      } else if (
        err.message?.includes("401") ||
        err.message?.toLowerCase().includes("credenciales")
      ) {
        setError("Usuario o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error inesperado. Intente nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="formulario-card">
        <h3>Iniciar Sesión</h3>
        <p className="subtitle">Ingrese sus credenciales para continuar</p>

        {error && (
          <div className="auth-alert error" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              isInvalid={!!error}
              disabled={cargando}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              isInvalid={!!error}
              disabled={cargando}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </Form>

        <p
          className="text-center mt-3 mb-0"
          style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
        >
          ¿No tiene una cuenta?{" "}
          <span
            style={{
              color: "var(--primary)",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => navigate("/registro")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/registro")}
            tabIndex={0}
            role="button"
          >
            Regístrese aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
