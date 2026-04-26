import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../images/log.png";

const NavbarCustom = () => {

  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container className="d-flex align-items-center justify-content-between">

        {/* IZQUIERDA: logo + nombre */}
        <div 
          className="d-flex align-items-center gap-2"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo" className="logo-navbar" />
          <span className="navbar-brand-custom">Cuidado Seguro</span>
        </div>

        {/* CENTRO */}
        <Nav className="mx-auto d-flex flex-row gap-4">
          <Nav.Link onClick={() => navigate("/contacto")}>
            Contacto
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/nosotros")}>
            Sobre nosotros
          </Nav.Link>
        </Nav>

        {/* DERECHA */}
        <Nav className="d-flex flex-row gap-3">
          <Nav.Link onClick={() => navigate("/login")}>
            Login
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/registro")}>
            Registro
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavbarCustom;