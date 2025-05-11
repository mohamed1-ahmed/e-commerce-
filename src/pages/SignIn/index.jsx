import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomInputField from "../../layouts/CustomInputField";
import Button from "../../layouts/Button";
import {
    emailSignInStart,
    googleSignInStart,
} from "../../store/user/user.action";

const defaultFields = {
    email: "",
    password: "",
};

const SignIn = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFields);

    const { email, password } = formFields;

    const navigate = useNavigate();

    const navigateToSignUp = () => navigate("/sign-up");

    const resetFormFields = () => setFormFields(defaultFields);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formFields) return;

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password");
                    break;

                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const logGoogleUser = () => {
        const response = dispatch(googleSignInStart());
        response?._tokenResponse?.emailVerified && navigate("/");
    };

    return (
        <div className="signin">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
                <Button buttonType="btn-primary" type="submit">
                    Submit
                </Button>
            </form>
            <Button buttonType="btn-primary google-btn" onClick={logGoogleUser}>
                Sign In With Google
            </Button>
            <div className="signin__footer">
                <h2>Do not have an account?</h2>
                <Button buttonType="btn-secondary" onClick={navigateToSignUp}>
                    Create Now
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
