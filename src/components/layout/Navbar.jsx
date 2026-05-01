import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../images/log.png";

const NavbarComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState(null);

  // cargar sesión 
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
    <Navbar expand="lg" className="custom-navbar shadow-sm">
      <Container>

        {/* LOGO */}
        <Navbar.Brand onClick={() => navigate("/")} className="brand">
          <img src={logo} alt="logo" className="logo" />
          <span className="brand-text">Cuidado Seguro</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* MENU CENTRO */}
          <Nav className="mx-auto nav-center">
            <Nav.Link onClick={() => navigate("/")}>
              Inicio
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/contacto")}>
              Contacto
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/nosotros")}>
              Nosotros
            </Nav.Link>
          </Nav>

          {/* DERECHA */}
          <Nav className="ms-auto nav-right">

            {usuario ? (
              <>
                <span className="user-text">
                  Hola, {usuario.nombres || usuario.username}
                </span>

                <Button className="btn-panel" onClick={irAlPanel}>
                  Mi Panel
                </Button>

                <Button className="btn-logout" onClick={cerrarSesion}>
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