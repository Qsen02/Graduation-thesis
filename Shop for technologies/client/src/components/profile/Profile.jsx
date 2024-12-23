import { useUserContext } from "../../contexts/userContext";
import { useGetOneUser } from "../../hooks/useUser";
import HomeProducts from "../home/home-products/HomeProducts";
import ProfileOrders from "./profile-orders/ProfileOrders";

export default function Profile() {
    const { user } = useUserContext();
    const { profileUser, adminProducts, isLoading, isError } = useGetOneUser(
        {},
        user._id
    );

    return (
        <>
            {profileUser.isAdmin ? (
                <>
                    <section>
                        <div>
                            <h2>{profileUser.username}</h2>
                            <p>{profileUser.email}</p>
                            <p>{profileUser.address}</p>
                        </div>
                        <div>
                            <h2>Създадени продукти:</h2>
                            <h2>{adminProducts?.length}</h2>
                        </div>
                        <div>
                            <button>Редактирай профил</button>
                            <button>Промени парола</button>
                        </div>
                    </section>
                    <section>
                        {adminProducts?.length > 0 ? (
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
                <>
                    <section>
                        <div>
                            <h2>{profileUser.username}</h2>
                            <p>{profileUser.email}</p>
                            <p>{profileUser.address}</p>
                        </div>
                        <div>
                            <h2>Брой поръчки:</h2>
                            <h2>{profileUser.orderHistory?.length}</h2>
                        </div>
                        <div>
                            <button>Редактирай профил</button>
                            <button>Промени парола</button>
                        </div>
                    </section>
                    <h2>Вашите поръчки</h2>
                    <section>
                        {profileUser.orderHistory?.length > 0 ? (
                            profileUser.orderHistory?.map((el) => (
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
            )}
        </>
    );
}
