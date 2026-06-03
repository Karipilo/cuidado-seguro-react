import React from "react";
import { Badge, Form, Button } from "react-bootstrap";

const HeaderProfesional = ({
  profesional,
  rutBusqueda,
  setRutBusqueda,
  buscarPaciente
}) => {
  return (
    <div className="dashboard-header-profesional mb-4">

      <div>

        <h2 className="dashboard-main-title mb-3">
          Panel Clínico
        </h2>

        <h4 className="mb-1">
          {profesional?.userInfo?.nombreCompleto}
        </h4>

        <p className="mb-1">
          {profesional?.userInfo?.tipoUsuario}
        </p>

        <small className="text-light">
          Bienvenido al sistema clínico de Cuidado Seguro
        </small>

      </div>

      <div className="header-right-section">

        <Badge
          bg="info"
          className="dashboard-status-badge mb-3"
        >
          Profesional Activo
        </Badge>

        <div className="header-search-container">

          <Form.Control
            type="text"
            placeholder="Ingrese RUT del paciente..."
            value={rutBusqueda}
            onChange={(e) =>
              setRutBusqueda(e.target.value)
            }
            className="header-search-input"
          />

          <Button
            className="header-search-button"
            onClick={buscarPaciente}
          >
            Buscar
          </Button>

        </div>

        <div className="d-flex gap-2 mt-3">

          <Button
            variant="outline-light"
            size="sm"
          >
            Mi Perfil
          </Button>

          <Button
            variant="light"
            size="sm"
          >
            Editar Perfil
          </Button>

        </div>

      </div>

    </div>
  );
};

export default HeaderProfesional;