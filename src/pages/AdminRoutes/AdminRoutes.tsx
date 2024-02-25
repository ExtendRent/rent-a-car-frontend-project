import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBar from '../../components/Sidebar/SideBar';
import Cars from '../Cars/Cars';
import AddCar from '../Cars/AddCar';
import DeleteCar from '../Cars/DeleteCar';
import Brands from '../Brands/Brands';
import AddBrand from '../Brands/AddBrand';
import DeleteBrand from '../Brands/DeleteBrand';
import Colors from '../Color/Colors';
import AddColor from '../Color/AddColor';
import DeleteColor from '../Color/DeleteColor';
import ShiftTypes from '../ShiftType/ShiftTypes';
import AddShiftType from '../ShiftType/AddShiftType';
import DeleteShiftType from '../ShiftType/DeleteShiftType';
import DiscountCodes from '../DiscountCode/DiscountCodes';
import AddDiscountCode from '../DiscountCode/AddDiscountCode';
import DeleteDiscountCode from '../DiscountCode/DeleteDiscountCode';
import CarModels from '../CarModel/CarModels';
import AddCarModel from '../CarModel/AddCarModel';
import DeleteCarModel from '../CarModel/DeleteCarModel';
import CarBodyTypes from '../CarBodyType/CarBodyTypes';
import AddCarBodyType from '../CarBodyType/AddCarBodyType';
import DeleteCarBodyType from '../CarBodyType/DeleteCarBodyType';
import FuelTypes from '../FuelType/FuelTypes';
import AddFuelType from '../FuelType/AddFuelType';
import DeleteFuelType from '../FuelType/DeleteFuelType';
import Admins from '../Admin/Admins';
import AddAdmin from '../Admin/AddAdmin';
import DeleteAdmin from '../Admin/DeleteAdmin';
import Customers from '../Customer/Customers';
import AddCustomer from '../Customer/AddCustomer';
import Employees from '../Employee/Employees';
import AddEmployee from '../Employee/AddEmployee';
import DeleteEmployee from '../Employee/DeleteEmployee';
import VehicleStatuses from '../VehicleStatus/VehicleStatuses';
import PaymentTypes from '../PaymentType/PaymentTypes';
import DrivingLicenseTypes from '../DrivingLicenseType/DrivingLicenseTypes';
import AddDrivingLicenseType from '../DrivingLicenseType/AddDrivingLicenseType';
import DeleteDrivingLicenseType from '../DrivingLicenseType/DeleteDrivingLicenseType';
import PaymentDetails from '../PaymentDetails/PaymentDetails';
import AdminPanel from '../AdminPanel/AdminPanel';
import AdminCards from '../AdminPanel/AdminCards';



const AdminRoutes: React.FC = () => {
  return (
    <SideBar>
      <Routes>
        <Route path="/adminPanel/cars" element={<Cars />}></Route>
        <Route path="/adminPanel/addCar" element={<AddCar />}></Route>
        <Route path="/adminPanel/deleteCar" element={<DeleteCar />}></Route>
        <Route path="/adminPanel/brands" element={<Brands />}></Route>
        <Route path="/adminPanel/addBrand" element={<AddBrand />}></Route>
        <Route path="/adminPanel/deleteBrand" element={<DeleteBrand />}></Route>
        <Route path="/adminPanel/colors" element={<Colors />}></Route>
        <Route path="/adminPanel/addColor" element={<AddColor />}></Route>
        <Route path="/adminPanel/deleteColor" element={<DeleteColor />}></Route>

        <Route path="/adminPanel/shiftTypes" element={<ShiftTypes />}></Route>
        <Route path="/adminPanel/addShiftType" element={<AddShiftType />}></Route>
        <Route path="/adminPanel/deleteShiftType" element={<DeleteShiftType />}></Route>

        <Route path="/adminPanel/discountCodes" element={<DiscountCodes />}></Route>
        <Route path="/adminPanel/addDiscountCode" element={<AddDiscountCode />}></Route>
        <Route path="/adminPanel/deleteDiscountCode" element={<DeleteDiscountCode />}></Route>

        <Route path="/adminPanel/carModels" element={<CarModels />}></Route>
        <Route path="/adminPanel/addCarModel" element={<AddCarModel />}></Route>
        <Route path="/adminPanel/deleteCarModel" element={<DeleteCarModel />}></Route>

        <Route path="/adminPanel/carBodyTypes" element={<CarBodyTypes />}></Route>
        <Route path="/adminPanel/addCarBodyType" element={<AddCarBodyType />}></Route>
        <Route path="/adminPanel/deleteCarBodyType" element={<DeleteCarBodyType />}></Route>

        <Route path="/adminPanel/fuelTypes" element={<FuelTypes />}></Route>
        <Route path="/adminPanel/addFuelType" element={<AddFuelType />}></Route>
        <Route path="/adminPanel/deleteFuelType" element={<DeleteFuelType />}></Route>

        <Route path="/adminPanel/admins" element={<Admins />}></Route>
        <Route path="/adminPanel/addAdmin" element={<AddAdmin />}></Route>
        <Route path="/adminPanel/deleteAdmin" element={<DeleteAdmin />}></Route>

        <Route path="/adminPanel/customers" element={<Customers />}></Route>
        <Route path="/adminPanel/addCustomer" element={<AddCustomer />}></Route>

        <Route path="/adminPanel/employees" element={<Employees />}></Route>
        <Route path="/adminPanel/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/adminPanel/deleteEmployee" element={<DeleteEmployee />}></Route>

        <Route path="/adminPanel/vehicleStatuses" element={<VehicleStatuses />}></Route>

        <Route path="/adminPanel/paymentTypes" element={<PaymentTypes />}></Route>
     
        <Route path="/adminPanel/drivingLicenseTypes" element={<DrivingLicenseTypes />}></Route>
        <Route path="/adminPanel/addDrivingLicenseType" element={<AddDrivingLicenseType />}></Route>
        <Route path="/adminPanel/deleteDrivingLicenseType" element={<DeleteDrivingLicenseType />}></Route>
        <Route path="/adminPanel/paymentDetails" element={<PaymentDetails />}></Route>

        
      </Routes>
      <div className="container-card">
        <div className="form orta">
          <AdminCards/>
        </div>
      </div>
    </SideBar>
  );
};

export default AdminRoutes;
