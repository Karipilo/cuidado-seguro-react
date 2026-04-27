import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);

  // cargar sesión SIEMPRE
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
      setUsuario(sesion);
    }
  }, [location]);

  // ir al panel según rol
  const irAlPanel = () => {
    if (!usuario) return;

    if (usuario.tipoUsuario === "PACIENTE") {
      navigate("/dashboardPaciente");
    } else if (usuario.tipoUsuario === "TUTOR") {
      navigate("/dashboardTutor");
    } else {
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
      <Container>

        {/* IZQUIERDA */}
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Cuidado Seguro
        </Navbar.Brand>

        {/* CENTRO */}
        <Nav className="mx-auto">
          <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link>
          <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>
          <Nav.Link onClick={() => navigate("/nosotros")}>Sobre Nosotros</Nav.Link>
        </Nav>

        {/* DERECHA */}
        <Nav className="ms-auto align-items-center">

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

              <Button
                variant="danger"
                onClick={cerrarSesion}
              >
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