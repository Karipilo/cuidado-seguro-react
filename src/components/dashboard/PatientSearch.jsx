import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * Componente para búsqueda de pacientes por RUT
 * Muestra resultados de búsqueda y permite seleccionar un paciente
 */
const PatientSearch = ({ onPatientSelect }) => {
  const [searchRut, setSearchRut] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Validar formato de RUT chileno
  const validateRut = (rut) => {
    // Formato: 12345678-9 o 12.345.678-9
    const rutRegex = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
    const rutRegexWithDots = /^([0-9]{1,3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9kK])$/;
    
    if (!rutRegex.test(rut) && !rutRegexWithDots.test(rut)) {
      return false;
    }
    
    // Limpiar RUT (quitar puntos y guión)
    const cleanRut = rut.replace(/[^\dKk]/g, '');
    const rutNumber = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();
    
    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;
    
    for (let i = rutNumber.length - 1; i >= 0; i--) {
      sum += parseInt(rutNumber[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDv = 11 - (sum % 11);
    const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
    
    return calculatedDv === dv;
  };

  // Formatear RUT para mostrar
  const formatRut = (rut) => {
    const cleanRut = rut.replace(/[^\dKk]/g, '');
    const number = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    
    // Agregar puntos
    let formattedNumber = '';
    let count = 0;
    for (let i = number.length - 1; i >= 0; i--) {
      formattedNumber = number[i] + formattedNumber;
      count++;
      if (count === 3 && i !== 0) {
        formattedNumber = '.' + formattedNumber;
        count = 0;
      }
    }
    
    return formattedNumber + '-' + dv;
  };

  // Buscar pacientes
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSearchResults([]);
    setHasSearched(true);

    if (!searchRut.trim()) {
      setError('Ingrese un RUT para buscar');
      return;
    }

    if (!validateRut(searchRut)) {
      setError('El RUT ingresado no es válido');
      return;
    }

    setLoading(true);

    try {
      // Simular búsqueda en base de datos
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Datos mock de pacientes
      const mockPatients = [
        {
          id: 'P001',
          rut: '12345678-9',
          nombre: 'Ana María González López',
          edad: 8,
          fechaNacimiento: '2015-09-15',
          diagnostico: 'Trastorno del Espectro Autista - Nivel 2',
          medicoTratante: 'Dra. Carla Rodríguez',
          telefono: '+56 9 8765 4321',
          email: 'tutor@ejemplo.com',
          direccion: 'Calle Principal 123, Santiago',
          tutor: 'Carlos González',
          parentesco: 'Padre',
          telefonoTutor: '+56 9 1234 5678'
        },
        {
          id: 'P002',
          rut: '98765432-1',
          nombre: 'Diego Andrés Silva',
          edad: 12,
          fechaNacimiento: '2011-06-20',
          diagnostico: 'Trastorno por Déficit de Atención e Hiperactividad',
          medicoTratante: 'Dr. Pedro Martínez',
          telefono: '+56 9 2345 6789',
          email: 'madre@ejemplo.com',
          direccion: 'Avenida Secundaria 456, Santiago',
          tutor: 'María Silva',
          parentesco: 'Madre',
          telefonoTutor: '+56 9 3456 7890'
        },
        {
          id: 'P003',
          rut: '11223344-5',
          nombre: 'Valentina Sofía Reyes',
          edad: 6,
          fechaNacimiento: '2017-11-30',
          diagnostico: 'Trastorno del Lenguaje Expresivo',
          medicoTratante: 'Dra. Carla Rodríguez',
          telefono: '+56 9 4567 8901',
          email: 'tutor2@ejemplo.com',
          direccion: 'Calle Terciaria 789, Santiago',
          tutor: 'Patricia Reyes',
          parentesco: 'Madre',
          telefonoTutor: '+56 9 5678 9012'
        }
      ];

      // Buscar paciente por RUT
      const cleanSearchRut = searchRut.replace(/[^\dKk]/g, '');
      const foundPatient = mockPatients.find(patient => {
        const cleanPatientRut = patient.rut.replace(/[^\dKk]/g, '');
        return cleanPatientRut === cleanSearchRut;
      });

      if (foundPatient) {
        setSearchResults([foundPatient]);
      } else {
        setError('No se encontró ningún paciente con ese RUT');
      }

    } catch (error) {
      setError('Error al buscar paciente. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el input
  const handleChange = (e) => {
    const value = e.target.value;
    // Permitir solo números, K, k, puntos y guiones
    const formattedValue = value.replace(/[^0-9Kk.\-]/g, '');
    setSearchRut(formattedValue);
    
    if (error) {
      setError('');
    }
  };

  // Seleccionar paciente
  const handlePatientSelect = (patient) => {
    onPatientSelect(patient);
  };

  return (
    <Card title="Buscar Paciente">
      <form onSubmit={handleSearch}>
        <Input
          label="RUT del Paciente"
          type="text"
          placeholder="Ej: 12.345.678-9"
          name="rut"
          value={searchRut}
          onChange={handleChange}
          error={error}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar Paciente'}
        </Button>
      </form>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h6 className="text-primary mb-3">
            <i className="bi bi-person-check me-2"></i>
            Paciente Encontrado
          </h6>
          {searchResults.map((patient) => (
            <div key={patient.id} className="info-card mb-2">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">{patient.nombre}</h6>
                  <p className="mb-1 text-muted">
                    <small>
                      <i className="bi bi-hash me-1"></i>
                      {formatRut(patient.rut)} | 
                      <i className="bi bi-cake me-1 ms-2"></i>
                      {patient.edad} años
                    </small>
                  </p>
                  <p className="mb-1 text-muted">
                    <small>
                      <i className="bi bi-clipboard2-pulse me-1"></i>
                      {patient.diagnostico}
                    </small>
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <i className="bi bi-eye me-1"></i>
                  Ver Ficha
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && !error && !loading && (
        <div className="text-center text-muted mt-4">
          <i className="bi bi-search fs-1 mb-3"></i>
          <p>No se encontraron pacientes con el RUT ingresado.</p>
        </div>
      )}
    </Card>
  );
};

export default PatientSearch;
