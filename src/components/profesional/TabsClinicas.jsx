import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const TabsClinicas = ({
  resumenComponent,
  signosVitalesComponent,
  evolucionComponent,
  historialComponent,
  indicacionesComponent,
}) => {

  const [activeTab, setActiveTab] = useState("resumen");

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      className="tabs-clinicas mb-4"
      id="tabs-clinicas"
    >

      <Tab eventKey="resumen" title="Resumen">
        <div className="mt-4">{resumenComponent}</div>
      </Tab>

      <Tab eventKey="signos" title="Signos Vitales">
        <div className="mt-4">{signosVitalesComponent}</div>
      </Tab>

      <Tab eventKey="evolucion" title="Evoluciones">
        <div className="mt-4">{evolucionComponent}</div>
      </Tab>

      <Tab eventKey="historial" title="Historial Clínico">
        <div className="mt-4">{historialComponent}</div>
      </Tab>

      <Tab eventKey="indicaciones" title="Indicaciones">
        <div className="mt-4">{indicacionesComponent}</div>
      </Tab>

    </Tabs>
  );
};

export default TabsClinicas;
