import React from "react";
import { Card } from "react-bootstrap";
import { Activity } from "react-bootstrap-icons";

const HistorialClinico = ({
    evoluciones = []
}) => {

    // Revisar qué datos llegan desde el backend
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

                    Últimos registros clínicos

                </Card.Title>

                {evoluciones?.length === 0 ? (

                    <p className="mb-0">

                        No existen evoluciones registradas

                    </p>

                ) : (

                    <div className="timeline-clinica">

                        {evoluciones?.map((ev, index) => (

                            <div
                                key={index}
                                className="timeline-item"
                            >

                                <div className="timeline-dot">

                                    <Activity />

                                </div>

                                <div className="timeline-content">

                                    <div className="timeline-header">

                                        <div>

                                            <h6 className="mb-1">

                                                Evolución Clínica

                                            </h6>

                                            <small className="text-muted">

                                                Registro médico

                                            </small>

                                        </div>

                                        <small className="text-muted">

                                            {ev.fecha}

                                        </small>

                                    </div>

                                    <p className="mb-0 mt-3">

                                        {ev.descripcion}

                                    </p>

                                    {
                                        ev.observaciones &&(
                                            <p className="mt-2 text-muted">
                                                <strong>Observaciones:</strong> {ev.observaciones} 
                                                
                                            </p>
                                        )
                                    }

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </Card.Body>

        </Card>

    );

};

export default HistorialClinico;