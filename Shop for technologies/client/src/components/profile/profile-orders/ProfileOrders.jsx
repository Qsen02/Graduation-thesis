import { Link } from "react-router-dom";
import styles from "./ProfileOrders.module.css";

export default function ProfileOrders({
     orderId,totalPrice,date
}) {

const newDate=new Date(date);

    return (
        <Link to={`/profile/orders/${orderId}`} className={styles.orderItem}>
            <article>
                <p>Обща цена: {totalPrice}лв.</p>
                <p>Дата: {`${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getFullYear()}`}, Час: {`${newDate.getHours()}:${newDate.getMinutes()}`}</p>
            </article>
        </Link>
    );
}
