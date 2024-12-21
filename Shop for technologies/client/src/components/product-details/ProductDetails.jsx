import { Outlet, useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/useProducts";
import { useUserContext } from "../../contexts/userContext";
import styles from "./ProductDetails.module.css";
import ProductDetailsChars from "./product-details-chars/ProductDetailsChars";
import ProductDetailsButtons from "./product-details-buttons/ProductDetailsButtons";

export default function ProductDetails() {
    const { productId } = useParams();
    const { user } = useUserContext();
    const { product, setCurProduct, isError, isLoading } =
        useGetOneProduct({}, productId, user);

    return (
        <>
            <Outlet context={{ setCurProduct }} />
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
                                <ProductDetailsButtons
                                    user={user}
                                    product={product}
                                    setProductHandler={setCurProduct}
                                    id={productId}
                                />
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
