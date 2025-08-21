import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Redirect from "./commons/redirect/Redirect";
import NotFound from "./components/not-found/NotFound";
import Catalog from "./components/catalog/Catalog";
import UserContextProvider from "./contexts/userContext";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Create from "./components/create/Create";
import ProductDetails from "./components/product-details/ProductDetails";
import ProductsDelete from "./components/products-delete/ProductsDelete";
import ProductsEdit from "./components/products-edit/ProductsEdit";
import NoProducts from "./components/cart/no-products/NoPoroducts";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/cart";
import ProfileOrdersDetails from "./components/profile/profile-orders-details/ProdileOrdersDetails";
import ProfileEdit from "./components/profile/profile-edit/ProfileEdit";
import ProfileChangePassword from "./components/profile/profile-change-password/ProfileChangePassword";
import ProfileSuccessfullyChanged from "./components/profile/profile-successfully-changed/ProfileSuccessfullyChanged";
import GuestGuard from "./commons/guards/GuestGuard";
import UserGuard from "./commons/guards/UserGuard";
import AdminGuard from "./commons/guards/AdminGuard";
import OnlyUsersGuard from "./commons/guards/OnlyUsersGuard";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

function App() {
    return (
        <UserContextProvider>
            <Header />
            <main>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route
                            path="/catalog/:productId"
                            element={<ProductDetails />}
                        >
                            <Route element={<AdminGuard />}>
                                <Route
                                    path="delete"
                                    element={<ProductsDelete />}
                                />
                                <Route path="edit" element={<ProductsEdit />} />
                            </Route>
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<UserGuard />}>
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/profile" element={<Profile />}>
                                <Route path="edit" element={<ProfileEdit />} />
                                <Route
                                    path="changePassword"
                                    element={<ProfileChangePassword />}
                                />
                                <Route
                                    path="successfullyChanged"
                                    element={<ProfileSuccessfullyChanged />}
                                />
                            </Route>
                        </Route>
                        <Route element={<AdminGuard />}>
                            <Route path="/create" element={<Create />} />
                        </Route>
                        <Route element={<OnlyUsersGuard />}>
                            <Route path="/cart" element={<Cart />}>
                                <Route
                                    path="no-products"
                                    element={<NoProducts />}
                                />
                            </Route>
                            <Route
                                path="/profile/orders/:orderId"
                                element={<ProfileOrdersDetails />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ErrorBoundary>
            </main>
            <Footer />
        </UserContextProvider>
    );
}

export default App;
