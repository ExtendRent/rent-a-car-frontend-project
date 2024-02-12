import { carModelReducer } from './slices/carModelSlice';
import { customerReducer } from './slices/customerSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./slices/carSlice";
import { brandReducer } from "./slices/brandSlice";
import { signInReducer } from './slices/signInSlice';
import { showRentalReducer } from './slices/showRentalSlice';
import { carBodyTypeReducer } from './slices/carBodyTypeSlice';
import { colorReducer } from './slices/colorSlice';
import { loadingReducer } from './slices/loadingSlice';
import { fuelTypeReducer } from './slices/fuelTypeSlice';
import { shiftTypeReducer } from './slices/shiftTypeSlice';
import { discountCodeReducer } from './slices/discountCodeSlice';
import { adminReducer } from './slices/adminSlice';
import { employeeReducer } from './slices/employeeSlice';
import { vehicleStatusReducer } from './slices/vehicleStatusSlice';
import { paymentTypeReducer } from './slices/paymentTypeSlice';
import { drivingLicenseTypeReducer } from './slices/drivingLicenseTypeSlice';
import { paymentDetailsReducer } from './slices/paymentDetailsSlice';




const rootReducer = combineReducers({
    car:carReducer,
    brand:brandReducer,
    customer:customerReducer,
    showRental:showRentalReducer,
    carModel:carModelReducer,
    carBodyType:carBodyTypeReducer,
    color:colorReducer,
    loading: loadingReducer,
    signIn:signInReducer,
    fuelType:fuelTypeReducer,
    shiftType : shiftTypeReducer,
    discountCode: discountCodeReducer,
    admin: adminReducer,
    employee: employeeReducer,
    vehicleStatus: vehicleStatusReducer,
    paymentType: paymentTypeReducer,
    drivingLicenseType: drivingLicenseTypeReducer,
    paymentDetails : paymentDetailsReducer,
});

export const store =configureStore({reducer:rootReducer});
export type AppDispatch = typeof store.dispatch;