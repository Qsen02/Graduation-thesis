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

function App() {
    return (
        <UserContextProvider>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Redirect />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </UserContextProvider>
    );
}

export default App;
