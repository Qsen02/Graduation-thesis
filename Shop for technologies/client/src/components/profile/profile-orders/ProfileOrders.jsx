import { Link } from "react-router-dom";

export default function ProfileOrders({
     orderId,totalPrice,date
}) {
    return (
        <Link to={`/profile/orders/${orderId}`}>
            <article>
                <p>Обща цена: {totalPrice}лв.</p>
                <p>Дата: {date}</p>
            </article>
        </Link>
    );
}
