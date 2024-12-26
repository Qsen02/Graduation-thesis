import { useRemoveProductFromCart } from "../../../hooks/useProducts";
import styles from "./CartProducts.module.css";

export default function CartProducts({
    id,
    imageUrl,
    name,
    price,
    user,
    setProduct,
    setUser
}) {
    const removeProductFromCart = useRemoveProductFromCart();

    async function onRemove() {
        const updatedUser = await removeProductFromCart(id);
        setProduct(updatedUser.basket);
        user.basket=updatedUser.basket.map(el=>el._id);
        setUser(user);
    }

    return (
        <article className={styles.cartProductWrapper}>
            <img src={imageUrl} alt={name} />
            <p className={styles.bold}>{name}</p>
            <p>{price}лв.</p>
            <button onClick={onRemove}>Премахни</button>
        </article>
    );
}
