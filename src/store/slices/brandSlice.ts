import { UpdateBrandModel } from '../../models/Requests/Brand/UpdateBrandModel';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrandService from "../../services/brandService";
import { AddBrandModel } from '../../models/Requests/Brand/AddBrandModel';
import brandService from '../../services/brandService';

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
     /*  const state: any = thunkAPI.getState();

      if (state.brand.brands.length) {
        return state.brand.brands;
      } */

      const allBrands = await brandService.getAll();
      return allBrands.data.response;
      
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }
);

export const getByIdBrand = createAsyncThunk(
  "brands/getByIdBrands",
  async ({ id }: { id: number; }, thunkAPI) => {
      try {
          const getByIded = await brandService.getById(id);
          return getByIded.data.response;

      } catch (error) {
          console.error("Error adding getByIded:", error);
          throw error;
      }
  }
);


export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async (newBrandData: AddBrandModel, thunkAPI) => {
    try {
      const addedBrand = await brandService.add(newBrandData);
      // Burada eklenen markayı geri dönebilirsiniz
      console.log(addedBrand);
      
      return addedBrand.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 2005) {
        const details = error.response.data.response.details[0];
        throw details;
      } 
    }
  }
);
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (updatedBrandData: UpdateBrandModel, thunkAPI) => {
    try {
      
      const updatedBrand = await brandService.update(updatedBrandData);
      if (updatedBrand.data) {
        return updatedBrand.data.response;
      }
      else{
        console.warn("Server response does not contain data.");
        return null; // Veya başka bir değer dönebilirsiniz, bu size bağlı.
      }
    } catch (error: any) {
      if (error && error.response && error.response.data.response.errorCode === 2005) {
        const details = error.response.data.response.details[0];
       throw details;
    }
    }
  }
);
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
    async ({ brandId }: { brandId: number; }, thunkAPI) => {
    try {
      await brandService.delete(brandId);
      return { 
          deletedBrandId: brandId 
        };
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  }
);
const brandSlice = createSlice({
  name: "brand",
  initialState: { brands: [] as any[],error:null as string | null },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchBrands.pending, (state) => {});
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      
    });
    builder.addCase(fetchBrands.rejected, (state) => {});


    /*-------------  */

    builder.addCase(getByIdBrand.pending, (state) => { });
    builder.addCase(getByIdBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
    });
    builder.addCase(getByIdBrand.rejected, (state) => {
    });

 /*-------------  */

    builder.addCase(addBrand.pending, (state) => {});
    builder.addCase(addBrand.fulfilled, (state, action) => {
      state.error = null;
      state.brands.push(action.payload);
    });
    builder.addCase(addBrand.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });

   /*-------------  */

    builder.addCase(updateBrand.pending, (state) => {});
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      // Marka güncelledikten sonra, mevcut marka listesini yeniden al
      state.error = null;
      state.brands = [];
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.error = action.error.message || "Bir hata oluştu.";
    });
      

     /*-------------  */

     
    builder.addCase(deleteBrand.pending, (state) => {});
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      // Silinen markayı state'den kaldır
      const deletedBrandId = action.payload.deletedBrandId;
      state.brands = state.brands.filter(brand => brand.id !== deletedBrandId);
    });
    builder.addCase(deleteBrand.rejected, (state) => {});
    
  },
});

export const brandReducer = brandSlice.reducer;
export const {} = brandSlice.actions;
