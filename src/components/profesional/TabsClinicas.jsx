import React from "react";

import {
    Tabs,
    Tab
} from "react-bootstrap";

const TabsClinicas = ({
    resumenComponent,
    signosVitalesComponent,
    evolucionComponent,
    historialComponent,
    indicacionesComponent
}) => {

    return (

        <div className="tabs-clinicas-container">

            <Tabs
                defaultActiveKey="resumen"
                className="tabs-clinicas mb-4"
            >

                <Tab
                    eventKey="resumen"
                    title="Resumen"
                >

                    <div className="mt-4">

                        {resumenComponent}

                    </div>

                </Tab>

                <Tab
                    eventKey="historial"
                    title="Historial Clínico"

                >


                    <div className="mt-4">

                        {historialComponent}

                    </div>

                </Tab>

                <Tab
                    eventKey="signos"
                    title="Signos Vitales"
                >

                    <div className="mt-4">

                        {signosVitalesComponent}

                    </div>

                </Tab>

                <Tab
                    eventKey="evolucion"
                    title="Evoluciones"
                >

                    <div className="mt-4">

                        {evolucionComponent}

                    </div>

                </Tab>

                <Tab
                    eventKey="indicaciones"
                    title="Indicaciones"
                >

                    <div className="mt-4">

                        {indicacionesComponent}

                    </div>

                </Tab>

            </Tabs>

        </div>

    );
};

export default TabsClinicas;