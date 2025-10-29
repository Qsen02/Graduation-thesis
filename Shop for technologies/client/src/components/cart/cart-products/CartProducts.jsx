import { host } from "../../../api/requester";
import { useRemoveProductFromCart } from "../../../hooks/useProducts";
import { addDots } from "../../../utils/addDots";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import styles from "./CartProducts.module.css";

export default function CartProducts({
    id,
    imageUrl,
    name,
    price,
    user,
    setProduct,
    setUser,
}) {
    const removeProductFromCart = useRemoveProductFromCart();

    async function onRemove() {
        const updatedUser = await removeProductFromCart(id);
        setProduct(updatedUser.basket);
        user.basket = updatedUser.basket.map((el) => el._id);
        setUser(user);
    }

    return (
        <article className={styles.cartProductWrapper}>
            <img src={`${host}/${imageUrl}`} alt={name} onError={imageErrorHandler} />
            {name.length >= 30 ? (
                <p className={styles.bold}>{addDots(name)}</p>
            ) : (
                <p className={styles.bold}>{name}</p>
            )}
            <p>{price}лв.</p>
            <button onClick={onRemove}>Премахни</button>
        </article>
    );
}
