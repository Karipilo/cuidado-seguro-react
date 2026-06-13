import React from "react";

import { Card, Row, Col } from "react-bootstrap";

import {
  HeartPulse,
  Activity,
  ThermometerHalf,
  DropletHalf,
} from "react-bootstrap-icons";

const SignosVitales = ({ paciente }) => {
  const ultimoRegistro =
    paciente?.signosVitales?.[paciente.signosVitales.length - 1];

  return (
    <div className="signos-grid mb-4">
      <div className="signo-card presion-card">
        <div className="signo-icon">❤️</div>

        <div className="signo-info">
          <small>Presión arterial</small>

          <h3>{ultimoRegistro?.presion || "--"}</h3>
        </div>
      </div>

      <div className="signo-card frecuencia-card">
        <div className="signo-icon">🫀</div>

        <div className="signo-info">
          <small>Frecuencia cardíaca</small>

          <h3>
            {ultimoRegistro?.frecuencia
              ? `${ultimoRegistro.frecuencia} lpm`
              : "--"}
          </h3>
        </div>
      </div>

      <div className="signo-card temperatura-card">
        <div className="signo-icon">🌡️</div>

        <div className="signo-info">
          <small>Temperatura</small>
          <h3>
            {ultimoRegistro?.temperatura
              ? `${ultimoRegistro.temperatura} °C`
              : "--"}
          </h3>
        </div>
      </div>

      <div className="signo-card saturacion-card">
        <div className="signo-icon">🩸</div>

        <div className="signo-info">
          <small>Saturación O₂</small>

          <h3>
            {ultimoRegistro?.saturacion
              ? `${ultimoRegistro.saturacion}%`
              : "--"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SignosVitales;
