import { Form, Formik } from "formik";
import CustomInput from "../../../commons/custom-input/CustomInput";
import { useState } from "react";
import styles from "./ProfileChangePassword.module.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/userContext";
import { useChangePassword } from "../../../hooks/useUser";
import { changePasswordSchema } from "../../../shemas";

export default function ProfileChangePassword() {
    const { user } = useUserContext();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const changePassword = useChangePassword();
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    function showPassword() {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    function onBack(){
        navigate("/profile");
    }

    async function onChange(value, actions) {
        const newPassword = value.newPassword;
        try {
            await changePassword(user._id,{newPassword});
            actions.resetForm();
            navigate("/profile/successfullyChanged");
        } catch (err) {
            setIsError(true);
            setErrMessage(err.message);
        }
    }

    return (
        <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={onChange}
            validationSchema={changePasswordSchema}
        >
            {(props) => (
                <div className="modal">
                    <Form className="form">
                        <h2>Променете паролата си тук</h2>
                        {isError ? <p className="error">{errMessage}</p> : ""}
                        {show ? (
                            <div className={styles.field}>
                                <CustomInput type="text" name="newPassword" />
                                <i
                                    className="fa-regular fa-eye"
                                    onClick={showPassword}
                                ></i>
                            </div>
                        ) : (
                            <div className={styles.field}>
                                <CustomInput type="password" name="newPassword" />
                                <i
                                    className="fa-regular fa-eye-slash"
                                    onClick={showPassword}
                                ></i>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <button onClick={onBack}>Отмени</button>
                            <button type="submit">Запази</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
