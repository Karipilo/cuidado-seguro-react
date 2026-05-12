import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/ui/Formulario";
import "../styles/auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await fetch("http://localhost:8090/bff/auth/login", {

        method: "POST",

        credentials: "include", // IMPORTANTE PARA CORS

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      // ERROR LOGIN
      if (!response.ok) {

        if (response.status === 401) {
          setError("Usuario o contraseña incorrectos");

        } else if (response.status === 403) {
          setError("Acceso denegado");

        } else {
          setError("Error en el servidor");
        }

        return;
      }

      const data = await response.json();

      console.log("LOGIN OK:", data);

      // GUARDAR SESIÓN
      //localStorage.setItem("sesion", JSON.stringify(data));
      const sesionModificada = {
  ...data,
  userInfo: {
    ...data.userInfo,
    tipoUsuario: "PACIENTE"
  }
};

localStorage.setItem(
  "sesion",
  JSON.stringify(sesionModificada)
);

      // SI VIENE JWT
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      

      // REDIRECCIONES
      let tipo = "PACIENTE";
const tipo2 =
  data.userInfo?.tipoUsuario?.toUpperCase();

if (tipo2 === "PACIENTE") {

  navigate("/dashboardPaciente",{ replace: true });
  //navigate("/dashboardPacienteNormal",{ replace: true });

} else if (tipo2 === "PROFESIONAL") {

  navigate(
    "/dashboardPaciente",
    { replace: true }
  );

} else {

  navigate("/", { replace: true });

}    } catch (err) {

      console.error("ERROR LOGIN:", err);

      setError(
        "No fue posible conectar con el servidor. Verifique CORS o que el Gateway esté activo."
      );
    }
  };
  return (

    <div className="auth-container">

      <Formulario
        title="Iniciar Sesión"
        buttonText="Iniciar Sesión"
        onSubmit={handleLogin}
      >

        {/* CARD ERROR RESPONSIVA */}
        {error && (

          <Card
            className="mb-3 shadow-sm border-0"
            style={{
              width: "100%",
              backgroundColor: "#ffe5e5",
              borderRadius: "12px",
            }}
          >

            <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">

              <div>

                <Card.Title
                  style={{
                    color: "#b00020",
                    fontSize: "1rem",
                    marginBottom: "0.3rem",
                    fontWeight: "600",
                  }}
                >
                  Error de autenticación
                </Card.Title>

                <Card.Text
                  style={{
                    color: "#5c0000",
                    margin: 0,
                    fontSize: "0.95rem",
                  }}
                >
                  {error}
                </Card.Text>

              </div>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setError("")}
              >
                Cerrar
              </Button>

            </Card.Body>

          </Card>
        )}

        {/* USUARIO */}
        <Form.Group className="mb-3">

          <Form.Label>Usuario</Form.Label>

          <Form.Control
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </Form.Group>

        {/* PASSWORD */}
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