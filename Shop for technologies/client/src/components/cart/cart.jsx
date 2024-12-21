import { useUserContext } from "../../contexts/userContext";
import { useUserCart } from "../../hooks/useUser";
import CartProducts from "./cart-products/CartProducts";

export default function Cart() {
    const { user } = useUserContext();
    const { products, isLoading, isError } = useUserCart([], user._id);

    return (
        <section>
            <h2>Вашата количка с продукти.</h2>
            <section>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : isError && products.length <= 0? (
                    <h2>Нещо се обърка, моля опитайте по късно!</h2>
                ) : products.length <= 0 ? (
                    <h2>Няма добавени продукти все още</h2>
                ) : (
                    products.map((el) => (
                        <CartProducts
                            key={el._id}
                            imageUrl={el.imageUrl}
                            name={el.name}
                            price={el.price}
                        />
                    ))
                )}
            </section>
            <div className="buttons">
                <button>Изчисти количка</button>
                <button>Купи продуктите</button>
            </div>
        </section>
    );
}
