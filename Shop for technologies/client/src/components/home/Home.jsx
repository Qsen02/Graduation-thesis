import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useGetLatsetProducts } from "../../hooks/useProducts";
import HomeProducts from "./home-products/HomeProducts";

export default function Home() {
    const { products, isLoading, isError } = useGetLatsetProducts([]);

    return (
        <section className={styles.homeWrapper}>
            <section className={styles.title}>
                <h1>Добре дошли в нашия сайт за техника!</h1>
                <p>
                    Тук ще намерите най-различна , разнообразна и съвременна
                    техника!
                </p>
                <p>
                    Можете да разгледате нашите продукти тук в нашия{" "}
                    <Link to="/catalog">Каталог</Link>.
                </p>
            </section>
            <h1>Най-новите продукти</h1>
            <section className={styles.productWrapper}>
                {products.length == 0 ? (
                    <section className="message">
                        <p>Няма продукти все още :(</p>
                    </section>
                ) : (
                    products.map((el) => (
                        <HomeProducts
                            key={el._id}
                            imageUrl={el.imageUrl}
                            name={el.name}
                            productId={el._id}
                            price={el.price}
                        />
                    ))
                )}
            </section>
        </section>
    );
}
