import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import $ from 'jquery'; 

const initialState = {
    basket: [],
    quantityOrder: [],
    loaded: false,
    addBasket: false,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {

    setProduct: (state,action) => {
        let id = [];
        if(state.basket.length === 0) {
            state.basket = [...state.basket, action.payload];
            state.quantityOrder = [...state.quantityOrder, {id: action.payload.id, quantity: 1, cost: action.payload.cost, startCost: action.payload.cost}]
            // state.basket.push(action.payload);
            // state.quantityOrder.push({id: action.payload.id, quantity: 1, cost: action.payload.cost, startCost: action.payload.cost});
         } else {
            state.basket.forEach(element => {
                id = [...id, element.id];
            });
            if(!(id.includes(action.payload.id))) {
                state.basket = [...state.basket, action.payload];
                state.quantityOrder = [...state.quantityOrder, {id: action.payload.id, quantity: 1, cost: action.payload.cost, startCost: action.payload.cost}]
            }
        }
        console.log(state.basket.length)
    },

    getProduct: (state,action) => {
        state.basket = action.payload;
        console.log(action.payload, 222)
    },

    quantityAdd: (state,action) => {
         state.quantityOrder.forEach((element) => {
            if(element.id === action.payload) {
                element.quantity++;
                element.cost = element.startCost * element.quantity;
        }})
    },

    quantityDelete: (state,action) => {
        state.quantityOrder.forEach((element) => {
           if(element.id === action.payload) {
               element.quantity--;
               element.cost = element.startCost * element.quantity;
       }})
    },

    load: (state,action) => {
        state.loaded = action.payload;
    },

    add: (state,action) => {
        state.addBasket = action.payload;
    },

  },
});

export const { setProduct, quantityAdd, quantityDelete, getProduct, load, add } = basketSlice.actions;

export default basketSlice.reducer;