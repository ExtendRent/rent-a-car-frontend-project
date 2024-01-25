import { carModelReducer } from './slices/carModelSlice';
import { customerReducer } from './slices/customerSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./slices/carSlice";
import { brandReducer } from "./slices/brandSlice";
import { signInReducer } from './slices/signInSlice';
import { showRentalReducer } from './slices/showRentalSlice';
<<<<<<< HEAD
import { carBodyTypeReducer } from './slices/carBodyTypeSlice';
=======
import { colorReducer } from './slices/colorSlice';
>>>>>>> 11a9be47ea687df678e4b2b9eb5515355a5d312f

const rootReducer = combineReducers({
    car:carReducer,
    brand:brandReducer,
    customer:customerReducer,
    signIn:signInReducer,
    showRental:showRentalReducer,
    carModel:carModelReducer,
<<<<<<< HEAD
    carBodyType:carBodyTypeReducer
=======
    color:colorReducer,
>>>>>>> 11a9be47ea687df678e4b2b9eb5515355a5d312f
});

export const store =configureStore({reducer:rootReducer});
export type AppDispatch = typeof store.dispatch;