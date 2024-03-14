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
import SelectedCar from './pages/SelectedCar/SelectedCar';
import OverlayLoader from './components/OverlayLoader/OverlayLoader';
import { useState } from 'react';
import { AllGetByDateCarResponse } from './models/Responses/Car/AllGetByDateCarResponse';
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
import Navbar from './components/Navbar/Navbar';
import PastRentals from './pages/PastRentals/PastRentals';
import Account from './pages/Accounts/Account';
import UpdateBrand from './pages/Brands/UpdateBrand';
import UpdateVehicleStatus from './pages/VehicleStatus/UpdateVehicleStatus';
import UpdateFuelType from './pages/FuelType/UpdateFuelType';
import UpdateDrivingLicenseType from './pages/DrivingLicenseType/UpdateDrivingLicense';
import UpdateAdmin from './pages/Admin/UpdateAdmin';
import UpdateCarBodyType from './pages/CarBodyType/UpdateCarBodyType';
import UpdateShiftType from './pages/ShiftType/UpdateShiftType';
import UpdateColor from './pages/Color/UpdateColor';
import UpdateEmployee from './pages/Employee/UpdateEmployee';
import UpdateDiscountCode from './pages/DiscountCode/UpdateDiscountCode';
import AddCarSegment from './pages/CarSegment/AddCarSegment';
import CarSegments from './pages/CarSegment/CarSegments';
import UpdatePaymentType from './pages/PaymentType/UpdatePaymentType';
import UpdatePaymentDetails from './pages/PaymentDetails/UpdatePaymentDetails';
import UpdateCar from './pages/Cars/UpdateCar';
import Rentals from './pages/Rental/Rentals';
import UpdateRental from './pages/Rental/UpdateRental';
import UpdateCustomer from './pages/Customer/UpdateCustomer';
import RentalStatuses from './pages/RentalStatus/RentalStatuses';
import Users from './pages/User/Users';
import ReturnRental from './pages/Rental/ReturnRental';
import UpdateCarModel from './pages/CarModel/UpdateCarModel';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Footer from './components/Footer/Footer';
import PastRentalDetail from './pages/PastRentals/PastRentalDetail';
import Contacts from './pages/ContactUs/Contacts';
import AboutUs from './pages/AboutUs/AboutUs';
import RentalTerms from './pages/RentalTerms/RentalTerms';
import UpdateCarSegment from './pages/CarSegment/UpdateCarSegment';
import UpdateUser from './pages/User/UpdatePassword';
import UpdatePassword from './pages/User/UpdatePassword';

  

