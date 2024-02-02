import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CarService from "../../services/carService"
import { AddCarModel } from "../../models/Requests/AddCarModel";

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
    });

    export const addCar = createAsyncThunk(
        "cars/addCar",
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

    

const carSlice = createSlice(
    {
        name:"car",
        initialState:{ cars : [] as any[] },
        reducers:{},
        extraReducers:builder => {
            builder.addCase(fetchCars.pending,(state) => {});
            builder.addCase(fetchCars.fulfilled,(state,action) =>{
                state.cars = action.payload;});
            builder.addCase(fetchCars.rejected,(state) =>{});

            builder.addCase(addCar.pending, (state) => { });
            builder.addCase(addCar.fulfilled, (state, action) => {
              state.cars.push(action.payload);
            });
            builder.addCase(addCar.rejected, (state) => { });

          
        
        }

    }
)
export const carReducer =carSlice.reducer;
export const {} = carSlice.actions;