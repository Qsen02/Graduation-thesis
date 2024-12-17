import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";
import { useUserContext } from "../../contexts/userContext";

export default function Logout() {
    const navigate = useNavigate();
    const { clearUserHandler } = useUserContext();

    function onLogout() {
        clearUserHandler();
        navigate("/login");
    }

    function onCancel() {
        history.back();
    }

    return (
        <section className={styles.logoutWrapper}>
            <h2>Сигурни ли сте, че искате да излете от акаунт си?</h2>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <div className={styles.buttons}>
                <button onClick={onLogout}>Да</button>
                <button onClick={onCancel}>He</button>
            </div>
        </section>
    );
}
