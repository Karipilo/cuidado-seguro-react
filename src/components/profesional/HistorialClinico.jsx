import React from "react";
import { Card } from "react-bootstrap";
import { Activity } from "react-bootstrap-icons";

const HistorialClinico = ({
    evoluciones
}) => {

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Últimos registros clínicos

                </Card.Title>

                {evoluciones.length === 0 ? (

                    <p className="mb-0">

                        No existen evoluciones registradas

                    </p>

                ) : (

                    <div className="timeline-clinica">

                        {evoluciones.map((ev, index) => (

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

                                                {ev.profesional}

                                            </h6>

                                            <small className="text-muted">

                                                {ev.profesion}

                                            </small>

                                        </div>

                                        <small className="text-muted">

                                            {ev.fecha}

                                        </small>

                                    </div>

                                    <p className="mb-0 mt-3">

                                        {ev.texto}

                                    </p>

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