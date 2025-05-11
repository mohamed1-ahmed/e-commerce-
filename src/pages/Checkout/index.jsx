import { useSelector } from "react-redux";
import CheckoutItems from "./CheckoutItems";
import {
    selectCartItems,
    selectCartTotal,
} from "../../store/cart/cart.selector";

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotal);

    return (
        <div className="checkout">
            <table>
                <thead>
                    <tr>
                        <td>Product</td>
                        <td>Description</td>
                        <td>Quantity</td>
                        <td>Price</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {cartItems?.length ? (
                        cartItems?.map((item) => (
                            <CheckoutItems key={item.id} product={item} />
                        ))
                    ) : (
                        <tr>
                            <td>
                                <span className="empty-message">
                                    Your cart is empty
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="checkout__total">{`Total: $${totalPrice}`}</div>
        </div>
    );
};

export default Checkout;
