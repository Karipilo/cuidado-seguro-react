import React from "react";

import {
    Card,
    Badge
} from "react-bootstrap";

const ExamenesClinicos = () => {

    const examenes = [

        {
            nombre: "Hemograma",
            fecha: "02-05-2026",
            estado: "Normal",
            color: "success"
        },

        {
            nombre: "Glicemia",
            fecha: "28-04-2026",
            estado: "Elevada",
            color: "danger"
        },

        {
            nombre: "Perfil Lipídico",
            fecha: "15-04-2026",
            estado: "Normal",
            color: "success"
        },

        {
            nombre: "Radiografía Torácica",
            fecha: "10-04-2026",
            estado: "Observación",
            color: "warning"
        }

    ];

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Exámenes Clínicos

                </Card.Title>

                <div className="examenes-lista">

                    {examenes.map((examen, index) => (

                        <div
                            key={index}
                            className="examen-item"
                        >

                            <div>

                                <h6 className="mb-1">

                                    {examen.nombre}

                                </h6>

                                <small className="text-muted">

                                    Fecha:
                                    {" "}
                                    {examen.fecha}

                                </small>

                            </div>

                            <Badge bg={examen.color}>

                                {examen.estado}

                            </Badge>

                        </div>

                    ))}

                </div>

            </Card.Body>

        </Card>

    );
};

export default ExamenesClinicos;