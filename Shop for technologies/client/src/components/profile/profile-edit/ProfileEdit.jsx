import { Form, Formik } from "formik";
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomInput from "../../../commons/custom-input/CustomInput";
import styles from "./ProfileEdit.module.css";
import { editProfileShema } from "../../../shemas";
import { useState } from "react";
import { useEditUser } from "../../../hooks/useUser";

export default function ProfileEdit() {
    const { profileUser, setUserOnProfile, curUser, isLoading, isError } = useOutletContext();
    const [errMessage, setErrMessage] = useState("");
    const [error, setError] = useState(false);
    const editUser = useEditUser();
    const navigate = useNavigate();

    function onBack() {
        navigate("/profile");
    }

    async function onEdit(value, actions) {
        const username = value.username;
        const email = value.email;
        const address = value.address;

        try {
            const newUser = await editUser(profileUser._id, {
                username,
                email,
                address,
            });
            setUserOnProfile(newUser);
            curUser.username = newUser.username;
            curUser.email = newUser.email;
            curUser.address = newUser.address;
            actions.resetForm();
            navigate("/profile");
        } catch (err) {
            setError(true);
            setErrMessage(err.message);
        }
    }

    return (
        <Formik
            initialValues={{
                username: profileUser.username,
                email: profileUser.email,
                address: profileUser.address,
            }}
            validationSchema={editProfileShema}
            onSubmit={onEdit}
            enableReinitialize
        >
            {(props) => (
                <div className="modal">
                    <Form className="form">
                        {isLoading && !isError ? (
                            <span className="loader"></span>
                        ) : isError ? (
                            <h2>Нещо се обърка, моля опитайте по късно.</h2>
                        ) : (
                            <>
                                <h2>Редактирай профила си тук</h2>
                                { error ? <p className="error">{errMessage}</p> : "" }
                                <CustomInput label="Име" type="text" name="username"/>
                                <CustomInput label="Имейл" type="text" name="email"/>
                                <CustomInput label="Адрес" type="text" name="address"/>
                                <div className={styles.buttons}>
                                    <button onClick={onBack}>Отмяна</button>
                                    <button type="submit">Запази</button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            )}
        </Formik>
    );
}
