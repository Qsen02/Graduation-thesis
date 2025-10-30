import { Link } from "react-router-dom";
import styles from "../../../cart/cart-products/CartProducts.module.css";
import { imageErrorHandler } from "../../../../utils/imageErrorHandler";
import { addDots } from "../../../../utils/addDots";
import { host } from "../../../../api/requester";

export default function ProfileOrderProduct({ id, imageUrl, name, price }) {
    return (
        <article className={styles.cartProductWrapper}>
            <img src={imageUrl} alt={name} onError={imageErrorHandler} />
            {name.length >= 30 ? (
                <p className={styles.bold}>{addDots(name)}</p>
            ) : (
                <p className={styles.bold}>{name}</p>
            )}
            <p>{price}лв.</p>
            <Link to={`/catalog/${id}`}>
                <button>Детайли</button>
            </Link>
        </article>
    );
}
