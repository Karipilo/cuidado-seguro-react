import React from "react";

import { PlusCircle, Activity, ClipboardPulse, FileEarmarkText, Rulers, FileMedical } from "react-bootstrap-icons";

const AccionesRapidas = ({ abrirFormularioSV }) => {

    return (

        <div className="acciones-rapidas-card">

            <h4 className="mb-4">

                Acciones

            </h4>

            <div className="accion-item">

                <div className="accion-icon blue">

                    <PlusCircle />

                </div>

                <div>

                    <h6>

                        Nuevo registro clínico

                    </h6>

                    <p>

                        Crear nuevo registro

                    </p>

                </div>

            </div>

            <div
                className="accion-item"
                onClick={abrirFormularioSV}
            >

                <div className="accion-icon green">

                    <Activity />

                </div>

                <div>

                    <h6>

                        Registrar signos vitales

                    </h6>

                    <p>

                        Agregar nuevo control

                    </p>

                </div>

            </div>

            <div className="accion-item">

                <div className="accion-icon yellow">

                    <ClipboardPulse />

                </div>

                <div>

                    <h6>

                        Nueva evolución

                    </h6>

                    <p>

                        Registrar evolución paciente

                    </p>

                </div>

            </div>

            <div className="accion-item">

                <div className="accion-icon orange">

                    <Rulers />

                </div>

                <div>

                    <h6>

                        Antropometría

                    </h6>

                    <p>

                        Registrar peso y talla

                    </p>

                </div>

            </div>

            <div className="accion-item">

                <div className="accion-icon red">

                    <FileMedical />

                </div>

                <div>

                    <h6>

                        Exámenes clínicos

                    </h6>

                    <p>

                        Revisar o agregar exámenes

                    </p>

                </div>

            </div>

            <div className="accion-item">

                <div className="accion-icon purple">

                    <FileEarmarkText />

                </div>

                <div>

                    <h6>

                        Indicaciones

                    </h6>

                    <p>

                        Ver o agregar indicaciones

                    </p>

                </div>

            </div>

        </div>

    );

};

export default AccionesRapidas;