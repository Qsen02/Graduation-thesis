import { Link } from "react-router-dom";
import styles from "../../../cart/cart-products/CartProducts.module.css";

export default function ProfileOrderProduct({
    id,
    imageUrl,
    name,
    price,
}){
    return (
        <article className={styles.cartProductWrapper}>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{price}лв.</p>
            <Link to={`/catalog/${id}`}><button>Детайли</button></Link>
        </article>
    )
}