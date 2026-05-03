import React from "react";

import {
    Card,
    Row,
    Col
} from "react-bootstrap";

import {
    HeartPulse,
    Activity,
    ThermometerHalf,
    DropletHalf
} from "react-bootstrap-icons";

const SignosVitales = ({
    paciente
}) => {

    const ultimoRegistro =

        paciente?.signosVitales?.[
        paciente.signosVitales.length - 1
        ];

    return (

    <div className="signos-grid mb-4">

        <div className="signo-card presion-card">

            <div className="signo-icon">

                ❤️

            </div>

            <div>

                <small>

                    Presión arterial

                </small>

                <h3>

                    {ultimoRegistro?.presion || "--"}

                </h3>

                <span>

                    mmHg

                </span>

            </div>

        </div>

        <div className="signo-card frecuencia-card">

            <div className="signo-icon">

                🫀

            </div>

            <div>

                <small>

                    Frecuencia cardíaca

                </small>

                <h3>

                    {ultimoRegistro?.frecuencia || "--"}

                </h3>

                <span>

                    lpm

                </span>

            </div>

        </div>

        <div className="signo-card temperatura-card">

            <div className="signo-icon">

                🌡️

            </div>

            <div>

                <small>

                    Temperatura

                </small>

                <h3>

                    {ultimoRegistro?.temperatura || "--"}

                </h3>

                <span>

                    °C

                </span>

            </div>

        </div>

        <div className="signo-card saturacion-card">

            <div className="signo-icon">

                🩸

            </div>

            <div>

                <small>

                    Saturación O₂

                </small>

                <h3>

                    {ultimoRegistro?.saturacion || "--"}

                </h3>

                <span>

                    %

                </span>

            </div>

        </div>

    </div>

);
};

export default SignosVitales;