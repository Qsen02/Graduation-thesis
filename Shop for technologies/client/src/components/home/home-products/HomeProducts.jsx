import { Link } from "react-router-dom";
import styles from "./HomeProducts.module.css";

export default function HomeProducts({
  name,imageUrl,price,productId
}){
    return(
        <article className={styles.productItem}>
            <img src={imageUrl} alt={name}/>
            <h3>{name}</h3>
            <p>Цена: {price}лв.</p>
            <Link to={`/catalog/${productId}`}>Детайли</Link>
        </article>
    ) 
}