import {createSlice} from "@reduxjs/toolkit"
import { CarModel } from "../../models/Responses/CarModel"

interface CartItem{
    car :CarModel;
    quantity:number;
}
const cartSlice = createSlice(
    {
        name:"cart",
        initialState:{ cartItems : [] as CartItem[] },
        reducers:{
            addToCart  : (state,action) => {
                let existingItem =state.cartItems.find((i:CartItem) => i.car.id === action.payload.id);
                if(existingItem){
                    existingItem.quantity++;
                }
                else{
                    state.cartItems.push( {car:action.payload,quantity:1})
                }

                
            },
            removeFromCart:(state,action)=>{
                state.cartItems= state.cartItems.filter(
                    (i:any) => i.id !== action.payload.id
                )
            },
            clearCart :state => {
                state.cartItems =[]
            }
        },
    }
) 
export const cartReducer =cartSlice.reducer;
export const {addToCart,removeFromCart,clearCart} = cartSlice.actions; 