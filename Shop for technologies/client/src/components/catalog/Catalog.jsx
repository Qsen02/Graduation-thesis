import { useGetAllProducts } from "../../hooks/useProducts";
import HomeProducts from "../home/home-products/HomeProducts";

export default function Catalog() {
    const { products, isLoading, isError } = useGetAllProducts([]);

    return (
        <section>
            <form>
                <h2>Търсете продукти</h2>
                <input
                    type="text"
                    name="query"
                    id="query"
                    placeholder="Въведете критерии..."
                />
                <select>
                    <option value="name">Име</option>
                    <option value="price">Цена</option>
                    <option value="category">Категория</option>
                </select>
                <button type="submit">Търси</button>
            </form>
            <section>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : !isLoading && isError ? (
                    <section className="message">
                        <p>Нещо се обърка, моля опитайте по късно.</p>
                    </section>
                ) : products.length == 0 ? (
                    <section className="message">
                        <p>Няма продукти все още :(</p>
                    </section>
                ) : (
                    products.map((el) => (
                        <HomeProducts
                            key={el._id}
                            imageUrl={el.imageUrl}
                            name={el.name}
                            productId={el._id}
                            price={el.price}
                            category={el.category}
                        />
                    ))
                )}
            </section>
        </section>
    );
}
