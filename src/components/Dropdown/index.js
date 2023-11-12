

import React, {useState} from 'react';
import './index.css';

const Dropdown = ({ options, onSelect, display }) => {
  

  console.log(options,"options");

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
                {console.log(option,index,"index")}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
