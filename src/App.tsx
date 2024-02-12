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
import CarBodyTypes from './pages/CarBodyType/CarBodyTypes';
import AddCarBodyType from './pages/CarBodyType/AddCarBodyType';
import Admins from './pages/Admin/Admins';
import AddAdmin from './pages/Admin/AddAdmin';
import Customers from './pages/Customer/Customers';
import AddCustomer from './pages/Customer/AddCustomer';
import Employees from './pages/Employee/Employees';
import AddEmployee from './pages/Employee/AddEmployee';
import Navbar from './components/Navbar/NewNavbar';
import SelectedCar from './pages/SelectedCar/SelectedCar';
import OverlayLoader from './components/OverlayLoader/OverlayLoader';
import { useState } from 'react';
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
import AdminRoutes from './pages/AdminRoutes/AdminRoutes';
import PaymentDetails from './pages/PaymentDetails/PaymentDetails';



  

function App() {

  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>({} as AllGetByDateCarResponse);
  return (
    <>
      <OverlayLoader />
      <Navbar />
      <Routes>
     
        <Route path="/adminPanel/cars" element={<Cars />}></Route>
        <Route path="/adminPanel/addCar" element={<AddCar />}></Route>
        <Route path="/adminPanel/deleteCar" element={<DeleteCar />}></Route>
      
				<Route path="/" element={<Homepage />}></Route>
				

        <Route path="/adminPanel" element={<AdminRoutes/>}/>

        <Route path="/adminPanel/brands" element={<Brands />}></Route>
        <Route path="/adminPanel/addBrand" element={<AddBrand />}></Route>
        <Route path="/adminPanel/deleteBrand" element={<DeleteBrand />}></Route>

        <Route path="/adminPanel/colors" element={<Colors />}></Route>
        <Route path="/adminPanel/addColor" element={<AddColor />}></Route>
        <Route path="/adminPanel/deleteColor" element={<DeleteColor />}></Route>

        <Route path="/adminPanel/shiftTypes" element={<ShiftTypes />}></Route>
        <Route path="/adminPanel/addShiftTypes" element={<AddShiftType />}></Route>
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

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        
        <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />
        <Route path="/paymentDetails" element={<PaymentDetails />}></Route>

			</Routes>
    </>
  );
}

export default App;
