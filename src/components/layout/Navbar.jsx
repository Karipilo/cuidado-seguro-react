import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../images/log.png"; // 👈 IMPORTANTE (ajusta ruta si cambia)

const NavbarComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);

  // cargar sesión
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    setUsuario(sesion);
  }, [location]);

  // ir al dashboard según rol
  const irAlPanel = () => {
    if (!usuario) return;

    if (usuario.tipoUsuario === "PACIENTE") {
      navigate("/dashboardPaciente");
    } else if (usuario.tipoUsuario === "TUTOR") {
      navigate("/dashboardTutor");
    } else if (usuario.tipoUsuario === "PROFESIONAL") {
      navigate("/dashboardProfesional");
    }
  };

  // cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("sesion");
    setUsuario(null);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">

        {/* IZQUIERDA: LOGO + NOMBRE */}
        <Navbar.Brand
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
          onClick={() => {
            if (usuario) {
              irAlPanel();
            } else {
              navigate("/");
            }
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "30px", height: "30px" }}
          />
          Cuidado Seguro
        </Navbar.Brand>

        {/* CENTRO: MENÚ */}
        <Nav className="mx-auto">
          <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link>
          <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>
          <Nav.Link onClick={() => navigate("/nosotros")}>Sobre Nosotros</Nav.Link>
        </Nav>

        {/* DERECHA: USUARIO */}
        <Nav className="align-items-center">

          {!usuario ? (
            <>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/login")}
                className="me-2"
              >
                Login
              </Button>

              <Button
                variant="primary"
                onClick={() => navigate("/registro")}
              >
                Registro
              </Button>
            </>
          ) : (
            <>
              <span className="me-3">
                Hola, {usuario.nombres || usuario.username}
              </span>

              {!location.pathname.includes("dashboard") && (
                <Button
                  variant="success"
                  onClick={irAlPanel}
                  className="me-2"
                >
                  Mi Panel
                </Button>
              )}

              <Button variant="danger" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </>
          )}

        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavbarComponent;