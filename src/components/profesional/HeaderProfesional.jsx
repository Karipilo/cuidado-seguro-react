import React from "react";
import { Badge, Form, Button } from "react-bootstrap";

const HeaderProfesional = ({ profesional, rutBusqueda, setRutBusqueda, buscarPaciente }) => {

    return (

        <div className="dashboard-header-profesional mb-4">

            <div>

                <h2 className="dashboard-main-title mb-3">

                    Panel Clínico

                </h2>

                <h4 className="mb-1">

                    {profesional?.nombres}
                    {" "}
                    {profesional?.apellidos}

                </h4>

                <p className="mb-0">

                    {profesional?.profesion}

                </p>

            </div>

            <div className="header-right-section">

                <Badge
                    bg="info"
                    className="dashboard-status-badge"
                >

                    Profesional activo

                </Badge>

                <div className="header-search-container">

                    <Form.Control
                        type="text"
                        placeholder="Buscar paciente por RUT..."
                        value={rutBusqueda}
                        onChange={(e) =>
                            setRutBusqueda(e.target.value)
                        }
                        className="header-search-input"
                    />

                    <Button
                        className="header-search-button"
                        onClick={buscarPaciente}
                    >

                        Buscar

                    </Button>

                </div>

            </div>
        </div>

    );
};

export default HeaderProfesional;