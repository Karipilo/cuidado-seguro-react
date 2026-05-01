import React from "react";
import {Nav} from "react-bootstrap";
import {Person, People, ClipboardPulse, ChatDots} from "react-bootstrap-icons";

const Sidebar = ({ usuario }) => {

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

                    <Person />

                    <span>
                        Mi perfil
                    </span>

                </Nav.Link>

                {/* PROFESIONAL */}

                {usuario?.tipoUsuario === "PROFESIONAL" && (

                    <>

                        {/* BUSCAR PACIENTE */}

                        <Nav.Link
                            onClick={() =>
                                irASeccion("buscar-paciente")
                            }
                        >

                            <People />

                            <span>
                                Buscar Pacientes
                            </span>

                        </Nav.Link>

                        {/* EVOLUCION */}

                        <Nav.Link
                            onClick={() =>
                                irASeccion("evolucion")
                            }
                        >

                            <ClipboardPulse />

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

                            <ClipboardPulse />

                            <span>
                                Controles
                            </span>

                        </Nav.Link>

                    </>

                )}

                {/* MENSAJES */}

                <Nav.Link
                    onClick={() => irASeccion("mensajes")}
                >

                    <ChatDots />

                    <span>
                        Mensajes
                    </span>

                </Nav.Link>

            </Nav>

        </div>

    );
};

export default Sidebar;
