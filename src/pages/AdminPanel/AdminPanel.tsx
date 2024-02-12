import React, { useState } from 'react';
import AddCar from '../Cars/AddCar';
import Cars from '../Cars/Cars';
import DeleteCar from '../Cars/DeleteCar';
import Brands from '../Brands/Brands';
import AddBrand from '../Brands/AddBrand';
import DeleteBrand from '../Brands/DeleteBrand';
import './AdminPanel2.css';

const AdminPanel: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [dropdownActive, setDropdownActive] = useState<boolean[]>([false, false]);

  const handleDropdownClick = (index: number) => {
    const newDropdownState = [...dropdownActive];
    newDropdownState[index] = !newDropdownState[index];
    setDropdownActive(newDropdownState);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '33%' }}>
        <div className="sidenav">
          <button className={`dropdown-btn ${dropdownActive[0] ? 'active' : ''}`} onClick={() => handleDropdownClick(0)}>
            Araç
            <i className={`fa ${dropdownActive[0] ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
          </button>
          <div className={`dropdown-container ${dropdownActive[0] ? 'active' : ''}`}>
            <button onClick={() => setSelectedAction('AddCar')}>Araç Ekle</button>
            <button onClick={() => setSelectedAction('UpdateCar')}>Araç Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteCar')}>Araç Sil</button>
          </div>
          <button className={`dropdown-btn ${dropdownActive[1] ? 'active' : ''}`} onClick={() => handleDropdownClick(1)}>
            Marka
            <i className={`fa ${dropdownActive[1] ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
          </button>
          <div className={`dropdown-container ${dropdownActive[1] ? 'active' : ''}`}>
            <button onClick={() => setSelectedAction('AddBrand')}>Marka Ekle</button>
            <button onClick={() => setSelectedAction('UpdateBrand')}>Marka Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteBrand')}>Marka Sil</button>
          </div>
        </div>
      </div>

      <div style={{ width: '67%' }}>
        {selectedAction === 'AddCar' && <AddCar />}
        {selectedAction === 'UpdateCar' && <Cars />}
        {selectedAction === 'DeleteCar' && <DeleteCar />}

        {selectedAction === 'AddBrand' && <AddBrand />}
        {selectedAction === 'UpdateBrand' && <Brands />}
        {selectedAction === 'DeleteBrand' && <DeleteBrand />}
      </div>
    </div>
  );
};

export default AdminPanel;
