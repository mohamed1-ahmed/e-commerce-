const CartListItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className="item">
            <div className="item__img">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="item__details">
                <h3 className="item__details--h3">{name}</h3>
                <span className="item__details--span">{`Qty: ${quantity} x $${price}`}</span>
            </div>
        </div>
    );
};

export default CartListItem;
