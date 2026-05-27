import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Heart, ShieldCheck, Hospital } from "react-bootstrap-icons";
import imagenhome from "../images/imagenhome.png";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShieldCheck,
      label: "Atención segura y personalizada",
      color: "var(--primary)",
    },
    {
      icon: Hospital,
      label: "Equipo médico especializado",
      color: "var(--success)",
    },
    {
      icon: Heart,
      label: "Cuidado integral para cada paciente",
      color: "var(--secondary)",
    },
  ];

  return (
    <main>
      <section className="hero-section" aria-label="Inicio — Cuidado Seguro">
        <Container>
          <Row className="align-items-center g-5">

            {/* Columna izquierda */}
            <Col md={6}>
              <div className="hero-text">

                <span className="hero-badge">Plataforma de salud digital</span>

                <h1 className="hero-title">
                  Cuidado <span className="text-highlight">Seguro</span>
                </h1>

                <p className="hero-subtitle">
                  Gestiona de forma segura la salud de tus pacientes.
                  La plataforma conecta a pacientes, tutores y profesionales
                  en un solo lugar, mejorando la comunicación y el seguimiento clínico.
                </p>

                <div className="hero-actions">
                  <button
                    className="btn btn-primary-custom btn-lg-custom"
                    onClick={() => navigate("/registro")}
                  >
                    Comenzar ahora
                  </button>
                  <button
                    className="btn btn-ghost-custom btn-lg-custom"
                    onClick={() => navigate("/nosotros")}
                  >
                    Conocer más
                  </button>
                </div>

                {/* Features */}
                <div className="features-label">Características</div>
                <div className="features-box">
                  {features.map(({ icon: ICON, label, color }, i) => (
                    <div className="feature-item" key={i}>
                      <span
                        className="feature-icon"
                        style={{ color, background: `${color}15` }}
                      >
                        <ICON size={20} />
                      </span>
                      <span className="feature-text">{label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </Col>

            {/* Columna derecha */}
            <Col md={6} className="mt-5 mt-md-0">
              <div className="hero-imagen position-relative overflow-hidden rounded-4">
                <img
                  src={imagenhome}
                  alt="Equipo médico"
                  className="img-fluid"
                />

                {/* Floating card — top */}
                <div className="card-info card-top">
                  <strong className="numero">+500</strong>
                  <p className="texto-card">Pacientes registrados</p>
                </div>

                {/* Floating card — bottom */}
                <div className="card-info card-bottom">
                  <strong className="titulo-card">24 / 7</strong>
                  <p className="texto-card">Monitoreo continuo</p>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Home;
