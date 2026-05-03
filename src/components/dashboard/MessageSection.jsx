import React, { useState } from "react";

import {
  Card,
  Form,
  Button,
  ListGroup,
  Badge
} from "react-bootstrap";

const MessageSection = () => {

  const [mensaje, setMensaje] = useState("");

  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      autor: "Centro Clínico",
      texto: "Recuerde asistir a su próximo control médico.",
      fecha: "Hoy"
    }
  ]);

  const enviarMensaje = () => {

    if (!mensaje.trim()) {
      alert("Ingrese un mensaje");
      return;
    }

    const nuevoMensaje = {
      id: Date.now(),
      autor: "Paciente",
      texto: mensaje,
      fecha: "Ahora"
    };

    setMensajes([
      nuevoMensaje,
      ...mensajes
    ]);

    setMensaje("");
  };

  return (
    <Card className="dashboard-modern-card mt-4">

      <Card.Body>

        <div className="message-header">

          <h5 className="dashboard-card-title mb-0">
            Mensajes
          </h5>

          <Badge bg="primary">
            {mensajes.length}
          </Badge>

        </div>

        <Form.Group className="mb-3 mt-4">

          <Form.Label>
            Nuevo mensaje
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escriba su mensaje..."
          />

        </Form.Group>

        <Button
          className="btn-enviar-mensaje"
          onClick={enviarMensaje}
        >
          Enviar mensaje
        </Button>

        <ListGroup className="mt-4">

          {mensajes.map((msg) => (

            <ListGroup.Item
              key={msg.id}
              className="message-item"
            >

              <div className="message-top">

                <strong>
                  {msg.autor}
                </strong>

                <small>
                  {msg.fecha}
                </small>

              </div>

              <p className="mb-0 mt-2">
                {msg.texto}
              </p>

            </ListGroup.Item>

          ))}

        </ListGroup>

      </Card.Body>

    </Card>
  );
};

export default MessageSection;