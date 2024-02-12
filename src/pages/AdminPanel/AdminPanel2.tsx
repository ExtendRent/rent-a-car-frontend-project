import React, { useState } from 'react';
import AddCar from '../Cars/AddCar';
import Cars from '../Cars/Cars';
import DeleteCar from '../Cars/DeleteCar';
import Brands from '../Brands/Brands';
import AddBrand from '../Brands/AddBrand';
import DeleteBrand from '../Brands/DeleteBrand';
import AddCarBodyType from '../CarBodyType/AddCarBodyType';
import CarBodyTypes from '../CarBodyType/CarBodyTypes';
import DeleteCarBodyType from '../CarBodyType/DeleteCarBodyType';
import AddCarModel from '../CarModel/AddCarModel';
import DeleteCarModel from '../CarModel/DeleteCarModel';
import CarModels from '../CarModel/CarModels';
import AddColor from '../Color/AddColor';
import Colors from '../Color/Colors';
import DeleteColor from '../Color/DeleteColor';
import AddDiscountCode from '../DiscountCode/AddDiscountCode';
import DiscountCodes from '../DiscountCode/DiscountCodes';
import DeleteDiscountCode from '../DiscountCode/DeleteDiscountCode';
import DeleteDrivingLicenseType from '../DrivingLicenseType/DeleteDrivingLicenseType';
import AddDrivingLicenseType from '../DrivingLicenseType/AddDrivingLicenseType';
import DrivingLicenseTypes from '../DrivingLicenseType/DrivingLicenseTypes';
import AddEmployee from '../Employee/AddEmployee';
import DeleteEmployee from '../Employee/DeleteEmployee';
import Employees from '../Employee/Employees';
import AddFuelType from '../FuelType/AddFuelType';
import FuelTypes from '../FuelType/FuelTypes';
import DeleteFuelType from '../FuelType/DeleteFuelType';
import PaymentTypes from '../PaymentType/PaymentTypes';
import AddShiftType from '../ShiftType/AddShiftType';
import ShiftTypes from '../ShiftType/ShiftTypes';
import DeleteShiftType from '../ShiftType/DeleteShiftType';
import VehicleStatuses from '../VehicleStatus/VehicleStatuses';
import './AdminPanel2.css';

