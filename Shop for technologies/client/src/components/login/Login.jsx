import { Form, Formik } from "formik";
import CustomInput from "../../commons/custom-input/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useUser";
import { loginShema } from "../../shemas";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { setUserData } from "../../utils/userHelper";

export default function Login() {
    const login = useLogin();
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const { setUserHanlder } = useUserContext();
    const navigate = useNavigate();

    async function onLogin(value, actions) {
        try {
            const username = value.username;
            const password = value.password;
            const user = await login({ username, password });
            setUserHanlder(user);
            actions.resetForm();
            navigate("/home");
        } catch (err) {
            setIsError(true);
            setErrMessage(err.message);
        }
    }

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={onLogin}
            validationSchema={loginShema}
        >
            {(props) => (
                <Form className="form">
                    <h2>Тук може да влезете в своя акаунт</h2>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    {isError ? <p className="error">{errMessage}</p> : ""}
                    <div className="field">
                        <CustomInput label="Име" type="text" name="username" />
                    </div>
                    <div className="field">
                        <CustomInput
                            label="Парола"
                            type="password"
                            name="password"
                        />
                    </div>
                    <button type="submit">Вход</button>
                    <p>
                        Нямате акаунт все още?
                        <Link to="/register">Регистрирайте</Link> се тук.
                    </p>
                </Form>
            )}
        </Formik>
    );
}
