
import { GetByDateCarModel } from '../../models/Responses/Car/GetByDateCarModel';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CarService from "../../services/carService"
import { GetAllFilteredResponse } from '../../models/Responses/Car/GetAllFilteredResponse';
import { AddCarModel } from '../../models/Requests/Car/AddCarModel';
import { UpdateCarModel } from '../../models/Requests/Car/UpdateCarModel';

export const fetchCars =createAsyncThunk(
    "cars/fetchCars",
    async (args,thunkAPI) => {
        try {  
            const state:any = thunkAPI.getState();
            
            if(state.car.cars.lenght){
                return state.car.cars;
            }
            
            const service : CarService =new CarService();
            const allCars =await service.getAll();   
            return allCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        } 
    })
export const getByDateCars =createAsyncThunk(
    "cars/getByDateCars",
    async (searchDate: GetByDateCarModel,thunkAPI) => {
        try {  
            const service : CarService =new CarService();
            const filtredCars =await service.getByDate(searchDate);   
            return filtredCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        } 
    })
export const getByAllFilteredCars =createAsyncThunk(
    "cars/getByAllFilteredCars",
    async (allFiltred: GetAllFilteredResponse,thunkAPI) => {
        try {  
            const service : CarService =new CarService();
            const filtredCars =await service.getByAllFiltered(allFiltred);   
            return filtredCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        } 
    })
export const addCar = createAsyncThunk(
    "cars/addCars",
    async (newCarData: AddCarModel, thunkAPI) => {
        try {
        const service: CarService = new CarService();
        const addedCar = await service.add(newCarData);
    
        return addedCar.data;
    
        } catch (error) {
        console.error("Error adding car:", error);
        throw error;
        }
    }
    );
export const updateCar = createAsyncThunk(
"cars/updateCars",
async (updatedCarData: UpdateCarModel, thunkAPI) => {
    try {

    const service: CarService = new CarService();
    const updatedCar = await service.update(updatedCarData);
    if (updatedCar.data) {
        return updatedCar.data.response;
    }
    else {
        console.warn("Server response does not contain data.");
        return null;
    }
    } catch (error) {
    console.error("Error updating car:", error);
    throw error;
    }
});

export const deleteCar = createAsyncThunk(
"cars/deleteCar",
async ({ carId }: { carId: number; }, thunkAPI) => {
    try {
    const service: CarService = new CarService();
    await service.delete(carId);
    return {
        deletedCarId: carId
    };
    } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
    }
});
    
export const getByCarId = createAsyncThunk(
"cars/getByCarId",
async ({ carId }: { carId: number; }, thunkAPI) => {
    try {
    const service: CarService = new CarService();
    const getByCarIded = await service.getByCarId(carId);
    return getByCarIded.data.response;

    } catch (error) {
    console.error("Error fetching getByCarIded:", error);
    throw error;
    }
}
);
    
const carSlice = createSlice(
    {
        name:"car",
        initialState:{ cars : [] as any[] },
        reducers:{},
        extraReducers:builder => {
            builder.addCase(fetchCars.pending,(state) => {
    
            });
            builder.addCase(fetchCars.fulfilled,(state,action) =>{
                state.cars = action.payload;
            
                
            });
            builder.addCase(fetchCars.rejected,(state) =>{});

            /////////////////////////////////
            builder.addCase(getByDateCars.pending,(state) => {
    
            });
            builder.addCase(getByDateCars.fulfilled,(state,action) =>{
                state.cars = action.payload;
            
                
            });
            builder.addCase(getByDateCars.rejected,(state) =>{});

            /////////////////////////////////
            builder.addCase(getByAllFilteredCars.pending,(state) => {
    
            });
            builder.addCase(getByAllFilteredCars.fulfilled,(state,action) =>{
                state.cars = action.payload;
            
            });
            builder.addCase(getByAllFilteredCars.rejected,(state) =>{});
            builder.addCase(addCar.pending, (state) => { });
            builder.addCase(addCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
            });
            builder.addCase(addCar.rejected, (state) => { });

            builder.addCase(updateCar.pending, (state) => { });
            builder.addCase(updateCar.fulfilled, (state, action) => {
                state.cars = [];
            });
            builder.addCase(updateCar.rejected, (state) => { });

            builder.addCase(deleteCar.pending, (state) => { });
            builder.addCase(deleteCar.fulfilled, (state, action) => {
                const deletedCarId = action.payload.deletedCarId;
                state.cars = state.cars.filter(car => car.id !== deletedCarId);
            });
            builder.addCase(deleteCar.rejected, (state) => { });

            builder.addCase(getByCarId.pending, (state) => {});
            builder.addCase(getByCarId.fulfilled, (state, action) => {
                state.cars = action.payload;
            });
            builder.addCase(getByCarId.rejected, (state) => {
            });

        }
    }
)
export const carReducer = carSlice.reducer;
export const { } = carSlice.actions;