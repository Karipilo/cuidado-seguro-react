import React from "react";

import {
    Card,
    Badge
} from "react-bootstrap";

const ResumenClinico = ({
    paciente
}) => {

    const resumen = [];

    paciente?.signosVitales?.forEach(
        (registro) => {

            resumen.push({

                tipo: "Signos Vitales",

                fecha: registro.fecha,

                profesional:
                    registro.profesional,

                detalle:
                    `
PA: ${registro.presion}
FC: ${registro.frecuencia}
Temp: ${registro.temperatura}
Sat: ${registro.saturacion}
                    `

            });
        }
    );

    paciente?.antropometria?.forEach(
        (registro) => {

            const imc =
                (
                    registro.peso /
                    (
                        registro.altura *
                        registro.altura
                    )
                ).toFixed(1);

            resumen.push({

                tipo: "Antropometría",

                fecha: registro.fecha,

                profesional:
                    registro.profesional,

                detalle:
                    `
Peso: ${registro.peso} kg
Altura: ${registro.altura} m
IMC: ${imc}
                    `

            });
        }
    );

    paciente?.evoluciones?.forEach(
        (registro) => {

            resumen.push({

                tipo: "Evolución",

                fecha: registro.fecha,

                profesional:
                    registro.profesional,

                detalle:
                    registro.evolucion

            });
        }
    );

    paciente?.indicaciones?.forEach(
        (registro) => {

            resumen.push({

                tipo: "Indicación",

                fecha: registro.fecha,

                profesional:
                    registro.profesional,

                detalle:
                    `
${registro.medicamento}
${registro.dosis}
${registro.frecuencia}
                    `

            });
        }
    );

    paciente?.examenes?.forEach(
        (registro) => {

            resumen.push({

                tipo: "Examen",

                fecha: registro.fecha,

                profesional:
                    registro.profesional,

                detalle:
                    `
${registro.examen}
Estado: ${registro.estado}
                    `

            });
        }
    );

    const resumenOrdenado =
        resumen.reverse();

    return (

        <Card className="dashboard-modern-card">

            <Card.Body>

                <Card.Title
                    className="dashboard-card-title"
                >

                    Resumen Clínico

                </Card.Title>

                {
                    resumenOrdenado.length > 0 ? (

                        resumenOrdenado.map(
                            (
                                item,
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
                                                    item.profesional
                                                }

                                            </strong>

                                            <p
                                                className="
                                                    text-muted
                                                    mb-0
                                                "
                                            >

                                                {
                                                    item.fecha
                                                }

                                            </p>

                                        </div>

                                        <Badge bg="primary">

                                            {
                                                item.tipo
                                            }

                                        </Badge>

                                    </div>

                                    <pre
                                        className="mb-0"
                                        style={{
                                            whiteSpace:
                                                "pre-wrap",
                                            fontFamily:
                                                "inherit"
                                        }}
                                    >

                                        {
                                            item.detalle
                                        }

                                    </pre>

                                </div>

                            )
                        )

                    ) : (

                        <p>

                            No existen registros clínicos.

                        </p>

                    )
                }

            </Card.Body>

        </Card>
    );
};

export default ResumenClinico;