
import React from "react";

const ContactoInfo = () => {

  return (
    <div className="contacto-info">

      <h1>
        Contáctanos
      </h1>

      <p>
        En Cuidado Seguro estamos comprometidos
        con el bienestar, acompañamiento y
        continuidad del cuidado de nuestros pacientes.
      </p>

      <div className="contacto-datos">

        <div>
          <strong>Correo:</strong>
          <p>contacto@cuidadoseguro.cl</p>
        </div>

        <div>
          <strong>Teléfono:</strong>
          <p>+56 9 1234 5678</p>
        </div>

        <div>
          <strong>Dirección:</strong>
          <p>Villa Alemana, Chile</p>
        </div>

      </div>

    </div>
  );
};

export default ContactoInfo;
