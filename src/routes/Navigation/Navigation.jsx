import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart/cartIcon";
import Icon from "../../assets/sprite.svg";
// import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart/cartList";
import { selectCurrentUser } from "../../store/user/user.selector";
import { cartOpenState } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(cartOpenState);

    const signOutUser = () => dispatch(signOutStart());

    return (
        <>
            <div className="navigation">
                <Link className="navigation__logo" to="/">
                    <svg className="navigation__logo--svg">
                        <use xlinkHref={`${Icon}#crown`}></use>
                    </svg>
                </Link>
                <div className="navigation__menu">
                    <Link className="navigation__menu--li" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                        <span onClick={signOutUser}>Sign Out</span>
                    ) : (
                        <Link className="navigation__menu--li" to="/sign-in">
                            Sign In
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
