import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const NosotrosValores = () => {

  const valores = [
    {
      titulo: "Compromiso",
      descripcion:
        "Nos enfocamos en mejorar la experiencia y bienestar de cada paciente."
    },
    {
      titulo: "Seguridad",
      descripcion:
        "Protegemos la información clínica siguiendo buenas prácticas y normativa vigente."
    },
    {
      titulo: "Humanización",
      descripcion:
        "Promovemos una atención cercana y centrada en las personas."
    }
  ];

  return (
    <div className="nosotros-section">

      <h2 className="mb-4">
        Nuestros valores
      </h2>

      <Row>

        {valores.map((valor, index) => (

          <Col md={4} key={index} className="mb-4">

            <Card className="valor-card h-100">

              <Card.Body>

                <Card.Title>
                  {valor.titulo}
                </Card.Title>

                <Card.Text>
                  {valor.descripcion}
                </Card.Text>

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>

    </div>
  );
};

export default NosotrosValores;