import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemPresentAtIndex = state.cartItems.findIndex(thisElement => {
        return thisElement.item.id === itemToAdd.id;
      });

      if (itemPresentAtIndex !== -1) {
        // Item found
        const itemFoundObject = state.cartItems[itemPresentAtIndex];
        itemFoundObject.quantity += 1;
        itemFoundObject.lineTotal =
          itemFoundObject.item.price * itemFoundObject.quantity;
      } else {
        // Item not found
        state.cartItems.push({
          item: itemToAdd,
          quantity: 1,
          lineTotal: itemToAdd.price,
        });
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        item => item.item.id !== itemIdToRemove,
      );
    },
    clearCart: state => {
      state.cartItems = [];
    },
    incrementItem: (state, action) => {
      const index = state.cartItems.findIndex(
        item => item.item.id === action.payload,
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        state.cartItems[index].lineTotal =
          state.cartItems[index].item.price * state.cartItems[index].quantity;
      }
    },
    decrementItem: (state, action) => {
      const index = state.cartItems.findIndex(
        item => item.item.id === action.payload,
      );
      if (index !== -1) {
        if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
          state.cartItems[index].lineTotal =
            state.cartItems[index].item.price * state.cartItems[index].quantity;
        } else {
          state.cartItems.splice(index, 1);
        }
      }
    },
  },
});

export const {addToCart, removeItem, clearCart, incrementItem, decrementItem} =
  cartSlice.actions;

export default cartSlice.reducer;
