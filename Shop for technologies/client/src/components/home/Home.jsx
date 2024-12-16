import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home(){
    return (
        <section className={styles.homeWrapper}>
            <section className={styles.title}>
                <h1>Добре дошли в нашия сайт за техника!</h1>
                <p>Тук ще намерите най-различна , разнообразна и съвременна техника!</p>
                <p>Можете да разгледате нашите продукти тук в нашия <Link to="/catalog">Каталог</Link>.</p>
            </section>
        </section>
    )
}