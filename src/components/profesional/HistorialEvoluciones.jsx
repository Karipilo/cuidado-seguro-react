import React from "react";

import {
    Card,
    Badge
} from "react-bootstrap";

const HistorialEvoluciones = ({
    paciente
}) => {

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Evoluciones Clínicas

                </Card.Title>

                {
                    paciente?.evoluciones?.length > 0 ? (

                        paciente.evoluciones
                            .slice()
                            .reverse()
                            .map(
                                (
                                    evolucion,
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
                                                        evolucion.profesional
                                                    }

                                                </strong>

                                                <p
                                                    className="
                                                        text-muted
                                                        mb-0
                                                    "
                                                >

                                                    {
                                                        evolucion.fecha
                                                    }

                                                </p>

                                            </div>

                                            <Badge bg="primary">

                                                {
                                                    evolucion.estado
                                                }

                                            </Badge>

                                        </div>

                                        <h6>

                                            Evolución

                                        </h6>

                                        <p>

                                            {
                                                evolucion.evolucion
                                            }

                                        </p>

                                        {
                                            evolucion.observaciones && (

                                                <>

                                                    <h6>

                                                        Observaciones

                                                    </h6>

                                                    <p>

                                                        {
                                                            evolucion.observaciones
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

                            No existen evoluciones registradas.

                        </p>

                    )
                }

            </Card.Body>

        </Card>
    );
};

export default HistorialEvoluciones;