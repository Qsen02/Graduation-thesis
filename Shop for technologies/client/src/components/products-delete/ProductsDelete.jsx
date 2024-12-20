import { useParams } from "react-router-dom";
import { useDeleteProduct } from "../../hooks/useProducts";

export default function ProductsDelete() {
    const { productId } = useParams();
    const { product, deleteThisProduct, navigate, isLoading, isError } =
        useDeleteProduct({}, productId);

    function onCancel() {
        navigate(`/catalog/${productId}`);
    }

    async function onDelete() {
        await deleteThisProduct(productId);
        navigate("/catalog");
    }

    return (
        <div className="modal">
            <section className="modalWrapper">
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : isError ? (
                    <h2>Something went wrong, please try again later</h2>
                ) : (
                    <>
                        <h2>
                            Сигурни ли сте че искате да изтриете {product.name}?
                        </h2>
                        <div>
                            <button onClick={onDelete}>Да</button>
                            <button onClick={onCancel}>He</button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
