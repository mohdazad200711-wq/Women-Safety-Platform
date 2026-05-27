import React from 'react';

const RequirementCard = ({ title, items, description }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <ul className="feature-list" style={{ marginTop: '18px' }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementCard;
