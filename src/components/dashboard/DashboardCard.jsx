import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({
  title,
  subtitle,
  children,
  className = '',
  icon,
  footer,
  onClick,
}) => {
  return (
    <Card
      className={`dashboard-modern-card ${className}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {(title || icon) && (
        <Card.Body>
          {icon && (
            <div className="dashboard-card-icon" style={{ marginBottom: 12 }}>
              {icon}
            </div>
          )}
          {title && (
            <Card.Title className="dashboard-card-title">
              {title}
            </Card.Title>
          )}
          {subtitle && (
            <p className="text-muted mb-2" style={{ fontSize: '0.875rem' }}>
              {subtitle}
            </p>
          )}
          {children && <div className="dashboard-card-body">{children}</div>}
          {footer && <Card.Footer className="bg-transparent border-0 pt-2">{footer}</Card.Footer>}
        </Card.Body>
      )}
      {!icon && !title && children}
    </Card>
  );
};

export default DashboardCard;
