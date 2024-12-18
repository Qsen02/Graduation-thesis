import { useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/useProducts";

export default function ProductDetails() {
    const { productId } = useParams();
    const { product, isError, isLoading } = useGetOneProduct({}, productId);

    return (
        <section>
            <img src={product.imageUrl} alt={product.name}/>
            <h2>{product.name}</h2>
            <div>
                <p>Категория: {product.category}</p>
                <p>Цена: {product.price}лв.</p>
            </div>
            <p>{product.description}</p>
            {
                product.characteristics?.map(el=><div><p>{el}</p></div>)
            }
        </section>
    );
}
