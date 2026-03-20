import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Check if the item already exists in the cart
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);

            if (existingItem) {
                // If it exists, just increase the quantity
                existingItem.quantity += 1;
            } else {
                // If it's new, add it to the array with a starting quantity of 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                // Decrease quantity if greater than 1
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // If it hits 0, remove the item entirely
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            }
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;