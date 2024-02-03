import { GetByDateCarModel } from './../../models/Responses/GetByDateCarModel';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CarService from "../../services/carService"
import { GetAllFilteredResponse } from '../../models/Responses/Car/GetAllFilteredResponse';

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

        }

    }
)
export const carReducer =carSlice.reducer;
export const {} = carSlice.actions;