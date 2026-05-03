import React from "react";

import {
    Card,
    Table
} from "react-bootstrap";

const HistorialSignosVitales = ({
    paciente
}) => {

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Historial Signos Vitales

                </Card.Title>

                {
                    paciente?.signosVitales?.length > 0 ? (

                        <Table
                            responsive
                            hover
                        >

                            <thead>

                                <tr>

                                    <th>Fecha</th>

                                    <th>Presión</th>

                                    <th>Frecuencia</th>

                                    <th>Temperatura</th>

                                    <th>Saturación</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    paciente.signosVitales.map(
                                        (
                                            registro,
                                            index
                                        ) => (

                                            <tr key={index}>

                                                <td>

                                                    {registro.fecha}

                                                </td>

                                                <td>

                                                    {registro.presion}

                                                </td>

                                                <td>

                                                    {registro.frecuencia}

                                                </td>

                                                <td>

                                                    {registro.temperatura}

                                                </td>

                                                <td>

                                                    {registro.saturacion}

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </Table>

                    ) : (

                        <p>

                            No existen registros.

                        </p>

                    )
                }

            </Card.Body>

        </Card>
    );
};

export default HistorialSignosVitales;