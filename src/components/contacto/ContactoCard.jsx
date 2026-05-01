import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import ContactoInfo from "./ContactoInfo";
import ContactoForm from "./ContactoForm";

const ContactoCard = () => {

  return (
    <Container fluid>

      <Row className="contacto-card">

        <Col lg={5} className="p-0">
          <ContactoInfo />
        </Col>

        <Col lg={7} className="p-0">
          <ContactoForm />
        </Col>

      </Row>

    </Container>
  );
};

export default ContactoCard;
