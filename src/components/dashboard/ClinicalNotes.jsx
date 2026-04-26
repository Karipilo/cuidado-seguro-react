import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * Componente para gestionar notas clínicas
 * Permite agregar nuevas notas y ver el historial
 */
const ClinicalNotes = ({ patient, professional, className = '' }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    tipoNota: 'evolucion',
    contenido: '',
    indicaciones: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar notas existentes al montar el componente
  useEffect(() => {
    loadNotes();
  }, [patient?.id]);

  // Cargar notas desde localStorage
  const loadNotes = () => {
    if (!patient?.id) return;

    const storedNotes = localStorage.getItem(`clinical_notes_${patient.id}`);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Notas de ejemplo
      const exampleNotes = [
        {
          id: 1,
          tipoNota: 'evolucion',
          contenido: 'Paciente presenta mejoría en la interacción social. Responde mejor a estímulos verbales y mantiene contacto visual por períodos más largos.',
          indicaciones: 'Continuar con terapia ocupacional semanal. Mantener dosis actual de medicación.',
          profesional: 'Dra. Carla Rodríguez',
          fecha: '2024-01-15T10:30:00',
          pacienteId: patient.id
        },
        {
          id: 2,
          tipoNota: 'consulta',
          contenido: 'Tutor reporta dificultad en el sueño. Paciente presenta irritabilidad durante la tarde.',
          indicaciones: 'Evaluar ajuste de melatonina. Recomendar rutina de sueño estructurada.',
          profesional: 'Dra. Carla Rodríguez',
          fecha: '2024-01-10T14:20:00',
          pacienteId: patient.id
        }
      ];
      setNotes(exampleNotes);
    }
  };

  // Validar formulario de nota
  const validateNote = () => {
    const newErrors = {};

    if (!newNote.tipoNota) {
      newErrors.tipoNota = 'El tipo de nota es requerido';
    }

    if (!newNote.contenido.trim()) {
      newErrors.contenido = 'El contenido de la nota es requerido';
    } else if (newNote.contenido.length < 20) {
      newErrors.contenido = 'La nota debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Agregar nueva nota
  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!validateNote()) {
      return;
    }

    setLoading(true);

    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Crear nueva nota
      const note = {
        id: Date.now(),
        ...newNote,
        profesional: professional?.nombre || 'Profesional',
        fecha: new Date().toISOString(),
        pacienteId: patient.id
      };

      // Guardar en localStorage
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem(`clinical_notes_${patient.id}`, JSON.stringify(updatedNotes));

      // Limpiar formulario
      setNewNote({
        tipoNota: 'evolucion',
        contenido: '',
        indicaciones: ''
      });

    } catch (error) {
      console.error('Error al guardar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener etiqueta del tipo de nota
  const getTipoNotaLabel = (tipo) => {
    const labels = {
      evolucion: 'Evolución',
      consulta: 'Consulta',
      procedimiento: 'Procedimiento',
      indicacion: 'Indicación',
      observacion: 'Observación'
    };
    return labels[tipo] || tipo;
  };

  // Obtener color del tipo de nota
  const getTipoNotaColor = (tipo) => {
    const colors = {
      evolucion: 'primary',
      consulta: 'info',
      procedimiento: 'warning',
      indicacion: 'success',
      observacion: 'secondary'
    };
    return colors[tipo] || 'secondary';
  };

  return (
    <Card title={`Notas Clínicas - ${patient.nombre}`} className={className}>
      <div className="row">
        {/* Formulario para agregar nota */}
        <div className="col-lg-5">
          <h6 className="text-primary mb-3">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Nueva Nota
          </h6>
          <form onSubmit={handleAddNote}>
            <div className="mb-3">
              <label className="form-label">Tipo de Nota *</label>
              <select
                className={`form-select form-control-custom ${errors.tipoNota ? 'is-invalid' : ''}`}
                name="tipoNota"
                value={newNote.tipoNota}
                onChange={handleChange}
                required
              >
                <option value="evolucion">Evolución</option>
                <option value="consulta">Consulta</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="indicacion">Indicación</option>
                <option value="observacion">Observación</option>
              </select>
              {errors.tipoNota && (
                <div className="invalid-feedback error-message">
                  {errors.tipoNota}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">
                Contenido de la Nota *
              </label>
              <textarea
                className={`form-control form-control-custom ${errors.contenido ? 'is-invalid' : ''}`}
                id="contenido"
                name="contenido"
                rows="4"
                placeholder="Describa la evolución, hallazgos o observaciones del paciente..."
                value={newNote.contenido}
                onChange={handleChange}
                required
              />
              {errors.contenido && (
                <div className="invalid-feedback error-message">
                  {errors.contenido}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="indicaciones" className="form-label">
                Indicaciones (Opcional)
              </label>
              <textarea
                className="form-control form-control-custom"
                id="indicaciones"
                name="indicaciones"
                rows="3"
                placeholder="Indicaciones, recomendaciones o plan de acción..."
                value={newNote.indicaciones}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Agregar Nota'}
            </Button>
          </form>
        </div>

        {/* Historial de notas */}
        <div className="col-lg-7">
          <h6 className="text-primary mb-3">
            <i className="bi bi-clock-history me-2"></i>
            Historial de Notas
          </h6>
          {notes.length > 0 ? (
            <div className="notes-history" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {notes.map((note) => (
                <div key={note.id} className="info-card mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className={`badge bg-${getTipoNotaColor(note.tipoNota)}`}>
                      {getTipoNotaLabel(note.tipoNota)}
                    </span>
                    <small className="text-muted">
                      {formatDate(note.fecha)}
                    </small>
                  </div>
                  <p className="mb-2">{note.contenido}</p>
                  {note.indicaciones && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <small className="text-primary fw-bold">Indicaciones:</small>
                      <p className="mb-0 mt-1">{note.indicaciones}</p>
                    </div>
                  )}
                  <div className="mt-2 text-muted">
                    <small>
                      <i className="bi bi-person me-1"></i>
                      {note.profesional}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted py-4">
              <i className="bi bi-clipboard2 fs-1 mb-3"></i>
              <p>No hay notas clínicas registradas para este paciente.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ClinicalNotes;
