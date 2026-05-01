import React from "react";
import { Container } from "react-bootstrap";

import NosotrosHero from "./NosotrosHero";
import NosotrosMision from "./NosotrosMision";
import NosotrosValores from "./NosotrosValores";

const NosotrosCard = () => {

  return (
    <Container className="nosotros-card">

      <NosotrosHero />

      <NosotrosMision />

      <NosotrosValores />

    </Container>
  );
};

export default NosotrosCard;