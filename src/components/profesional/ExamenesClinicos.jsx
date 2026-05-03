import React from "react";

import {
    Card,
    Badge
} from "react-bootstrap";

const ExamenesClinicos = ({
    paciente
}) => {

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Exámenes Clínicos

                </Card.Title>

                <div className="examenes-lista">

                    {
                        paciente?.examenes?.length > 0 ? (

                            paciente.examenes
                                .slice()
                                .reverse()
                                .map(
                                    (
                                        examen,
                                        index
                                    ) => {

                                        const obtenerColor = () => {

                                            if (
                                                examen.estado ===
                                                "Completado"
                                            ) {

                                                return "success";
                                            }

                                            if (
                                                examen.estado ===
                                                "En proceso"
                                            ) {

                                                return "warning";
                                            }

                                            return "secondary";
                                        };

                                        return (

                                            <div
                                                key={index}
                                                className="examen-item"
                                            >

                                                <div>

                                                    <h6 className="mb-1">

                                                        {
                                                            examen.examen
                                                        }

                                                    </h6>

                                                    <small className="text-muted d-block">

                                                        Fecha:
                                                        {" "}
                                                        {
                                                            examen.fecha
                                                        }

                                                    </small>

                                                    <small className="text-muted d-block">

                                                        Profesional:
                                                        {" "}
                                                        {
                                                            examen.profesional
                                                        }

                                                    </small>

                                                    {
                                                        examen.resultado && (

                                                            <small className="text-muted d-block">

                                                                Resultado:
                                                                {" "}
                                                                {
                                                                    examen.resultado
                                                                }

                                                            </small>

                                                        )
                                                    }

                                                    {
                                                        examen.observaciones && (

                                                            <small className="text-muted d-block">

                                                                Observaciones:
                                                                {" "}
                                                                {
                                                                    examen.observaciones
                                                                }

                                                            </small>

                                                        )
                                                    }

                                                </div>

                                                <Badge
                                                    bg={obtenerColor()}
                                                >

                                                    {
                                                        examen.estado
                                                    }

                                                </Badge>

                                            </div>

                                        );
                                    }
                                )

                        ) : (

                            <p>

                                No existen exámenes registrados.

                            </p>

                        )
                    }

                </div>

            </Card.Body>

        </Card>

    );
};

export default ExamenesClinicos;