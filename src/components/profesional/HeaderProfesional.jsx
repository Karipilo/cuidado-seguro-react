import React from "react";
import { Badge } from "react-bootstrap";

const HeaderProfesional = ({ profesional }) => {

    return (

        <div className="dashboard-header-profesional mb-4">

            <div>

                <h2 className="dashboard-title mb-1">

                    Panel Clínico

                </h2>

                <p className="dashboard-subtitle mb-0">

                    {profesional?.nombres}
                    {" "}
                    {profesional?.apellidos}

                </p>

                <small className="text-muted">

                    {profesional?.profesion}
                    {" "}
                    -
                    {" "}
                    {profesional?.institucion}

                </small>

            </div>

            <Badge
                bg="info"
                className="dashboard-status-badge"
            >

                Profesional activo

            </Badge>

        </div>

    );
};

export default HeaderProfesional;