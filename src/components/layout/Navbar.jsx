import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../images/log.png";

const NavbarComponent = () => {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // cargar sesión
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion) {
      setUsuario(sesion);
    }
  }, []);

  // cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("sesion");
    setUsuario(null);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>

        {/* logo + nombre */}
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            width="30"
            className="me-2"
          />
          Cuidado Seguro
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* CENTRO */}
          <Nav className="mx-auto">
            <Nav.Link onClick={() => navigate("/")}>Inicio</Nav.Link>
            <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>
            <Nav.Link onClick={() => navigate("/nosotros")}>Sobre Nosotros</Nav.Link>
          </Nav>

          {/* DERECHA */}
          <Nav>

            {usuario ? (
              <>
                {/* nombre usuario */}
                <Nav.Link disabled>
                  Hola, {usuario.username}
                </Nav.Link>

                <Button
                  variant="outline-success"
                  className="me-2"
                  onClick={() => {
                    if (usuario.tipoUsuario === "PACIENTE") {
                      navigate("/dashboardPaciente");
                    } else if (usuario.tipoUsuario === "TUTOR") {
                      navigate("/dashboardTutor");
                    } else if (usuario.tipoUsuario === "MEDICO") {
                      navigate("/dashboardProfesional");
                    }
                  }}
                >
                  Mi Panel
                </Button>
                {/* cerrar sesión */}
                <Button
                  variant="outline-danger"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigate("/login")}
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
            )}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;