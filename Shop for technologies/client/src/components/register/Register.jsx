import { Form, Formik } from "formik";
import CustomInput from "../../commons/custom-input/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useUser";
import { registerShema } from "../../shemas";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";

export default function Register() {
    const register = useRegister();
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const { setUserHanlder } = useUserContext();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showRepass, setShowRepass] = useState(false);

    async function onRegister(value, actions) {
        try {
            const username = value.username;
            const email = value.email;
            const address = value.address;
            const password = value.password;
            const repass = value.repass;
            const user = await register({
                username,
                email,
                address,
                password,
                repass,
            });
            setUserHanlder(user);
            actions.resetForm();
            navigate("/home");
        } catch (err) {
            setIsError(true);
            setErrMessage(err.message);
        }
    }

    function showPassword() {
        if (showPass) {
            setShowPass(false);
        } else {
            setShowPass(true);
        }
    }

    function showRepassword() {
        if (showRepass) {
            setShowRepass(false);
        } else {
            setShowRepass(true);
        }
    }

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                address: "",
                password: "",
                repass: "",
            }}
            onSubmit={onRegister}
            validationSchema={registerShema}
        >
            {(props) => (
                <Form className="form">
                    <h2>Тук може да създадете своя акаунт</h2>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    {isError ? <p className="error">{errMessage}</p> : ""}
                    <div className="field">
                        <CustomInput label="Име" type="text" name="username"/>
                    </div>
                    <div className="field">
                        <CustomInput label="Имейл" type="text" name="email"/>
                    </div>
                    <div className="field">
                        <CustomInput label="Адрес" type="text" name="address"/>
                    </div>
                    {showPass ? (
                        <div className="field">
                            <CustomInput label="Парола" type="text" name="password"/>
                            <i class="fa-regular fa-eye" onClick={showPassword}></i>
                        </div>
                    ) : (
                        <div className="field">
                            <CustomInput label="Парола" type="password" name="password"/>
                            <i class="fa-regular fa-eye-slash" onClick={showPassword}></i>
                        </div>
                    )}
                    {showRepass ? (
                        <div className="field">
                            <CustomInput label="Повторете паролата" type="text" name="repass"/>
                            <i class="fa-regular fa-eye" onClick={showRepassword}></i>
                        </div>
                    ) : (
                        <div className="field">
                            <CustomInput label="Повторете паролата" type="password" name="repass"/>
                            <i class="fa-regular fa-eye-slash" onClick={showRepassword}></i>
                        </div>
                    )}
                    <button type="submit">Регистрация</button>
                    <p>
                        Вече имате акаунт?
                        <Link to="/login">Влезте</Link> от тук.
                    </p>
                </Form>
            )}
        </Formik>
    );
}
