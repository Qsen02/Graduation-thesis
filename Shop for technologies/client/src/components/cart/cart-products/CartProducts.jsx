import styles from "./CartProducts.module.css";

export default function CartProducts({ imageUrl, name, price }) {
    return (
        <article className={styles.cartProductWrapper}>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{price}лв.</p>
            <button>Премахни</button>
        </article>
    );
}
