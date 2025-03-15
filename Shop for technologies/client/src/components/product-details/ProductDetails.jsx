import { Outlet, useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/useProducts";
import { useUserContext } from "../../contexts/userContext";
import styles from "./ProductDetails.module.css";
import ProductDetailsChars from "./product-details-chars/ProductDetailsChars";
import ProductDetailsButtons from "./product-details-buttons/ProductDetailsButtons";

export default function ProductDetails() {
    const { productId } = useParams();
    const { user,setUserHanlder } = useUserContext();
    const initialValues={
        name:"",
        price:0,
        imageUrl:"",
        description:"",
        characteristics:[],
        category:"",
    }
    const { product, setCurProduct, isError, isLoading } =
        useGetOneProduct(initialValues, productId);

    return (
        <>
            <Outlet context={{product,setCurProduct,isError,isLoading}} />
            <section className={styles.detailsWrapper}>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : !isLoading && isError ? (
                    <h2>Нещо се обърка, моля опитайте по късно!</h2>
                ) : (
                    <>
                        <section className={styles.header}>
                            <div className={styles.left}>
                                <img
                                    src={product.imageUrl}
                                    alt="details image"
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
                                    setUser={setUserHanlder}
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
