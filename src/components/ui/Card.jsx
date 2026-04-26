import React from 'react';

/**
 * Componente Card reutilizable
 * Props:
 * - title: Título de la tarjeta
 * - subtitle: Subtítulo de la tarjeta
 * - children: Contenido de la tarjeta
 * - className: Clases CSS adicionales
 * - header: Contenido personalizado para el header
 * - footer: Contenido para el footer
 * - bordered: Si la tarjeta tiene borde
 * - shadow: Si la tarjeta tiene sombra
 */
const Card = ({ 
  title, 
  subtitle, 
  children, 
  className = '', 
  header, 
  footer,
  bordered = true,
  shadow = true
}) => {
  const cardClasses = [
    'card',
    'custom-card',
    bordered ? '' : 'border-0',
    shadow ? '' : 'shadow-none',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle || header) && (
        <div className="card-header bg-white">
          {header}
          {title && (
            <div>
              <h5 className="card-title mb-1">{title}</h5>
              {subtitle && (
                <p className="card-subtitle text-muted mb-0">{subtitle}</p>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer bg-white">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
