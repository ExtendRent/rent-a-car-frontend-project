import { carModelReducer } from './slices/carModelSlice';
import { customerReducer } from './slices/customerSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./slices/carSlice";
import { brandReducer } from "./slices/brandSlice";
import { signInReducer } from './slices/signInSlice';
import { showRentalReducer } from './slices/showRentalSlice';
import { carBodyTypeReducer } from './slices/carBodyTypeSlice';
import { colorReducer } from './slices/colorSlice';
import { shiftTypeReducer } from './slices/shiftTypeSlice';
import { discountCodeReducer } from './slices/discountCodeSlice';


const rootReducer = combineReducers({
    car:carReducer,
    brand:brandReducer,
    customer:customerReducer,
    signIn:signInReducer,
    showRental:showRentalReducer,
    carModel:carModelReducer,
    carBodyType:carBodyTypeReducer,
    color:colorReducer,
    shiftType : shiftTypeReducer,
    discountCode: discountCodeReducer,
});

export const store =configureStore({reducer:rootReducer});
export type AppDispatch = typeof store.dispatch;