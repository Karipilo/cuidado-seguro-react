import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * Componente para la sección de mensajes
 * Permite enviar mensajes al centro y listar mensajes enviados
 */
const MessageSection = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    asunto: '',
    contenido: '',
    destinatario: 'centro'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar mensajes al montar el componente
  useEffect(() => {
    loadMessages();
  }, []);

  // Cargar mensajes desde localStorage
  const loadMessages = () => {
    const storedMessages = localStorage.getItem(`messages_${user?.id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Mensajes de ejemplo
      const exampleMessages = [
        {
          id: 1,
          asunto: 'Consulta sobre medicación',
          contenido: 'Quisiera saber si es normal que mi hijo presente somnolencia después de tomar la risperidona.',
          destinatario: 'centro',
          fecha: '2024-01-10T10:30:00',
          estado: 'respondido',
          respuesta: 'Es un efecto secundario común. Consultar con el médico si persiste.'
        },
        {
          id: 2,
          asunto: 'Cambio de terapia',
          contenido: 'Nos mudamos a otra comuna, ¿podemos continuar la terapia ocupacional en el nuevo centro?',
          destinatario: 'centro',
          fecha: '2024-01-15T14:20:00',
          estado: 'pendiente'
        }
      ];
      setMessages(exampleMessages);
    }
  };

  // Validar formulario de mensaje
  const validateMessage = () => {
    const newErrors = {};

    if (!newMessage.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido';
    }

    if (!newMessage.contenido.trim()) {
      newErrors.contenido = 'El contenido del mensaje es requerido';
    } else if (newMessage.contenido.length < 10) {
      newErrors.contenido = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({
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

  // Enviar mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!validateMessage()) {
      return;
    }

    setLoading(true);

    try {
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Crear nuevo mensaje
      const message = {
        id: Date.now(),
        ...newMessage,
        fecha: new Date().toISOString(),
        estado: 'pendiente'
      };

      // Guardar en localStorage
      const updatedMessages = [message, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem(`messages_${user?.id}`, JSON.stringify(updatedMessages));

      // Limpiar formulario
      setNewMessage({
        asunto: '',
        contenido: '',
        destinatario: 'centro'
      });

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
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

  return (
    <div>
      {/* Formulario de Nuevo Mensaje */}
      <Card title="Enviar Mensaje al Centro" className="mb-4">
        <form onSubmit={handleSendMessage}>
          <Input
            label="Asunto"
            type="text"
            placeholder="Ingrese el asunto del mensaje"
            name="asunto"
            value={newMessage.asunto}
            onChange={handleChange}
            error={errors.asunto}
            required
          />

          <div className="mb-3">
            <label htmlFor="contenido" className="form-label">
              Mensaje *
            </label>
            <textarea
              className={`form-control form-control-custom ${errors.contenido ? 'is-invalid' : ''}`}
              id="contenido"
              name="contenido"
              rows="4"
              placeholder="Escriba su mensaje aquí..."
              value={newMessage.contenido}
              onChange={handleChange}
              required
            />
            {errors.contenido && (
              <div className="invalid-feedback error-message">
                {errors.contenido}
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </Card>

      {/* Lista de Mensajes Enviados */}
      <Card title="Mensajes Enviados">
        {messages.length > 0 ? (
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message.id} className="info-card mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="text-primary mb-0">{message.asunto}</h6>
                  <span className={`badge ${
                    message.estado === 'respondido' 
                      ? 'bg-success' 
                      : 'bg-warning'
                  }`}>
                    {message.estado === 'respondido' ? 'Respondido' : 'Pendiente'}
                  </span>
                </div>
                <p className="mb-2">{message.contenido}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {formatDate(message.fecha)}
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-person me-1"></i>
                    Para: Centro de Salud
                  </small>
                </div>
                {message.respuesta && (
                  <div className="mt-3 p-2 bg-light rounded">
                    <small className="text-primary fw-bold">Respuesta:</small>
                    <p className="mb-0 mt-1">{message.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center">
            No hay mensajes enviados aún.
          </p>
        )}
      </Card>
    </div>
  );
};

export default MessageSection;
