
import { GetByDateCarModel } from '../../models/Responses/Car/GetByDateCarModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CarService from "../../services/carService"
import { GetAllFilteredResponse } from '../../models/Responses/Car/GetAllFilteredResponse';
import { AddCarModel } from '../../models/Requests/Car/AddCarModel';
import { UpdateCarModel } from '../../models/Requests/Car/UpdateCarModel';
import carService from '../../services/carService';

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (args, thunkAPI) => {
        try {
            const state: any = thunkAPI.getState();

            if (state.car.cars.lenght) {
                return state.car.cars;
            }

            const allCars = await carService.getAll();
            return allCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        }
    });
export const getByDateCars = createAsyncThunk(
    "cars/getByDateCars",
    async (searchDate: GetByDateCarModel, thunkAPI) => {
        try {
            const filtredCars = await carService.getByDate(searchDate);
            return filtredCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        }
    });
export const getByAllFilteredCars = createAsyncThunk(
    "cars/getByAllFilteredCars",
    async (allFiltred: GetAllFilteredResponse, thunkAPI) => {
        try {
            const filtredCars = await carService.getByAllFiltered(allFiltred);
            return filtredCars.data.response;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error; // Hata durumunu iletmek önemlidir
        }
    });

export const getCarCountByStatus = createAsyncThunk(
    "cars/getCarCountByStatus",
    async ({ statusId }: { statusId: number; }, thunkAPI) => {
        try {
            const getByCounted = await carService.getCarCountByStatus(statusId);
            return getByCounted.data;

        } catch (error) {
            console.error("Error adding getByCounted:", error);
            throw error;
        }
    });

export const getCarCountIsDeleted = createAsyncThunk(
    "cars/getCountIsDeleted",
    async ({ deleted }: { deleted: boolean; }, thunkAPI) => {
        try {
            const getCountIsDelete = await carService.getCarCountIsDeleted(deleted);
            return getCountIsDelete.data;

        } catch (error) {
            console.error("Error adding getCountIsDeleted:", error);
            throw error;
        }
    }
);

export const addCar = createAsyncThunk(
    "cars/addCars",
    async (newCarData: AddCarModel, thunkAPI) => {
        try {
            const addedCar = await carService.add(newCarData);

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

            const updatedCar = await carService.update(updatedCarData);
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
            await carService.delete(carId);
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
            const getByCarIded = await carService.getByCarId(carId);

            return getByCarIded.data;


        } catch (error) {
            console.error("Error fetching getByCarIded:", error);
            throw error;
        }
    }
);

const carSlice = createSlice(
    {
        name: "car",
        initialState: { cars: [] as any[], carStatus:0, carCountIsDeleted:0 },
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchCars.pending, (state) => { });
            builder.addCase(fetchCars.fulfilled, (state, action) => {
                state.cars = action.payload;
            });
            builder.addCase(fetchCars.rejected, (state) => { });

            /*---------------*/

            builder.addCase(getByDateCars.pending, (state) => { });
            builder.addCase(getByDateCars.fulfilled, (state, action) => {
                state.cars = action.payload;
            });
            builder.addCase(getByDateCars.rejected, (state) => { });

            /*---------------*/

            builder.addCase(getByAllFilteredCars.pending, (state) => { });
            builder.addCase(getByAllFilteredCars.fulfilled, (state, action) => {
                state.cars = action.payload;
            });
            builder.addCase(getByAllFilteredCars.rejected, (state) => { });

            /*---------------*/

            builder.addCase(addCar.pending, (state) => { });
            builder.addCase(addCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
            });
            builder.addCase(addCar.rejected, (state) => { });

            /*---------------*/

            builder.addCase(updateCar.pending, (state) => { });
            builder.addCase(updateCar.fulfilled, (state, action) => {
                state.cars = [];
            });
            builder.addCase(updateCar.rejected, (state) => { });

            /*---------------*/

            builder.addCase(deleteCar.pending, (state) => { });
            builder.addCase(deleteCar.fulfilled, (state, action) => {
                const deletedCarId = action.payload.deletedCarId;
                state.cars = state.cars.filter(car => car.id !== deletedCarId);
            });
            builder.addCase(deleteCar.rejected, (state) => { });

            /*---------------*/

            builder.addCase(getByCarId.pending, (state) => { });
            builder.addCase(getByCarId.fulfilled, (state, action) => {
                state.cars = [action.payload]; });
            builder.addCase(getByCarId.rejected, (state) => {});

            /*---------------*/

            builder.addCase(getCarCountByStatus.pending, (state) => { });
            builder.addCase(getCarCountByStatus.fulfilled, (state, action) => {
                state.carStatus = action.payload.response; });
            builder.addCase(getCarCountByStatus.rejected, (state) => {});

            /*---------------*/

            builder.addCase(getCarCountIsDeleted.pending, (state) => { });
            builder.addCase(getCarCountIsDeleted.fulfilled, (state, action) => {
                state.carCountIsDeleted = action.payload.response;});
            builder.addCase(getCarCountIsDeleted.rejected, (state) => { });

        }
    }
)
export const carReducer = carSlice.reducer;
export const { } = carSlice.actions;