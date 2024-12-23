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
import Cart from "./components/cart/cart";
import NoProducts from "./components/cart/no-products/NoPoroducts";
import Profile from "./components/profile/Profile";

function App() {
    return (
        <UserContextProvider>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Redirect />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:productId" element={<ProductDetails />}>
                        <Route path="delete" element={<ProductsDelete />} />
                        <Route path="edit" element={<ProductsEdit />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/cart" element={<Cart />} >
                        <Route path="no-products" element={<NoProducts/>}/>
                    </Route>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </UserContextProvider>
    );
}

export default App;
