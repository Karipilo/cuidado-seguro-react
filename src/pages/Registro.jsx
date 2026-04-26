import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

/**
 * Página de Registro con campos condicionales según tipo de usuario
 * Maneja validación completa y almacenamiento en localStorage
 */
const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipoUsuario: 'tutor', // 'tutor' o 'profesional'
    // Campos para profesional
    tipoProfesional: '',
    institucion: '',
    rnpi: '',
    // Campos para tutor
    parentesco: '',
    idPaciente: '',
    codigoCentro: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registroError, setRegistroError] = useState('');
  const [registroSuccess, setRegistroSuccess] = useState('');
  
  const navigate = useNavigate();

  // Validar formato de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validar formulario completo
  const validateForm = () => {
    const newErrors = {};

    // Validaciones básicas
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validaciones específicas según tipo de usuario
    if (formData.tipoUsuario === 'profesional') {
      if (!formData.tipoProfesional) {
        newErrors.tipoProfesional = 'El tipo profesional es requerido';
      }
      if (!formData.institucion.trim()) {
        newErrors.institucion = 'La institución es requerida';
      }
      if (!formData.rnpi.trim()) {
        newErrors.rnpi = 'El RNPI es requerido';
      }
    } else if (formData.tipoUsuario === 'tutor') {
      if (!formData.parentesco) {
        newErrors.parentesco = 'El parentesco es requerido';
      }
      if (!formData.idPaciente.trim()) {
        newErrors.idPaciente = 'El ID del paciente es requerido';
      }
      if (!formData.codigoCentro.trim()) {
        newErrors.codigoCentro = 'El código del centro es requerido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistroError('');
    setRegistroSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Obtener usuarios existentes
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el email ya está registrado
      if (users.some(user => user.email === formData.email)) {
        setRegistroError('Este email ya está registrado');
        return;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password, // En producción, esto debería estar hasheado
        tipoUsuario: formData.tipoUsuario,
        ...(formData.tipoUsuario === 'profesional' && {
          tipoProfesional: formData.tipoProfesional,
          institucion: formData.institucion,
          rnpi: formData.rnpi
        }),
        ...(formData.tipoUsuario === 'tutor' && {
          parentesco: formData.parentesco,
          idPaciente: formData.idPaciente,
          codigoCentro: formData.codigoCentro
        }),
        createdAt: new Date().toISOString()
      };

      // Guardar usuario en localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setRegistroSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setRegistroError('Error al registrarse. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card title="Registrarse" className="shadow">
              <form onSubmit={handleSubmit}>
                {registroError && (
                  <div className="alert alert-danger" role="alert">
                    {registroError}
                  </div>
                )}

                {registroSuccess && (
                  <div className="alert alert-success" role="alert">
                    {registroSuccess}
                  </div>
                )}

                {/* Campos básicos */}
                <Input
                  label="Nombre Completo"
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={errors.nombre}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Ingrese su email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese su contraseña (mínimo 6 caracteres)"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <Input
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Confirme su contraseña"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />

                {/* Tipo de usuario */}
                <div className="mb-3">
                  <label className="form-label">Tipo de Usuario *</label>
                  <select
                    className={`form-select form-control-custom ${errors.tipoUsuario ? 'is-invalid' : ''}`}
                    name="tipoUsuario"
                    value={formData.tipoUsuario}
                    onChange={handleChange}
                    required
                  >
                    <option value="tutor">Tutor</option>
                    <option value="profesional">Profesional de la Salud</option>
                  </select>
                  {errors.tipoUsuario && (
                    <div className="invalid-feedback error-message">
                      {errors.tipoUsuario}
                    </div>
                  )}
                </div>

                {/* Campos condicionales para Profesional */}
                {formData.tipoUsuario === 'profesional' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Tipo Profesional *</label>
                      <select
                        className={`form-select form-control-custom ${errors.tipoProfesional ? 'is-invalid' : ''}`}
                        name="tipoProfesional"
                        value={formData.tipoProfesional}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione...</option>
                        <option value="medico">Médico</option>
                        <option value="enfermero">Enfermero/a</option>
                        <option value="kinesiologo">Kinesiólogo/a</option>
                        <option value="nutricionista">Nutricionista</option>
                        <option value="psicologo">Psicólogo/a</option>
                        <option value="otro">Otro</option>
                      </select>
                      {errors.tipoProfesional && (
                        <div className="invalid-feedback error-message">
                          {errors.tipoProfesional}
                        </div>
                      )}
                    </div>

                    <Input
                      label="Institución"
                      type="text"
                      placeholder="Nombre de la institución donde trabaja"
                      name="institucion"
                      value={formData.institucion}
                      onChange={handleChange}
                      error={errors.institucion}
                      required
                    />

                    <Input
                      label="RNPI (Registro Nacional de Prestadores Individuales)"
                      type="text"
                      placeholder="Ingrese su RNPI"
                      name="rnpi"
                      value={formData.rnpi}
                      onChange={handleChange}
                      error={errors.rnpi}
                      required
                    />
                  </>
                )}

                {/* Campos condicionales para Tutor */}
                {formData.tipoUsuario === 'tutor' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Parentesco *</label>
                      <select
                        className={`form-select form-control-custom ${errors.parentesco ? 'is-invalid' : ''}`}
                        name="parentesco"
                        value={formData.parentesco}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccione...</option>
                        <option value="padre">Padre</option>
                        <option value="madre">Madre</option>
                        <option value="tutor_legal">Tutor Legal</option>
                        <option value="abuelo">Abuelo/a</option>
                        <option value="otro">Otro</option>
                      </select>
                      {errors.parentesco && (
                        <div className="invalid-feedback error-message">
                          {errors.parentesco}
                        </div>
                      )}
                    </div>

                    <Input
                      label="ID del Paciente"
                      type="text"
                      placeholder="Ingrese el ID del paciente a su cargo"
                      name="idPaciente"
                      value={formData.idPaciente}
                      onChange={handleChange}
                      error={errors.idPaciente}
                      required
                    />

                    <Input
                      label="Código del Centro"
                      type="text"
                      placeholder="Código del centro de salud"
                      name="codigoCentro"
                      value={formData.codigoCentro}
                      onChange={handleChange}
                      error={errors.codigoCentro}
                      required
                    />
                  </>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </Button>

                <div className="text-center mt-3">
                  <p className="mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
