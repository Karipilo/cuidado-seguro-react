import React from "react";

import { Card, Table, Badge } from "react-bootstrap";

const HistorialAntropometria = ({ paciente }) => {
  console.log("PACIENTE:", paciente);
  console.log("ANTROPOMETRIA:", paciente?.antropometria);

  const obtenerEstadoIMC = (imc) => {
    if (imc < 18.5) {
      return {
        texto: "Bajo peso",
        color: "warning",
      };
    }

    if (imc < 25) {
      return {
        texto: "Normal",
        color: "success",
      };
    }

    if (imc < 30) {
      return {
        texto: "Sobrepeso",
        color: "warning",
      };
    }

    return {
      texto: "Obesidad",
      color: "danger",
    };
  };

  const registros = [...(paciente?.antropometria || [])].sort(
    (a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro),
  );

  return (
    <Card className="dashboard-modern-card mt-4">
      <Card.Body>
        <Card.Title className="dashboard-card-title">
          Historial Antropométrico
        </Card.Title>

        {registros.length > 0 ? (
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Fecha</th>

                <th>Hora</th>

                <th>Peso</th>

                <th>Altura</th>

                <th>IMC</th>

                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((registro, index) => {
                const imc = (
                  registro.peso /
                  (registro.altura * registro.altura)
                ).toFixed(1);

                const estado = obtenerEstadoIMC(Number(imc));

                const fechaCompleta = new Date(registro.fechaRegistro);

                const fecha = fechaCompleta.toLocaleDateString("es-CL");

                const hora = fechaCompleta.toLocaleTimeString("es-CL", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={index}>
                    <td>{fecha}</td>

                    <td>{hora}</td>

                    <td>{registro.peso} kg</td>

                    <td>{registro.altura} m</td>

                    <td>{imc}</td>

                    <td>
                      <Badge bg={estado.color}>{estado.texto}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted mb-0">
            No existen registros antropométricos.
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialAntropometria;
