import { Link } from "react-router-dom";
import { useAddToCart, useLikeProduct, useUnlikeProduct } from "../../../hooks/useProducts";
import styles from "../ProductDetails.module.css";

export default function ProductDetailsButtons({
    user,
    product,
    setProductHandler,
    id,
    setUser
}) {
    const likeProduct = useLikeProduct();
    const unlikeProduct = useUnlikeProduct();
    const addProductToCart=useAddToCart();

    async function onLike() {
        const newProduct = await likeProduct(id);
        setProductHandler(newProduct);
    }

    async function onUnlike() {
        const newProduct = await unlikeProduct(id);
        setProductHandler(newProduct);
    }

    async function addProduct(){
        const addedProduct=await addProductToCart(id);
        user.basket.push(addedProduct._id);
        setUser(user);
        setProductHandler(addedProduct);
    }

    return (
        <>
            {user ? (
                user.isAdmin ? (
                    <div className={styles.buttons}>
                        <div className={styles.likes}>
                            <i
                                className="fa-solid fa-heart"
                                id={styles.liked}
                            ></i>
                            <p>{product.likes?.length}</p>
                        </div>
                        <Link to={`/catalog/${product._id}/delete`}>
                            <button>Изтрий</button>
                        </Link>
                        <Link to={`/catalog/${product._id}/edit`}>
                            <button>Редактирай</button>
                        </Link>
                    </div>
                ) : (
                    <div className={styles.buttons}>
                        {Boolean(
                            product.likes?.find((el) => el._id == user._id)
                        ) ? (
                            <div className={styles.likes}>
                                <i
                                    onClick={onUnlike}
                                    className="fa-solid fa-heart"
                                    id={styles.liked}
                                ></i>
                                <p>{product.likes?.length}</p>
                            </div>
                        ) : (
                            <div className={styles.likes}>
                                <i
                                    className="fa-regular fa-heart"
                                    onClick={onLike}
                                ></i>
                                <p>{product.likes?.length}</p>
                            </div>
                        )}
                        {Boolean(
                            user.basket?.find((el) => el == product._id)
                        ) ? (
                            <button className={styles.added}>
                                Добавено в количка!
                            </button>
                        ) : (
                            <button onClick={addProduct}>Добави в количка</button>
                        )}
                        <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>
                    </div>
                )
            ) : (
                ""
            )}
        </>
    );
}
