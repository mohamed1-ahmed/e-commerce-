const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`btn ${buttonType}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
