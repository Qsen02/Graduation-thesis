import { Link, Outlet, useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/useProducts";
import { useUserContext } from "../../contexts/userContext";
import styles from "./ProductDetails.module.css";
import ProductDetailsChars from "./product-details-chars/ProductDetailsChars";

export default function ProductDetails() {
    const { productId } = useParams();
    const { user } = useUserContext();
    const { product, isError, isLoading, isLiked, isAdded } = useGetOneProduct(
        {},
        productId,
        user
    );

    return (
        <>
            <Outlet />
            <section className={styles.detailsWrapper}>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : !isLoading && isError ? (
                    <h2>Something went wrong, please try again later.</h2>
                ) : (
                    <>
                        <section className={styles.header}>
                            <div className={styles.left}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
                            </div>
                            <div className={styles.right}>
                                <h2>{product.name}</h2>
                                <p>Категория: {product.category}</p>
                                <p>Цена: {product.price}лв.</p>
                                {user ? (
                                    user.isAdmin ? (
                                        <div className={styles.buttons}>
                                            <Link
                                                to={`/catalog/${product._id}/delete`}
                                            >
                                                <button>Изтрий</button>
                                            </Link>
                                            <button>Редактирай</button>
                                        </div>
                                    ) : (
                                        <div className={styles.buttons}>
                                            {isLiked ? (
                                                <div className={styles.likes}>
                                                    <i
                                                        className="fa-solid fa-heart"
                                                        id={styles.liked}
                                                    ></i>
                                                    <p>
                                                        {product.likes?.length}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className={styles.likes}>
                                                    <i className="fa-regular fa-heart"></i>
                                                    <p>
                                                        {product.likes?.length}
                                                    </p>
                                                </div>
                                            )}
                                            {isAdded ? (
                                                <button
                                                    className={styles.added}
                                                >
                                                    Добавено в количка!
                                                </button>
                                            ) : (
                                                <button>
                                                    Добави в количка
                                                </button>
                                            )}
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </div>
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </section>
                        <section className={styles.body}>
                            <p className={styles.description}>
                                {product.description}
                            </p>
                            <div className={styles.characteristics}>
                                <h2>Характеристики:</h2>
                                {product.characteristics?.map((el) => (
                                    <ProductDetailsChars key={el} text={el} />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </section>
        </>
    );
}
