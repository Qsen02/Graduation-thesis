import { useParams } from "react-router-dom";
import { useGetOneOrder } from "../../../hooks/useOrders";
import ProfileOrderProduct from "./profile-order-product/ProfileOrderProduct";
import styles from "../../cart/Cart.module.css";

export default function ProfileOrdersDetails() {
    const { orderId } = useParams();
    const { order, isError, isLoading, navigate } = useGetOneOrder({}, orderId);

    function onBack() {
        navigate("/profile");
    }

    return (
        <section className={styles.cartWrapper}>
            <div className={styles.title}>
                <h2>Продукти в поръчката:</h2>
            </div>
            <section className={styles.products}>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : isError ? (
                    <h2>Нещо се обърка, моля опитайте по късно.</h2>
                ) : (
                    order.products?.map((el) => (
                        <ProfileOrderProduct
                            key={el._id}
                            id={el._id}
                            imageUrl={el.imageUrl}
                            name={el.name}
                            price={el.price}
                        />
                    ))
                )}
            </section>
            <div className={styles.buttons}>
                <button onClick={onBack}>Назад</button>
                <p>Общо: {order.totalPrice}лв.</p>
            </div>
        </section>
    );
}
