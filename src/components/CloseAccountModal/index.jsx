import React, { useState } from 'react';
import './index.css';

const CloseAccountModal = ({ isOpen, onClose, onCloseAccount }) => {
  const [formData, setFormData] = useState({
    email: '',
    uarYes: false,
    uarNo: false,
    reason: '',
    note: '',
    chargeClosureFree: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCloseAccount(formData);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''} `}>
      <span className="title">Close Account</span>
      <span className="close" onClick={onClose}>&times;</span>
      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <span>Email</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group checkbox-group">
          <span>Want to file UAR</span>
          <input
            type="checkbox"
            name="uarYes"
            checked={formData.uarYes}
            onChange={handleChange}
          />
          <span>Yes</span>
          <input
            type="checkbox"
            name="uarNo"
            checked={formData.uarNo}
            onChange={handleChange}
          />
          <span>No</span>
        </div>

        <div className="input-group">
          <span>Reason</span>
          <input
            type="text"
            placeholder="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span>Notes</span>
          <textarea
            placeholder="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="2"
            required
          ></textarea>
        </div>

        <div className="input-group checkbox-group2">
          <div className="input-group">
          <span>Charge Closure Free</span>
          <input
            type="checkbox"
            name="chargeClosureFree"
            checked={formData.chargeClosureFree}
            onChange={handleChange}
          />
          
          </div>
          <div className="button-group">
          <button type="submit">Close Account</button>
        </div>
        </div>

        
      </form>
    </div>
  );
};

export default CloseAccountModal;