const AdminPanel2: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleDropdownClick = (index: number) => {
    const dropdowns = document.querySelectorAll('.dropdown-container');
    const dropdownContent = dropdowns[index] as HTMLElement;
    dropdownContent.classList.toggle('active');

    const dropdownIcon = dropdownContent.previousElementSibling?.querySelector('i');
    if (dropdownIcon) {
      dropdownIcon.classList.toggle('fa-caret-up');
    }
  };

  return (

    <div style={{ display: 'flex' }}>
      <div style={{ width: '33%' }}>
      <div className="sidenav">
          <button className="dropdown-btn" onClick={() => handleDropdownClick(0)}>Araç
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <button onClick={() => setSelectedAction('AddCar')}>Araç Ekle</button>
            <button onClick={() => setSelectedAction('UpdateCar')}>Araç Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteCar')}>Araç Sil</button>
          </div>
          <button className="dropdown-btn" onClick={() => handleDropdownClick(1)}>Marka
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <button onClick={() => setSelectedAction('AddBrand')}>Marka Ekle</button>
            <button onClick={() => setSelectedAction('UpdateBrand')}>Marka Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteBrand')}>Marka Sil</button>
          </div>
        </div>
        


        {/* <li>
            <button onClick={() => setSelectedAction('AddCar')}>Araç Ekle</button>
            <button onClick={() => setSelectedAction('UpdateCar')}>Araç Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteCar')}>Araç Sil</button>
          </li> 
          <li>
            <button onClick={() => setSelectedAction('AddBrand')}>Marka Ekle</button>
            <button onClick={() => setSelectedAction('UpdateBrand')}>Marka Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteBrand')}>Marka Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddCarBodyType')}>Araç Tipi Ekle</button>
            <button onClick={() => setSelectedAction('UpdateCarBodyType')}>Araç Tipi Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteCarBodyType')}>Araç Tipi Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddCarModel')}>Model Ekle</button>
            <button onClick={() => setSelectedAction('UpdateCarModel')}>Model Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteCarModel')}>Model Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddColor')}>Renk Ekle</button>
            <button onClick={() => setSelectedAction('UpdateColor')}>Renk Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteColor')}>Renk Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddDiscountCode')}>İndirim Kuponu Ekle</button>
            <button onClick={() => setSelectedAction('UpdateDiscountCode')}>İndirim Kuponu Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteDiscountCode')}>İndirim Kuponu Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddDrivingLicenseType')}>Ehliyet Tipi Ekle</button>
            <button onClick={() => setSelectedAction('UpdateDrivingLicenseType')}>Ehliyet Tipi Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteDrivingLicenseType')}>Ehliyet Tipi Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddEmployee')}>Çalışan Ekle</button>
            <button onClick={() => setSelectedAction('UpdateEmployee')}>Çalışan Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteEmployee')}>Çalışan Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddFuelType')}>Yakıt Tipi Ekle</button>
            <button onClick={() => setSelectedAction('UpdateFuelType')}>Yakıt Tipi Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteFuelType')}>Yakıt Tipi Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('UpdatePaymentType')}>Ödeme Tipi Güncelle</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddShiftType')}>Vites Tipi Ekle</button>
            <button onClick={() => setSelectedAction('UpdateShiftType')}>Vites Tipi Güncelle</button>
            <button onClick={() => setSelectedAction('DeleteShiftType')}>Vites Tipi Sil</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('UpdateVehicleStatus')}>Araç Durumu Güncelle</button>
          </li>
           */}

      </div>

      <div style={{ width: '67%' }}>
        {selectedAction === 'AddCar' && <AddCar />}
        {selectedAction === 'UpdateCar' && <Cars />}
        {selectedAction === 'DeleteCar' && <DeleteCar />}

        {selectedAction === 'AddBrand' && <AddBrand />}
        {selectedAction === 'UpdateBrand' && <Brands />}
        {selectedAction === 'DeleteBrand' && <DeleteBrand />}

        {selectedAction === 'AddCarBodyType' && <AddCarBodyType />}
        {selectedAction === 'UpdateCarBodyType' && <CarBodyTypes />}
        {selectedAction === 'DeleteCarBodyType' && <DeleteCarBodyType />}

        {selectedAction === 'AddCarModel' && <AddCarModel />}
        {selectedAction === 'UpdateCarModel' && <CarModels />}
        {selectedAction === 'DeleteCarModel' && <DeleteCarModel />}

        {selectedAction === 'AddColor' && <AddColor />}
        {selectedAction === 'UpdateColor' && <Colors />}
        {selectedAction === 'DeleteColor' && <DeleteColor />}

        {selectedAction === 'AddDiscountCode' && <AddDiscountCode />}
        {selectedAction === 'UpdateDiscountCode' && <DiscountCodes />}
        {selectedAction === 'DeleteDiscountCode' && <DeleteDiscountCode />}

        {selectedAction === 'AddDrivingLicenseType' && <AddDrivingLicenseType />}
        {selectedAction === 'UpdateDrivingLicenseType' && <DrivingLicenseTypes />}
        {selectedAction === 'DeleteDrivingLicenseType' && <DeleteDrivingLicenseType />}

        {selectedAction === 'AddEmployee' && <AddEmployee />}
        {selectedAction === 'UpdateEmployee' && <Employees />}
        {selectedAction === 'DeleteEmployee' && <DeleteEmployee />}

        {selectedAction === 'AddFuelType' && <AddFuelType />}
        {selectedAction === 'UpdateFuelType' && <FuelTypes />}
        {selectedAction === 'DeleteFuelType' && <DeleteFuelType />}

        {selectedAction === 'UpdatePaymentType' && <PaymentTypes />}

        {selectedAction === 'AddShiftType' && <AddShiftType />}
        {selectedAction === 'UpdateShiftType' && <ShiftTypes />}
        {selectedAction === 'DeleteShiftType' && <DeleteShiftType />}

        {selectedAction === 'UpdateVehicleStatus' && <VehicleStatuses />}

      </div>
    </div>
  );
};

export default AdminPanel2;
