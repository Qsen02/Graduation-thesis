import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Redirect from "./commons/redirect/Redirect";

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Redirect/>}/>
                    <Route path="/home" element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
