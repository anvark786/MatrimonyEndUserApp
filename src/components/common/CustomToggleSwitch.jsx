import React from 'react';

const CustomToggleSwitch = ({ isLocked, handleToggleSwitch,title }) => {
  return (
    <div className="d-flex my-4 justify-content-end align-items-center">
      <label className="me-2">{title}</label>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckChecked"
          style={{ cursor: 'pointer' }}
          checked={isLocked}
          onChange={handleToggleSwitch}
        />
      </div>
    </div>
  );
};

export default CustomToggleSwitch;
