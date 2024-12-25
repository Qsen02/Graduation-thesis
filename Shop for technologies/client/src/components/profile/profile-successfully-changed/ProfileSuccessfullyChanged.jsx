import { useNavigate } from "react-router-dom";

export default function ProfileSuccessfullyChanged() {
    const navigate = useNavigate();

    function onBack() {
        navigate("/profile");
    }

    return (
        <div className="modal">
            <section className="modalWrapper">
                <h2>Паролата е променена успешно!</h2>
                <button onClick={onBack}>ОК</button>
            </section>
        </div>
    );
}
