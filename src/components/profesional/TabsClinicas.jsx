import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const TabsClinicas = ({
  resumenComponent,
  fichaClinicaComponent,
  antropometriaComponent,
  signosVitalesComponent,
  examenesClinicosComponent,
  evolucionComponent,
  indicacionesComponent,
  medicamentosComponent,
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

      <Tab eventKey="ficha" title="Ficha Clínica">
        <div className="mt-4">{fichaClinicaComponent}</div>
      </Tab>

      <Tab eventKey="antropometria" title="Antropometría">
        <div className="mt-4">{antropometriaComponent}</div>
      </Tab>

      <Tab eventKey="signos" title="Signos Vitales">
        <div className="mt-4">{signosVitalesComponent}</div>
      </Tab>

      <Tab eventKey="examenes" title="Exámenes Clínicos">
        <div className="mt-4">{examenesClinicosComponent}</div>
      </Tab>

      <Tab eventKey="evolucion" title="Evoluciones">
        <div className="mt-4">{evolucionComponent}</div>
      </Tab>

      <Tab eventKey="indicaciones" title="Indicaciones">
        <div className="mt-4">{indicacionesComponent}</div>
      </Tab>

      <Tab eventKey="medicamentos" title="Medicamentos">
        <div className="mt-4">{medicamentosComponent}</div>
      </Tab>
    </Tabs>
  );
};

export default TabsClinicas;
