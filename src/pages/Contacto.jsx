import React from "react";
import ContactoCard from "../components/contacto/ContactoCard";
import "../styles/contacto.css";

const Contacto = () => {

  return (
    <div className="contacto-container">

      <div className="contacto-overlay">

        <ContactoCard />

      </div>

    </div>
  );
};

export default Contacto;

