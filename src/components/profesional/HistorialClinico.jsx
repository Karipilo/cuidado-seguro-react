import React from "react";

import {
    Card
} from "react-bootstrap";

const HistorialClinico = ({
    evoluciones
}) => {

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Historial de evoluciones

                </Card.Title>

                {evoluciones.length === 0 ? (

                    <p className="mb-0">

                        No existen evoluciones registradas

                    </p>

                ) : (

                    evoluciones.map((ev, index) => (

                        <div
                            key={index}
                            className="evolucion-item mb-4"
                        >

                            <div className="d-flex justify-content-between align-items-center mb-2">

                                <strong>

                                    {ev.profesional}

                                </strong>

                                <small className="text-muted">

                                    {ev.fecha}

                                </small>

                            </div>

                            <p className="mb-0">

                                {ev.texto}

                            </p>

                            {index !== evoluciones.length - 1 && (

                                <hr />

                            )}

                        </div>

                    ))

                )}

            </Card.Body>

        </Card>

    );
};

export default HistorialClinico;