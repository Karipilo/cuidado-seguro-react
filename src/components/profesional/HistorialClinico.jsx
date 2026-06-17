import React from "react";
import { Card } from "react-bootstrap";
import { Activity } from "react-bootstrap-icons";

const HistorialClinico = ({
    evoluciones = []
}) => {

    console.log(
        "HISTORIAL CLÍNICO - EVOLUCIONES:",
        evoluciones
    );

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Resumen clínico reciente

                </Card.Title>

                {
                    evoluciones?.length === 0 ? (

                        <p className="mb-0 text-muted">

                            No existen registros clínicos disponibles

                        </p>

                    ) : (

                        <div className="timeline-clinica">

                            {
                                evoluciones.map((ev, index) => (

                                    <div
                                        key={ev.id || index}
                                        className="timeline-item"
                                    >

                                        <div className="timeline-dot">

                                            <Activity />

                                        </div>

                                        <div className="timeline-content">

                                            <h6 className="mb-2">

                                                Evolución clínica

                                            </h6>

                                            <p className="text-muted mb-2">

                                                {ev.fecha}

                                            </p>

                                            <p className="mb-0">

                                                {ev.descripcion}

                                            </p>

                                            {
                                                ev.observaciones && (

                                                    <p className="mt-2 text-muted">

                                                        <strong>
                                                            Observaciones:
                                                        </strong>{" "}
                                                        {ev.observaciones}

                                                    </p>

                                                )
                                            }

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </Card.Body>

        </Card>

    );

};

export default HistorialClinico;