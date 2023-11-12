

import React, {useState} from 'react';
import './index.css';

const Dropdown = ({ options, onSelect, display }) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={()=>setIsOpen(!isOpen)}>
        {display}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && options && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div key={index} onClick={() => onSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
