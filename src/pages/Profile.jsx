import React, { useState } from 'react';

const defaultContacts = [
  { id: 1, name: '', relation: '', phone: '' }
];

const Profile = () => {
  const [name, setName] = useState('Asha Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Delhi');
  const [contacts, setContacts] = useState(defaultContacts);
  const [message, setMessage] = useState('');

  const updateContact = (id, field, value) => {
    setContacts((prev) => prev.map((contact) => (contact.id === id ? { ...contact, [field]: value } : contact)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Your safety profile has been saved locally.');
  };

  return (
    <main>
      <section className="section">
        <div className="form-card">
          <h2>Personal Safety Profile</h2>
          <p>Maintain your basic safety details and add trusted emergency contacts.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="user-name">Full Name</label>
              <input id="user-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="user-phone">Phone Number</label>
              <input id="user-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="user-city">City / Location</label>
              <input id="user-city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Trusted Emergency Contact</label>
              <div style={{ display: 'grid', gap: '16px' }}>
                {contacts.map((contact) => (
                  <div key={contact.id} style={{ display: 'grid', gap: '10px' }}>
                    <input
                      placeholder="Contact name"
                      value={contact.name}
                      onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                    />
                    <input
                      placeholder="Relation"
                      value={contact.relation}
                      onChange={(e) => updateContact(contact.id, 'relation', e.target.value)}
                    />
                    <input
                      placeholder="Phone number"
                      value={contact.phone}
                      onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="btn" type="submit">Save Profile</button>
          </form>

          {message && (
            <div className="alert-panel" style={{ marginTop: '20px' }}>
              <p>{message}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
