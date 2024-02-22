import React from 'react';
import './RentalButton.css';
const RentalButton = () => {
  return (
    <button className="mybutton noSelect" type="button">
      <div className="mybuttoninner">
        <div className="mybuttoninner2">
          <ul>
            <li>Hemen Kirala</li>
            <div className="mybuttoninnerline2">
              <div className="mybuttoninnerline"></div>
            </div>
            {/* <li>Stop</li> */}
          </ul>
        </div>
      </div>
    </button>
  );
};

export default RentalButton;
