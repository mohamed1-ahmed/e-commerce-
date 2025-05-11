const CustomInputField = ({ label, id, ...otherProps }) => {
    return (
        <div className="form-group">
            <input {...otherProps} />
            {label && (
                <label
                    htmlFor={id}
                    className={otherProps.value.length && "shrink"}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default CustomInputField;
