import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.type";

const deleteItem = (cartItems, deleteItem) =>
    cartItems?.filter((item) => item.id !== deleteItem.id);

const addToCartItems = (cartItems, addProductToCart) => {
    //find if the product already exists in the cart
    const checkIfItemExists = cartItems.find(
        (e) => e.id === addProductToCart.id
    );

    //if yes, update quantity
    if (checkIfItemExists) {
        return cartItems?.map((item) =>
            item.id === addProductToCart.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }

    //else update cartItems array
    return [...cartItems, { ...addProductToCart, quantity: 1 }];
};

const removeItemsFromCart = (cartItems, removeItem) => {
    //find if the product already exists in the cart
    const checkIfItemExists = cartItems.find((e) => e.id === removeItem.id);

    //if quantity equals 1, then that shouldn't be in the array
    if (checkIfItemExists.quantity === 1) {
        return cartItems?.filter((item) => item?.id !== removeItem);
    }

    //if yes, update quantity
    if (checkIfItemExists) {
        return cartItems?.map((item) =>
            item.id === removeItem.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
    }
};

export const setIsCartOpen = (isCartOpen) =>
    createAction(CART_ACTION_TYPES.IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, addProductToCart) => {
    //add product to cart - update cartItems
    const updatedCartItems = addToCartItems(cartItems, addProductToCart);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
};

export const removeItemFromCart = (cartItems, removeProduct) => {
    //remove product from the cart - update cartItems
    const updatedCartItems = removeItemsFromCart(cartItems, removeProduct);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
};

export const deleteItemFromCart = (cartItems, del) => {
    //delete product
    const updatedCartItems = deleteItem(cartItems, del);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
};
