import React from "react";
import { Nav } from "react-bootstrap";
import { PersonBadge, People, ClipboardPulse, ChatDots, Activity, Capsule, FileEarmarkText } from "react-bootstrap-icons";

const Sidebar = ({ usuario, paciente }) => {

    const irASeccion = (id) => {

        const seccion =
            document.getElementById(id);

        if (seccion) {

            seccion.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (

        <div className="sidebar-container">

            <div className="sidebar-logo">

                <h3>
                    Panel clínico
                </h3>

            </div>

            <Nav className="flex-column sidebar-nav">

                {/* PERFIL */}

                <Nav.Link
                    onClick={() => irASeccion("perfil")}
                >

                    <PersonBadge />

                    <span>
                        Mi perfil
                    </span>

                </Nav.Link>

                {/* PROFESIONAL */}

                {usuario?.tipoUsuario === "PROFESIONAL"
                    && paciente && (

                        <>


                            {/* EVOLUCION */}

                            <Nav.Link
                                onClick={() =>
                                    irASeccion("evolucion")
                                }
                            >

                                <FileEarmarkText />

                                <span>
                                    Registrar Evolución
                                </span>

                            </Nav.Link>

                            {/* CONTROLES */}

                            <Nav.Link
                                onClick={() =>
                                    irASeccion("controles")
                                }
                            >

                                <Activity />

                                <span>
                                    Controles
                                </span>

                            </Nav.Link>

                            {/* MEDICAMENTOS */}

                            <Nav.Link
                                onClick={() =>
                                    irASeccion("medicamentos")
                                }
                            >

                                <Capsule />

                                <span>
                                    Medicamentos
                                </span>

                            </Nav.Link>

                            {/* HISTORIAL */}

                            <Nav.Link
                                onClick={() =>
                                    irASeccion("historial")
                                }
                            >

                                <FileEarmarkText />

                                <span>
                                    Historial Clínico
                                </span>

                            </Nav.Link>

                            {/* MENSAJES */}

                            <Nav.Link
                                onClick={() => irASeccion("mensajes")}
                            >

                                <ChatDots />

                                <span>
                                    Mensajes
                                </span>

                            </Nav.Link>

                        </>

                    )}



            </Nav>

        </div>

    );
};

export default Sidebar;
