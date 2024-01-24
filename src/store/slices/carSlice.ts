import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CarService from "../../services/carService"

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
        }

    }
)
export const carReducer =carSlice.reducer;
export const {} = carSlice.actions;