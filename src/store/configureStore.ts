import { carModelReducer } from './slices/carModelSlice';
import { customerReducer } from './slices/customerSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./slices/carSlice";
import { brandReducer } from "./slices/brandSlice";
import { signInReducer } from './slices/signInSlice';
import { showRentalReducer } from './slices/showRentalSlice';
import { carBodyTypeReducer } from './slices/carBodyTypeSlice';
import { colorReducer } from './slices/colorSlice';
import { fuelTypeReducer } from './slices/fuelTypeSlice';
import { shiftTypeReducer } from './slices/shiftTypeSlice';
import { discountCodeReducer } from './slices/discountCodeSlice';
import { adminReducer } from './slices/adminSlice';


const rootReducer = combineReducers({
    car:carReducer,
    brand:brandReducer,
    customer:customerReducer,
    signIn:signInReducer,
    showRental:showRentalReducer,
    carModel:carModelReducer,
    carBodyType:carBodyTypeReducer,
    color:colorReducer,
    fuelType:fuelTypeReducer,
    shiftType : shiftTypeReducer,
    discountCode: discountCodeReducer,
    admin: adminReducer
});

export const store =configureStore({reducer:rootReducer});
export type AppDispatch = typeof store.dispatch;