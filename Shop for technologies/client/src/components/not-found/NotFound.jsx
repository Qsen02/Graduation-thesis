import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound(){
    return (
        <section className={styles.notFoundwrapper}>
            <h2>Страницата не е намерена!</h2>
            <p>Моля върнете се в <Link to="/">Начало</Link>.</p>
        </section>
    )
}