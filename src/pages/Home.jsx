import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imagenhome from "../images/imagenhome.png";
import corazon from "../images/corazon.png";
import equipo from "../images/equipo-medico.png";
import seguridad from "../images/security-shield_8631499.png";
const Home = () => {

  // hook para navegación entre páginas
  const navigate = useNavigate();

  return (
    <Container className="py-5">

      {/* sección principal del home */}
      <Row className="align-items-center">

        {/* columna izquierda */}
        <Col md={6}>

          {/* título principal */}
          <h1 className="fw-bold mb-4">
            Cuidado Seguro
          </h1>

          {/* descripción del sistema */}
          <p className="text-muted mb-4">
            Plataforma digital para la gestión de pacientes, facilitando la comunicación
            y coordinación entre pacientes, tutores y el equipo médico.
          </p>

          {/* características */}
          <div className="features-box">

            {/* item 1 */}
            <div className="feature-item">
              <img src={seguridad} alt="seguridad" className="icono-home" />
              <span>Atención segura y personalizada</span>
            </div>

            {/* item 2 */}
            <div className="feature-item">
              <img src={equipo} alt="equipo" className="icono-home" />
              <span>Equipo médico especializado</span>
            </div>

            {/* item 3 */}
            <div className="feature-item">
              <img src={corazon} alt="corazon" className="icono-home" />
              <span>Cuidado integral para cada paciente</span>
            </div>

          </div>

        </Col>

        {/* columna derecha */}
        <Col md={6} className="mt-5 mt-md-0">

          {/* contenedor visual de la imagen */}
          <div className="hero-imagen position-relative overflow-hidden">

            {/* imagen principal */}
            <img
              src={imagenhome}
              alt="equipo medico"
              className="img-fluid"
            />

            {/* tarjeta superior */}
            <div className="card-info card-top">
              <strong className="numero">+230</strong>
              <p className="texto-card">Pacientes institucionalizados</p>
            </div>

            <div className="card-info card-bottom">
              <strong className="titulo-card">Cuidado 24/7</strong>
              <p className="texto-card">Monitoreo y atención continua</p>
            </div>

          </div>

        </Col>

      </Row>

    </Container>
  );
};

export default Home;