import { useNavigate } from "react-router-dom";

export default function NoProducts() {
    const navigate = useNavigate();

    function onBack() {
        navigate("/cart");
    }

    return (
        <div className="modal">
            <section className="modalWrapper">
                <h2>Няма продукти в количаката!</h2>
                <button onClick={onBack}>ОК</button>
            </section>
        </div>
    );
}
