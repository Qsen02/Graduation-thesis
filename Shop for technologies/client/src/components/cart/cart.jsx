import { useUserContext } from "../../contexts/userContext";
import { useUserCart } from "../../hooks/useUser";
import CartProducts from "./cart-products/CartProducts";
import styles from "./Cart.module.css";

export default function Cart() {
    const { user,setUserHanlder} = useUserContext();
    const { products,setProductHandler, isLoading, isError,totalPrice } = useUserCart([], user._id);

    return (
        <section className={styles.cartWrapper}>
            <div className={styles.title}>
                <h2>Вашата количка с продукти.</h2>
            </div>
            <section className={styles.products}>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : isError && products.length <= 0 ? (
                    <h2>Нещо се обърка, моля опитайте по късно!</h2>
                ) : products.length <= 0 ? (
                    <h2>Няма добавени продукти все още</h2>
                ) : (
                    products.map((el) => (
                        <CartProducts
                            key={el._id}
                            id={el._id}
                            imageUrl={el.imageUrl}
                            name={el.name}
                            price={el.price}
                            user={user}
                            setProduct={setProductHandler}
                            setUser={setUserHanlder}
                        />
                    ))
                )}
            </section>
            <div className={styles.buttons}>
                <button>Изчисти количка</button>
                <button>Купи продуктите</button>
                <p>Общо: {totalPrice}лв.</p>
            </div>
        </section>
    );
}
