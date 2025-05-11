import { useDispatch, useSelector } from "react-redux";
import Button from "../layouts/Button";
import { addItemToCart } from "../store/cart/cart.actions";
import { selectCartItems } from "../store/cart/cart.selector";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className="product__card">
            <img src={imageUrl} alt={name} />
            <div className="product__card--footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <Button buttonType="btn-secondary" onClick={addProductToCart}>
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
