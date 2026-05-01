import React, { useState } from "react";
import { Form } from "react-bootstrap";

const ContactoForm = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.asunto ||
      !formData.mensaje
    ) {
      alert("Complete todos los campos");
      return;
    }

    if (!validarEmail(formData.correo)) {
      alert("Ingrese un correo válido");
      return;
    }

    alert("Mensaje enviado correctamente");

    setFormData({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: ""
    });
  };

  return (
    <div className="contacto-formulario">

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">

          <Form.Label>
            Nombre
          </Form.Label>

          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

        </Form.Group>

        <Form.Group className="mb-3">

          <Form.Label>
            Correo
          </Form.Label>

          <Form.Control
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />

        </Form.Group>

        <Form.Group className="mb-3">

          <Form.Label>
            Asunto
          </Form.Label>

          <Form.Control
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
          />

        </Form.Group>

        <Form.Group className="mb-4">

          <Form.Label>
            Mensaje
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={5}
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />

        </Form.Group>

        <button
          type="submit"
          className="btn-contacto"
        >
          Enviar mensaje
        </button>

      </Form>

    </div>
  );
};

export default ContactoForm;
