import React from "react";

import {
    Card,
    Badge
} from "react-bootstrap";

const HistorialIndicaciones = ({
    paciente
}) => {

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Indicaciones Médicas

                </Card.Title>

                {
                    paciente?.indicaciones?.length > 0 ? (

                        paciente.indicaciones
                            .slice()
                            .reverse()
                            .map(
                                (
                                    indicacion,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="
                                            border
                                            rounded-4
                                            p-3
                                            mb-3
                                        "
                                    >

                                        <div
                                            className="
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                                mb-2
                                            "
                                        >

                                            <div>

                                                <strong>

                                                    {
                                                        indicacion.profesional
                                                    }

                                                </strong>

                                                <p
                                                    className="
                                                        text-muted
                                                        mb-0
                                                    "
                                                >

                                                    {
                                                        indicacion.fecha
                                                    }

                                                </p>

                                            </div>

                                            <Badge bg="success">

                                                Indicaciones

                                            </Badge>

                                        </div>

                                        <h6>

                                            Medicamento

                                        </h6>

                                        <p>

                                            {
                                                indicacion.medicamento
                                            }

                                        </p>

                                        <h6>

                                            Dosis

                                        </h6>

                                        <p>

                                            {
                                                indicacion.dosis
                                            }

                                        </p>

                                        <h6>

                                            Frecuencia

                                        </h6>

                                        <p>

                                            {
                                                indicacion.frecuencia
                                            }

                                        </p>

                                        <h6>

                                            Duración

                                        </h6>

                                        <p>

                                            {
                                                indicacion.duracion
                                            }

                                        </p>

                                        {
                                            indicacion.observaciones && (

                                                <>

                                                    <h6>

                                                        Observaciones

                                                    </h6>

                                                    <p>

                                                        {
                                                            indicacion.observaciones
                                                        }

                                                    </p>

                                                </>

                                            )
                                        }

                                    </div>

                                )
                            )

                    ) : (

                        <p>

                            No existen indicaciones registradas.

                        </p>

                    )
                }

            </Card.Body>

        </Card>
    );
};

export default HistorialIndicaciones;