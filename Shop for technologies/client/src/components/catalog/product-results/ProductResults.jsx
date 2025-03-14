import { Link } from "react-router-dom";
import styles from "./ProductResults.module.css";

export default function ProductResults({ productId, image, name }) {
    return (
        <Link to={`/catalog/${productId}`} className={styles.wrapper}>
            <section>
                <img src={image} />
                <h2>{name}</h2>
            </section>
        </Link>
    );
}
