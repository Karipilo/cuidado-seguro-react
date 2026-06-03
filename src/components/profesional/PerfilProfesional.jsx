import { Card, Badge, Button } from "react-bootstrap";

const PerfilProfesional = ({ profesional }) => {
  console.log(
    "USERINFO COMPLETO:",
    JSON.stringify(profesional?.userInfo, null, 2),
  );
  return (
    <Card className="dashboard-modern-card">
      <Card.Body className="text-center">
        <h5 className="mb-3">{profesional?.userInfo?.nombreCompleto}</h5>

        <div className="mb-3">
          <span className="badge bg-success">Profesional Activo</span>
        </div>

        <hr />

        <p>
          <strong>Profesión:</strong>

          <br />

          {profesional?.userInfo?.profesion}
        </p>

        <p>
          <strong>Correo:</strong>

          <br />

          {profesional?.userInfo?.email}
        </p>

        <p>
          <strong>Usuario:</strong>

          <br />

          {profesional?.userInfo?.username}
        </p>

        
      </Card.Body>
    </Card>
  );
};

export default PerfilProfesional;
