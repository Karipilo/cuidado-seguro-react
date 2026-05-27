import React from 'react';
import Card from '../ui/Card';

const PatientInfo = ({ patientData }) => {

  if (!patientData) {
    return (
      <Card title="Información del Paciente">
        <p className="text-muted">No hay información del paciente disponible.</p>
      </Card>
    );
  }

  return (
    <div>
      <Card title="Información del Paciente" className="mb-4">
        <p><strong>Nombre:</strong> {patientData.nombres} {patientData.apellidos}</p>
        <p><strong>RUT:</strong> {patientData.numeroDocumento}</p>
        <p><strong>Grupo sanguíneo:</strong> {patientData.grupoSanguineo}</p>
        <p><strong>Factor RH:</strong> {patientData.factorRh}</p>
        <p><strong>Alergias:</strong> {patientData.alergias}</p>
        <p><strong>Enfermedades crónicas:</strong> {patientData.enfermedadesCronicas}</p>
        <p><strong>Medicamentos actuales:</strong> {patientData.medicamentosActuales}</p>
      </Card>
    </div>
  );
};

export default PatientInfo;