import React from 'react';

/**
 * Componente Input reutilizable
 * Props:
 * - label: Etiqueta del input
 * - type: Tipo de input (text, email, password, etc.)
 * - placeholder: Texto placeholder
 * - value: Valor del input
 * - onChange: Función para manejar cambios
 * - error: Mensaje de error
 * - required: Si el campo es requerido
 * - disabled: Si el input está deshabilitado
 * - className: Clases CSS adicionales
 */
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={props.id || label} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-control form-control-custom ${error ? 'is-invalid' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && (
        <div className="invalid-feedback error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
