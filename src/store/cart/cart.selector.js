import { createSelector } from "reselect";

const updateCartSelector = (state) => state.cart;

export const selectCartItems = createSelector(
    [updateCartSelector],
    (cartSlice) => cartSlice.cartItems
);

export const cartOpenState = createSelector(
    [updateCartSelector],
    (cartStateSlice) => cartStateSlice.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    )
);
