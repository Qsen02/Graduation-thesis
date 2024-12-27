import { Link } from "react-router-dom";
import styles from "./HomeProducts.module.css";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import { addDots } from "../../../utils/addDots";

export default function HomeProducts({
    name,
    imageUrl,
    price,
    productId,
    category,
}) {
    return (
        <article className={styles.productItem}>
            <img src={imageUrl} alt={name} onError={imageErrorHandler} />
            {name.length >= 30 ? (
                <h3 className={styles.bold}>{addDots(name)}</h3>
            ) : (
                <h3 className={styles.bold}>{name}</h3>
            )}
            <p>Категория: {category}</p>
            <p>Цена: {price}лв.</p>
            <Link to={`/catalog/${productId}`}>Детайли</Link>
        </article>
    );
}
