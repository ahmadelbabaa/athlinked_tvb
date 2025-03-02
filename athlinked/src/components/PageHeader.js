import React from 'react';

function PageHeader({ title, subtitle, backgroundImage }) {
  const defaultBackground = 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)';
  
  const headerStyle = {
    backgroundImage: backgroundImage || defaultBackground,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };
  
  return (
    <div className="elevo-page-header" style={headerStyle}>
      <div className="elevo-header-overlay">
        <div className="elevo-header-content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default PageHeader; 