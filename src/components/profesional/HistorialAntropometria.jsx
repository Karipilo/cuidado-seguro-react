import React from "react";

import {
    Card,
    Table,
    Badge
} from "react-bootstrap";

const HistorialAntropometria = ({
    paciente
}) => {

    const obtenerEstadoIMC = (imc) => {

        if (imc < 18.5) {

            return {
                texto: "Bajo peso",
                color: "warning"
            };
        }

        if (imc < 25) {

            return {
                texto: "Normal",
                color: "success"
            };
        }

        if (imc < 30) {

            return {
                texto: "Sobrepeso",
                color: "warning"
            };
        }

        return {
            texto: "Obesidad",
            color: "danger"
        };
    };

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Historial Antropométrico

                </Card.Title>

                {
                    paciente?.antropometria?.length > 0 ? (

                        <Table
                            responsive
                            hover
                        >

                            <thead>

                                <tr>

                                    <th>Fecha</th>

                                    <th>Peso</th>

                                    <th>Altura</th>

                                    <th>IMC</th>

                                    <th>Estado</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    paciente.antropometria.map(
                                        (
                                            registro,
                                            index
                                        ) => {

                                            const imc =
                                                (
                                                    registro.peso /
                                                    (
                                                        registro.altura *
                                                        registro.altura
                                                    )
                                                ).toFixed(1);

                                            const estado =
                                                obtenerEstadoIMC(imc);

                                            return (

                                                <tr key={index}>

                                                    <td>

                                                        {registro.fecha}

                                                    </td>

                                                    <td>

                                                        {registro.peso} kg

                                                    </td>

                                                    <td>

                                                        {registro.altura} m

                                                    </td>

                                                    <td>

                                                        {imc}

                                                    </td>

                                                    <td>

                                                        <Badge
                                                            bg={estado.color}
                                                        >

                                                            {estado.texto}

                                                        </Badge>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                }

                            </tbody>

                        </Table>

                    ) : (

                        <p>

                            No existen registros antropométricos.

                        </p>

                    )
                }

            </Card.Body>

        </Card>
    );
};

export default HistorialAntropometria;