import { useDispatch, useSelector } from "react-redux";
import Icon from "../../assets/sprite.svg";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { cartOpenState, selectCartCount } from "../../store/cart/cart.selector";

const CartIcon = () => {
    const dispatch = useDispatch();

    const count = useSelector(selectCartCount);
    const isCartOpen = useSelector(cartOpenState);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className="cartIcon" onClick={toggleIsCartOpen}>
            <svg>
                <use xlinkHref={`${Icon}#shopping-cart`}></use>
            </svg>
            <span className="cartIcon__count">{count}</span>
        </div>
    );
};

export default CartIcon;
