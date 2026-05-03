import React from "react";

import {
    Tabs,
    Tab
} from "react-bootstrap";

const TabsClinicas = ({
    evolucionComponent,
    historialComponent
}) => {

    return (

        <Tabs
            defaultActiveKey="evolucion"
            className="mb-4"
        >

            <Tab
                eventKey="evolucion"
                title="Evolución"
            >

                <div className="mt-4">

                    {evolucionComponent}

                </div>

            </Tab>

            <Tab
                eventKey="historial"
                title="Historial clínico"
            >

                <div className="mt-4">

                    {historialComponent}

                </div>

            </Tab>

        </Tabs>

    );
};

export default TabsClinicas;