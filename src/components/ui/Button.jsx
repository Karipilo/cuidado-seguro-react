import React from 'react';

/**
 * Componente Button reutilizable
 * Props:
 * - children: Contenido del botón
 * - type: Tipo de botón (button, submit, reset)
 * - variant: Variante de estilo (primary, secondary, success, danger, warning, info, light, dark)
 * - size: Tamaño del botón (sm, md, lg)
 * - onClick: Función para manejar clic
 * - disabled: Si el botón está deshabilitado
 * - loading: Si el botón está en estado de carga
 * - className: Clases CSS adicionales
 * - fullWidth: Si el botón debe ocupar todo el ancho
 */
const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  loading = false,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  // Mapeo de variantes a clases de Bootstrap - Tema Salud
  const variantClasses = {
    primary: 'btn-primary-custom',
    secondary: 'btn-secondary-custom',
    success: 'btn-success-custom',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    outlinePrimary: 'btn-outline-primary',
    outlineSecondary: 'btn-outline-secondary'
  };

  // Mapeo de tamaños a clases de Bootstrap
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const buttonClasses = [
    'btn',
    variantClasses[variant] || 'btn-primary',
    sizeClasses[size] || '',
    fullWidth ? 'w-100' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span 
          className="spinner-border spinner-border-sm me-2" 
          role="status" 
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
