import { Form, Formik } from "formik";
import CustomInput from "../../commons/custom-input/CustomInput";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <Formik>
            {(props) => (
                <Form className="form">
                    <h2>Тук може да влезете в своя акаунт</h2>
                    <p class="field">
                        <CustomInput label="Име" type="text" name="username" />
                    </p>
                    <p class="field">
                        <CustomInput label="Парола" type="password" name="password" />
                    </p>
                    <button type="submit">Вход</button>
                    <p>Нямате акаунт все още? <Link to="/register">Регистрирайте</Link> се тук.</p>
                </Form>
            )}
        </Formik>
    );
}
