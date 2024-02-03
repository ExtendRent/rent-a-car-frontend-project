import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Cars from './pages/Cars/Cars';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AddCar from './pages/Cars/AddCar';
import UpdateCar from './pages/Cars/UpdateCar';
import Brands from './pages/Brands/Brands';
import AddBrand from './pages/Brands/AddBrand';
import Colors from './pages/Color/Colors';
import AddColor from './pages/Color/AddColor';
import UpdateColor from './pages/Color/UpdateColor';
import DiscountCodes from './pages/DiscountCode/DiscountCodes';
import AddDiscountCode from './pages/DiscountCode/AddDiscountCode';
import UpdateDiscountCode from './pages/DiscountCode/UpdateDiscountCode';
import CarModels from './pages/CarModel/CarModels';
import AddCarModel from './pages/CarModel/AddCarModel';
import UpdateCarModel from './pages/CarModel/UpdateCarModel';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import CarBodyTypes from './pages/CarBodyType/CarBodyTypes';
import AddCarBodyType from './pages/CarBodyType/AddCarBodyType';
import UpdateCarBodyType from './pages/CarBodyType/UpdateCarBodyType';
import Admins from './pages/Admin/Admins';
import AddAdmin from './pages/Admin/AddAdmin';
import UpdateAdmin from './pages/Admin/UpdateAdmin';
import Customers from './pages/Customer/Customers';
import AddCustomer from './pages/Customer/AddCustomer';
import UpdateCustomer from './pages/Customer/UpdateCustomer';
import Employees from './pages/Employee/Employees';
import AddEmployee from './pages/Employee/AddEmployee';
import UpdateEmployee from './pages/Employee/UpdateEmployee';
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
        <Route path="/updateCar" element={<UpdateCar />}></Route>

        <Route path="/adminPanel" element={<AdminPanel />}></Route>

        <Route path="/brands" element={<Brands />}></Route>
        <Route path="/addBrand" element={<AddBrand />}></Route>

        <Route path="/colors" element={<Colors />}></Route>
        <Route path="/addColor" element={<AddColor />}></Route>
        <Route path="/updateColor" element={<UpdateColor />}></Route>

        <Route path="/gearshifts" element={<ShiftTypes />}></Route>
        <Route path="/addgearshifts" element={<AddShiftType />}></Route>
        

        <Route path="/discountCodes" element={<DiscountCodes />}></Route>
        <Route path="/addDiscountCode" element={<AddDiscountCode />}></Route>
        <Route path="/updateDiscountCode" element={<UpdateDiscountCode />}></Route>

        <Route path="/carModels" element={<CarModels />}></Route>
        <Route path="/addCarModel" element={<AddCarModel />}></Route>
        <Route path="/updateCarModel" element={<UpdateCarModel />}></Route>

        <Route path="/carBodyTypes" element={<CarBodyTypes />}></Route>
        <Route path="/addCarBodyType" element={<AddCarBodyType />}></Route>
        <Route path="/updateCarBodyType" element={<UpdateCarBodyType />}></Route>

        <Route path="/fuelTypes" element={<FuelTypes />}></Route>
        <Route path="/addFuelType" element={<AddFuelType />}></Route>

        <Route path="/admins" element={<Admins />}></Route>
        <Route path="/addAdmin" element={<AddAdmin />}></Route>
        <Route path="/updateAdmin" element={<UpdateAdmin />}></Route>

        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/addCustomer" element={<AddCustomer />}></Route>
        <Route path="/updateCustomer" element={<UpdateCustomer />}></Route>

        <Route path="/employees" element={<Employees />}></Route>
        <Route path="/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/updateEmployee" element={<UpdateEmployee />}></Route>

        <Route path="/vehicleStatuses" element={<VehicleStatuses />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        
        <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />

			</Routes>
    </>
  );
}

export default App;
