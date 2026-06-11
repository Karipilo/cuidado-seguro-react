import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/log.png";
import { getMemoryItem, removeMemoryItem } from "../../utils/memoryStore";

const NavbarComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {

    const sesion = getMemoryItem("sesion");
    if (sesion) {
      setUsuario(typeof sesion === "string" ? JSON.parse(sesion) : sesion);
    }

    setExpanded(false);

  }, [location]);

  const irAlPanel = () => {
    if (!usuario) return;
    const tipo = usuario.userInfo?.tipoUsuario?.toUpperCase();
    if (tipo === "PACIENTE") {
      navigate("/dashboardPacienteNormal");
    } else if (tipo === "TUTOR") {
      navigate("/dashboardTutor");
    } else if (tipo === "PROFESIONAL") {
      navigate("/dashboard-Profesional");
    }
  };

  const cerrarSesion = () => {
    ["sesion", "token", "accessToken", "refreshToken", "expiresIn"].forEach((k) => removeMemoryItem(k));
    setUsuario(null);
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar shadow-sm"
      expanded={expanded}
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand onClick={() => navigate("/")} className="brand">
          <img
            src={logo}
            alt="Cuidado Seguro"
            className="logo"
            width="40"
            height="40"
          />
          <span className="brand-text">Cuidado Seguro</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="main-navbar">

          {/* MENU CENTRO */}
          <Nav className="mx-auto nav-center">
            <Nav.Link
              onClick={() => navigate("/")}
              active={location.pathname === "/"}
              className="nav-link-custom"
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/contacto")}
              active={location.pathname === "/contacto"}
              className="nav-link-custom"
            >
              Contacto
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/nosotros")}
              active={location.pathname === "/nosotros"}
              className="nav-link-custom"
            >
              Nosotros
            </Nav.Link>
          </Nav>

          {/* DERECHA */}
          <Nav className="ms-auto nav-right">

            {usuario ? (
              <>
                <span
                  className="user-greeting d-none d-sm-inline"
                  aria-label={`Usuario: ${usuario.userInfo?.nombreCompleto || "Usuario"}`}
                >
                  Hola, {usuario.userInfo?.nombreCompleto}
                </span>

                <Button
                  className="btn-panel"
                  onClick={irAlPanel}
                  aria-label="Ir a mi panel"
                >
                  Mi Panel
                </Button>

                <Button
                  className="btn-logout"
                  onClick={cerrarSesion}
                  aria-label="Cerrar sesión"
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </Button>

                <Button
                  variant="primary"
                  onClick={() => navigate("/registro")}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
