import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

/**
 * Componente Navbar con navegación basada en roles
 * Muestra diferentes opciones según el tipo de usuario logueado
 */
const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener datos del usuario desde localStorage al montar el componente
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]); // Se actualiza cuando cambia la ruta

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Función para obtener el dashboard según el rol
  const getDashboardPath = () => {
    if (!user) return '/login';
    
    switch (user.tipoUsuario) {
      case 'tutor':
        return '/dashboard-tutor';
      case 'profesional':
        return '/dashboard-profesional';
      case 'paciente':
        return '/dashboard-paciente';
      default:
        return '/login';
    }
  };

  // Renderizar opciones de navegación según el rol
  const renderNavOptions = () => {
    if (!user) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registro">Registrarse</Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to={getDashboardPath()}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a 
            className="nav-link dropdown-toggle" 
            href="#" 
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            {user.nombre}
          </a>
          <ul className="dropdown-menu">
            <li><span className="dropdown-item-text text-capitalize">
              Rol: {user.tipoUsuario}
            </span></li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom navbar-light sticky-top">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>
          Cuidado Seguro
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {renderNavOptions()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
