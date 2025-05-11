import { useDispatch, useSelector } from "react-redux";
import {
    addItemToCart,
    deleteItemFromCart,
    removeItemFromCart,
} from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItems = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price, quantity } = product;

    const addItem = () => dispatch(addItemToCart(cartItems, product));
    const removeItem = () => dispatch(removeItemFromCart(cartItems, product));
    const deleteItem = () => dispatch(deleteItemFromCart(cartItems, product));

    return (
        <tr>
            <td>
                <img src={imageUrl} alt={name} />
            </td>
            <td>{name}</td>
            <td>
                <button className="btn btn-tertiary" onClick={removeItem}>
                    &lt;
                </button>
                {quantity}
                <button className="btn btn-tertiary" onClick={addItem}>
                    &gt;
                </button>
            </td>
            <td>${price}</td>
            <td>
                <button className="btn btn-tertiary" onClick={deleteItem}>
                    &#9587;
                </button>
            </td>
        </tr>
    );
};

export default CheckoutItems;
