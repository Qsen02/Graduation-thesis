import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import { useGetOneUser } from "../../hooks/useUser";
import HomeProducts from "../home/home-products/HomeProducts";
import ProfileOrders from "./profile-orders/ProfileOrders";
import styles from "./Profile.module.css";

export default function Profile() {
    const { user } = useUserContext();
    const initialValues = {
        _id: "",
        username: "",
        address: "",
        email: "",
        orderHistory: [],
        basket: [],
    };
    const {
        profileUser,
        setUserOnProfile,
        adminProducts,
        isLoading,
        isError,
        isAdmin,
    } = useGetOneUser(initialValues, user._id);

    return (
        <>
            <Outlet
                context={{
                    profileUser,
                    setUserOnProfile,
                    curUser:user,
                    isLoading,
                    isError
                }}
            />
            {isAdmin ? (
                <>
                    <section className={styles.profileHeader}>
                        {isLoading && !isError ? (
                            <span className="loader"></span>
                        ) : isError ? (
                            <h2>Нещо се обърка, моля опитайте по късно.</h2>
                        ) : (
                            <section className={styles.headerData}>
                                <div>
                                    <h2>{profileUser.username}</h2>
                                    <p>{profileUser.email}</p>
                                    <p>{profileUser.address}</p>
                                </div>
                                <div>
                                    <h2>Създадени продукти:</h2>
                                    <h2>{adminProducts?.length}</h2>
                                </div>
                            </section>
                        )}
                        <div className={styles.buttons}>
                            <Link to="/profile/edit">
                                <button>Редактирай профил</button>
                            </Link>
                            <button>Промени парола</button>
                        </div>
                    </section>
                    {!isError ? (
                        <>
                            <h2 className={styles.title}>
                                Всички създадени продукти
                            </h2>
                            <section className={styles.profileAdminBody}>
                                {isLoading && !isError ? (
                                    <span className="loader"></span>
                                ) : adminProducts?.length > 0 ? (
                                    adminProducts?.map((el) => (
                                        <HomeProducts
                                            key={el._id}
                                            imageUrl={el.imageUrl}
                                            name={el.name}
                                            productId={el._id}
                                            price={el.price}
                                            category={el.category}
                                        />
                                    ))
                                ) : (
                                    <div className="message">
                                        <p>Няма създадени продукти все още</p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <>
                    <section className={styles.profileHeader}>
                        {isLoading && !isError ? (
                            <span className="loader"></span>
                        ) : isError ? (
                            <h2>Нещо се обърка, моля опитайте по късно.</h2>
                        ) : (
                            <section className={styles.headerData}>
                                <div>
                                    <h2>{profileUser.username}</h2>
                                    <p>{profileUser.email}</p>
                                    <p>{profileUser.address}</p>
                                </div>
                                <div>
                                    <h2>Брой поръчки:</h2>
                                    <h2>{profileUser.orderHistory.length}</h2>
                                </div>
                            </section>
                        )}
                        <div className={styles.buttons}>
                            <Link to="/profile/edit">
                                <button>Редактирай профил</button>
                            </Link>
                            <button>Промени парола</button>
                        </div>
                    </section>
                    {!isError ? (
                        <>
                            <h2 className={styles.title}>Вашите поръчки</h2>
                            <section className={styles.profileUserBody}>
                                {isLoading && !isError ? (
                                    <span className="loader"></span>
                                ) : profileUser.orderHistory.length > 0 ? (
                                    profileUser.orderHistory.map((el) => (
                                        <ProfileOrders
                                            key={el._id}
                                            orderId={el._id}
                                            totalPrice={el.totalPrice}
                                            date={el.created_at}
                                        />
                                    ))
                                ) : (
                                    <div className="message">
                                        <p>Няма поръчки все още</p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        ""
                    )}
                </>
            )}
        </>
    );
}
