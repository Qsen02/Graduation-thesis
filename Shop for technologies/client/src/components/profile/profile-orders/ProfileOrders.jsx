import { Link } from "react-router-dom";
import styles from "./ProfileOrders.module.css";

export default function ProfileOrders({
     orderId,totalPrice,date
}) {
    return (
        <Link to={`/profile/orders/${orderId}`} className={styles.orderItem}>
            <article>
                <p>Обща цена: {totalPrice}лв.</p>
                <p>Дата: {date}</p>
            </article>
        </Link>
    );
}
