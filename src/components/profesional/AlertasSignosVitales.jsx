import React from "react";
import { Alert, Card } from "react-bootstrap";

const AlertasSignosVitales = ({
  paciente,
}) => {

  const ultimoRegistro =
    paciente?.signosVitales?.[
      paciente.signosVitales.length - 1
    ];

  if (!ultimoRegistro) {
    return null;
  }

  const alertas = [];

  return (

    <Card className="dashboard-modern-card mt-4">

      <Card.Body>

        <Card.Title
          className="dashboard-card-title"
        >
          Alertas Clínicas
        </Card.Title>

        {
          alertas.length === 0 ? (

            <Alert variant="success">

              Todos los signos vitales se
              encuentran dentro de rango.

            </Alert>

          ) : (

            alertas.map(
              (
                alerta,
                index
              ) => (

                <Alert
                  key={index}
                  variant={alerta.tipo}
                >
                  {alerta.mensaje}
                </Alert>

              )
            )

          )
        }

      </Card.Body>

    </Card>

  );
};

export default AlertasSignosVitales;