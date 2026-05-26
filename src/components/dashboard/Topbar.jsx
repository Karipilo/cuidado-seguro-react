import React from 'react';

const Topbar = ({
  title,
  subtitle,
  leftContent,
  rightContent,
  gradient,
}) => {
  const background =
    gradient ||
    'linear-gradient(135deg, #5F9EA0 0%, #1976D2 100%)';

  return (
    <div
      className="dashboard-topbar mb-4"
      style={{
        background,
        borderRadius: 24,
        padding: '28px 32px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      <div>
        {title && <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{title}</h2>}
        {subtitle && (
          <p style={{ margin: '6px 0 0', opacity: 0.85, fontSize: '0.9rem' }}>{subtitle}</p>
        )}
        {leftContent}
      </div>
      <div>{rightContent}</div>
    </div>
  );
};

export default Topbar;
