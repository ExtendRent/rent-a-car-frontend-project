import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Cars from './pages/Cars/Cars';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AddCar from './pages/Cars/AddCar';
import Brands from './pages/Brands/Brands';
import AddBrand from './pages/Brands/AddBrand';
import Colors from './pages/Color/Colors';
import AddColor from './pages/Color/AddColor';
import DiscountCodes from './pages/DiscountCode/DiscountCodes';
import AddDiscountCode from './pages/DiscountCode/AddDiscountCode';
import CarModels from './pages/CarModel/CarModels';
import AddCarModel from './pages/CarModel/AddCarModel';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import CarBodyTypes from './pages/CarBodyType/CarBodyTypes';
import AddCarBodyType from './pages/CarBodyType/AddCarBodyType';
import Admins from './pages/Admin/Admins';
import AddAdmin from './pages/Admin/AddAdmin';
import UpdateAdmin from './pages/Admin/UpdateAdmin';
import Customers from './pages/Customer/Customers';
import AddCustomer from './pages/Customer/AddCustomer';
import Employees from './pages/Employee/Employees';
import AddEmployee from './pages/Employee/AddEmployee';
import Navbar from './components/Navbar/NewNavbar';
import SelectedCar from './pages/SelectedCar/SelectedCar';
import OverlayLoader from './components/OverlayLoader/OverlayLoader';
import { useState } from 'react';
import { GetByDateCarResponse } from './models/Responses/GetByDateCarResponse';
import { AllGetByDateCarResponse } from './models/Responses/AllGetByDateCarResponse';
import FuelTypes from './pages/FuelType/FuelTypes';
import AddFuelType from './pages/FuelType/AddFuelType';
import ShiftTypes from './pages/ShiftType/ShiftTypes';
import AddShiftType from './pages/ShiftType/AddShiftType';
import VehicleStatuses from './pages/VehicleStatus/VehicleStatuses';
import PaymentTypes from './pages/PaymentType/PaymentTypes';
import DrivingLicenseTypes from './pages/DrivingLicenseType/DrivingLicenseTypes';
import AddDrivingLicenseType from './pages/DrivingLicenseType/AddDrivingLicenseType';
import DeleteCar from './pages/Cars/DeleteCar';
import DeleteBrand from './pages/Brands/DeleteBrand';
import DeleteColor from './pages/Color/DeleteColor';
import DeleteShiftType from './pages/ShiftType/DeleteShiftType';
import DeleteDiscountCode from './pages/DiscountCode/DeleteDiscountCode';
import DeleteCarModel from './pages/CarModel/DeleteCarModel';
import DeleteCarBodyType from './pages/CarBodyType/DeleteCarBodyType';
import DeleteFuelType from './pages/FuelType/DeleteFuelType';
import DeleteAdmin from './pages/Admin/DeleteAdmin';
import DeleteEmployee from './pages/Employee/DeleteEmployee';
import DeleteDrivingLicenseType from './pages/DrivingLicenseType/DeleteDrivingLicenseType';



function App() {
  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>({} as AllGetByDateCarResponse);
  return (
    <>
      <OverlayLoader />
      <Navbar />
      
      <Routes>
        
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/cars" element={<Cars />}></Route>
        <Route path="/addCar" element={<AddCar />}></Route>
        <Route path="/deleteCar" element={<DeleteCar />}></Route>

        <Route path="/adminPanel" element={<AdminPanel />}></Route>

        <Route path="/brands" element={<Brands />}></Route>
        <Route path="/addBrand" element={<AddBrand />}></Route>
        <Route path="/deleteBrand" element={<DeleteBrand />}></Route>

        <Route path="/colors" element={<Colors />}></Route>
        <Route path="/addColor" element={<AddColor />}></Route>
        <Route path="/deleteColor" element={<DeleteColor />}></Route>

        <Route path="/shiftTypes" element={<ShiftTypes />}></Route>
        <Route path="/addShiftTypes" element={<AddShiftType />}></Route>
        <Route path="/deleteShiftType" element={<DeleteShiftType />}></Route>

        <Route path="/discountCodes" element={<DiscountCodes />}></Route>
        <Route path="/addDiscountCode" element={<AddDiscountCode />}></Route>
        <Route path="/deleteDiscountCode" element={<DeleteDiscountCode />}></Route>

        <Route path="/carModels" element={<CarModels />}></Route>
        <Route path="/addCarModel" element={<AddCarModel />}></Route>
        <Route path="/deleteCarModel" element={<DeleteCarModel />}></Route>

        <Route path="/carBodyTypes" element={<CarBodyTypes />}></Route>
        <Route path="/addCarBodyType" element={<AddCarBodyType />}></Route>
        <Route path="/deleteCarBodyType" element={<DeleteCarBodyType />}></Route>

        <Route path="/fuelTypes" element={<FuelTypes />}></Route>
        <Route path="/addFuelType" element={<AddFuelType />}></Route>
        <Route path="/deleteFuelType" element={<DeleteFuelType />}></Route>

        <Route path="/admins" element={<Admins />}></Route>
        <Route path="/addAdmin" element={<AddAdmin />}></Route>
        <Route path="/updateAdmin" element={<UpdateAdmin />}></Route>
        <Route path="/deleteAdmin" element={<DeleteAdmin />}></Route>

        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/addCustomer" element={<AddCustomer />}></Route>

        <Route path="/employees" element={<Employees />}></Route>
        <Route path="/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/deleteEmployee" element={<DeleteEmployee />}></Route>

        <Route path="/vehicleStatuses" element={<VehicleStatuses />}></Route>

        <Route path="/paymentTypes" element={<PaymentTypes />}></Route>
     
        <Route path="/drivingLicenseTypes" element={<DrivingLicenseTypes />}></Route>
        <Route path="/addDrivingLicenseType" element={<AddDrivingLicenseType />}></Route>
        <Route path="/deleteDrivingLicenseType" element={<DeleteDrivingLicenseType />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        
        <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />

			</Routes>
    </>
  );
}

export default App;
