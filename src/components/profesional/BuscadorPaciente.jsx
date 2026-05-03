import React from "react";

import {
    Card,
    Form,
    Button
} from "react-bootstrap";

const BuscadorPaciente = ({
    rutBusqueda,
    setRutBusqueda,
    buscarPaciente
}) => {

    return (

        <Card className="dashboard-modern-card mb-4">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Buscar paciente

                </Card.Title>

                <div className="d-flex gap-2">

                    <Form.Control
                        placeholder="Ingrese RUT del paciente"
                        value={rutBusqueda}
                        onChange={(e) =>
                            setRutBusqueda(e.target.value)
                        }
                    />

                    <Button
                        className="btn-dashboard-primary"
                        onClick={buscarPaciente}
                    >

                        Buscar

                    </Button>

                </div>

            </Card.Body>

        </Card>

    );
};

export default BuscadorPaciente;