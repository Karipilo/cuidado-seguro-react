import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

/**
 * Página de Login con validación de campos
 * Maneja autenticación simulada usando localStorage
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();

  // Validar formato de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

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
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar usuario en localStorage (simulación de base de datos)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        // Guardar sesión en localStorage
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          tipoUsuario: user.tipoUsuario
        }));

        // Redirigir según el tipo de usuario
        switch (user.tipoUsuario) {
          case 'tutor':
            navigate('/dashboard-tutor');
            break;
          case 'profesional':
            navigate('/dashboard-profesional');
            break;
          case 'paciente':
            navigate('/dashboard-paciente');
            break;
          default:
            navigate('/login');
        }
      } else {
        setLoginError('Email o contraseña incorrectos');
      }
    } catch (error) {
      setLoginError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Card title="Iniciar Sesión" className="shadow">
              <form onSubmit={handleSubmit}>
                {loginError && (
                  <div className="alert alert-danger" role="alert">
                    {loginError}
                  </div>
                )}

                <Input
                  label="Email"
                  type="email"
                  placeholder="Ingrese su email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  autoComplete="email"
                />

                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>

                <div className="text-center mt-3">
                  <p className="mb-0">
                    ¿No tienes cuenta?{' '}
                    <Link to="/registro" className="text-decoration-none">
                      Regístrate aquí
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

export default Login;
