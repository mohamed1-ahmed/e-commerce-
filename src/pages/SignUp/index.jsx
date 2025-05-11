import { useState } from "react";
// import {
//     createDocumentFromAuth,
//     createUserAuthWithEmailandPassword,
// } from "../../utils/firebase/firebase.utils";
import CustomInputField from "../../layouts/CustomInputField";
import Button from "../../layouts/Button";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/user/user.action";

const defaultFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUp = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => setFormFields(defaultFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formFields) return;

        if (password !== confirmPassword) {
            alert("passwords do not match");
        }

        if (email && password && displayName) {
            try {
                dispatch(createUser(email, password, displayName));
                //clean up form
                resetFormFields();

                alert("Your account has been created!");
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    alert("email already in use");
                } else {
                    console.log("user creation encountered an error", error);
                }
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="signup">
            <h1 className="signup__heading">
                Sign Up with your email and password
            </h1>
            <form onSubmit={handleSubmit}>
                <CustomInputField
                    label="Display Name"
                    id="displayName"
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                    required
                />
                <CustomInputField
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                />
                <CustomInputField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required
                />

                <CustomInputField
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                />

                <Button buttonType="btn-primary" type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUp;