function App() {

  const [searchCarResponse, setSearchCarResponse] = useState<AllGetByDateCarResponse | undefined>({} as AllGetByDateCarResponse);
  return (
    <>
      <OverlayLoader />
      <Navbar/>
      <Routes>
     
        <Route path="/adminPanel/cars" element={<Cars />}></Route>
        <Route path="/adminPanel/addCar" element={<AddCar />}></Route>
        <Route path="/adminPanel/deleteCar" element={<DeleteCar />}></Route>
        <Route path="/adminPanel/updateCar/:id" element={<UpdateCar/>}></Route>

				<Route path="/" element={<Homepage />}></Route>
				
        <Route path="/adminPanel" element={<AdminPanel/>}/>

        <Route path="/adminPanel/brands" element={<Brands />}></Route>
        <Route path="/adminPanel/addBrand" element={<AddBrand />}></Route>
        <Route path="/adminPanel/deleteBrand" element={<DeleteBrand />}></Route>
        <Route path="/adminPanel/updateBrand/:id" element={<UpdateBrand/>}></Route>

        <Route path="/adminPanel/colors" element={<Colors />}></Route>
        <Route path="/adminPanel/addColor" element={<AddColor />}></Route>
        <Route path="/adminPanel/deleteColor" element={<DeleteColor />}></Route>
        <Route path="/adminPanel/updateColor/:id" element={<UpdateColor/>}></Route>


        <Route path="/adminPanel/shiftTypes" element={<ShiftTypes />}></Route>
        <Route path="/adminPanel/addShiftType" element={<AddShiftType />}></Route>
        <Route path="/adminPanel/deleteShiftType" element={<DeleteShiftType />}></Route>
        <Route path="/adminPanel/updateShiftType/:id" element={<UpdateShiftType/>}></Route>

        <Route path="/adminPanel/discountCodes" element={<DiscountCodes />}></Route>
        <Route path="/adminPanel/addDiscountCode" element={<AddDiscountCode />}></Route>
        <Route path="/adminPanel/deleteDiscountCode" element={<DeleteDiscountCode />}></Route>
        <Route path="/adminPanel/updateDiscountCode/:id" element={<UpdateDiscountCode/>}></Route>

        <Route path="/adminPanel/carModels" element={<CarModels />}></Route>
        <Route path="/adminPanel/addCarModel" element={<AddCarModel />}></Route>
        <Route path="/adminPanel/deleteCarModel" element={<DeleteCarModel />}></Route>
        <Route path="/adminPanel/updateCarModel/:id" element={<UpdateCarModel/>}></Route>

        <Route path="/adminPanel/carBodyTypes" element={<CarBodyTypes />}></Route>
        <Route path="/adminPanel/addCarBodyType" element={<AddCarBodyType />}></Route>
        <Route path="/adminPanel/deleteCarBodyType" element={<DeleteCarBodyType />}></Route>
        <Route path="/adminPanel/updateCarBodyType/:id" element={<UpdateCarBodyType/>}></Route>

        <Route path="/adminPanel/carSegments" element={<CarSegments />}></Route>
        <Route path="/adminPanel/addCarSegment" element={<AddCarSegment />}></Route>
        <Route path="/adminPanel/updateCarSegment/:id" element={<UpdateCarSegment />}></Route>
        {/* <Route path="/adminPanel/deleteCarSegment" element={<DeleteCarSegment />}></Route> */}

        <Route path="/adminPanel/fuelTypes" element={<FuelTypes />}></Route>
        <Route path="/adminPanel/addFuelType" element={<AddFuelType />}></Route>
        <Route path="/adminPanel/deleteFuelType" element={<DeleteFuelType />}></Route>
        <Route path="/adminPanel/updateFuelType/:id" element={<UpdateFuelType/>}></Route>

        <Route path="/adminPanel/rentalStatuses" element={<RentalStatuses />}></Route>

        <Route path="/adminPanel/admins" element={<Admins />}></Route>
        <Route path="/adminPanel/addAdmin" element={<AddAdmin />}></Route>
        <Route path="/adminPanel/deleteAdmin" element={<DeleteAdmin />}></Route>
        <Route path="/adminPanel/updateAdmin/:id" element={<UpdateAdmin/>}></Route>

        <Route path="/adminPanel/customers" element={<Customers />}></Route>
        <Route path="/adminPanel/addCustomer" element={<AddCustomer />}></Route>
        <Route path="/updateCustomer/:id" element={<UpdateCustomer />}></Route>

        <Route path="/adminPanel/employees" element={<Employees />}></Route>
        <Route path="/adminPanel/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/adminPanel/deleteEmployee" element={<DeleteEmployee />}></Route>
        <Route path="/adminPanel/updateEmployee/:id" element={<UpdateEmployee/>}></Route>

        <Route path="/adminPanel/vehicleStatuses" element={<VehicleStatuses />}></Route>
        <Route path="/adminPanel/updateVehicleStatus/:id" element={<UpdateVehicleStatus />}></Route>

        <Route path="/adminPanel/paymentTypes" element={<PaymentTypes />}></Route>
        <Route path="/adminPanel/updatePaymentType/:id" element={<UpdatePaymentType />}></Route>

        <Route path="/adminPanel/drivingLicenseTypes" element={<DrivingLicenseTypes />}></Route>
        <Route path="/adminPanel/addDrivingLicenseType" element={<AddDrivingLicenseType />}></Route>
        <Route path="/adminPanel/deleteDrivingLicenseType" element={<DeleteDrivingLicenseType />}></Route>
        <Route path="/adminPanel/updateDrivingLicenseType/:id" element={<UpdateDrivingLicenseType />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/contact" element={<Contacts />}></Route>

        <Route path="/about" element={<AboutUs />}></Route>

        <Route path="/adminPanel/rentals" element={<Rentals />}></Route>
        <Route path="/adminPanel/updateRental/:id" element={<UpdateRental />}></Route>
        <Route path="/adminPanel/returnRental/:id" element={<ReturnRental />}></Route>

        <Route path="/adminPanel/users" element={<Users />}></Route>
        <Route path="/adminPanel/users/updatePassword/:id" element={<UpdatePassword />}></Route>

        <Route path="/selectedCar" element={<SelectedCar response={searchCarResponse} />} />
        <Route path="/adminPanel/paymentDetails" element={<PaymentDetails />}></Route>
        <Route path="/adminPanel/updatePaymentDetails/:id" element={<UpdatePaymentDetails />}></Route>
        <Route path="/allMyRentals/:id" element={<PastRentals />}></Route>
        <Route path="/myRentalDetails/:id" element={<PastRentalDetail />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/rentalTerm" element={<RentalTerms />}></Route>
      
			</Routes>
    <Footer/>
    </>
  );
}

export default App;
