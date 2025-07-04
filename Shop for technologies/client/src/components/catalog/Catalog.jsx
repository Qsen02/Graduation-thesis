import {
    useGetAllProducts,
    usePagination,
    useSearchProducts,
} from "../../hooks/useProducts";
import HomeProducts from "../home/home-products/HomeProducts";
import styles from "./Catalog.module.css";
import { Form, Formik } from "formik";
import CustomSelect from "../../commons/custom-select/CustomSelect";
import { useState } from "react";
import { getAllProducts } from "../../api/productService";
import CustomSearchInput from "../../commons/custom-search-input/CustomSearchInput";
import ProductResults from "./product-results/ProductResults";

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const {
        products,
        setProducts,
        isLoading,
        setLoading,
        isError,
        setError,
        maximumPage,
    } = useGetAllProducts([]);
    const searchProducts = useSearchProducts();
    const { curPage, setCurPage } = usePagination(
        1,
        setProducts,
        setError,
        setLoading
    );
    const [typed, setTyped] = useState(false);
    const [results, setResults] = useState([]);

    async function onSearch(value) {
        try {
            setLoading(true);
            setIsSearched(true);
            let query = value.query;
            const criteria = value.criteria;
            if (query == "") {
                query = "No value";
                setIsSearched(false);
                const { products } = await getAllProducts();
                setProducts({ type: "getAll", payload: products });
            } else {
                const products = await searchProducts(query, criteria);
                setProducts({ type: "search", payload: products });
            }
            setTyped(false);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    function firstPage() {
        setCurPage(1);
    }

    function nextPage() {
        setCurPage((page) => page + 1);
    }

    function previousPage() {
        setCurPage((page) => page - 1);
    }

    function lastPage() {
        setCurPage(maximumPage);
    }

    async function checkResultsOnChange(value) {
        try {
            setLoading(true);
            setTyped(true);
            let query = value.query;
            const criteria = value.criteria;
            if (query == "") {
                const { products } = await getAllProducts();
                setResults(products);
            } else {
                const products = await searchProducts(query, criteria);
                setResults(products);
            }
            setLoading(false);
        } catch (err) {
            setTyped(false);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <section className={styles.catalogWrapper}>
            <Formik
                initialValues={{ query: "", criteria: "name" }}
                onSubmit={onSearch}
            >
                {(props) => (
                    <Form>
                        <h2>Търсете продукти</h2>
                        <div>
                            <CustomSearchInput
                                label=""
                                changeHandler={checkResultsOnChange}
                                type="text"
                                name="query"
                                id="query"
                                placeholder="Въведете критерии..."
                            />
                            <CustomSelect name="criteria" />
                            <button type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        {typed? (
                            <section className={styles.resultWrapper}>
                                {results.length > 0 ? (
                                    results.map((el) => (
                                        <ProductResults
                                            key={el._id}
                                            productId={el._id}
                                            image={el.imageUrl}
                                            name={el.name}
                                        />
                                    ))
                                ) : (
                                    <h2>Няма намерени резултати.</h2>
                                )}
                            </section>
                        ) : (
                            ""
                        )}
                    </Form>
                )}
            </Formik>
            {!typed ? <h2>Всички продукти</h2> : ""}
            <section className={styles.productWrapper}>
                {isLoading && !isError ? (
                    <span className="loader"></span>
                ) : !isLoading && isError ? (
                    <div className="message">
                        <p>Нещо се обърка, моля опитайте по късно.</p>
                    </div>
                ) : products.length == 0 && !isSearched ? (
                    <div className="message">
                        <p>Няма продукти все още :(</p>
                    </div>
                ) : products.length == 0 && isSearched ? (
                    <div className="message">
                        <p>Няма резултати :(</p>
                    </div>
                ) : !typed ? (
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
                ) : (
                    ""
                )}
            </section>
            {!isSearched && !isError && !typed && products.length>0? (
                <section className={styles.pagination}>
                    <button onClick={firstPage}>
                        <i className="fa-solid fa-angles-left"></i>
                    </button>
                    {curPage <= 1 ? (
                        ""
                    ) : (
                        <button onClick={previousPage}>
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    )}
                    <p>
                        {curPage} от {maximumPage}
                    </p>
                    {curPage >= maximumPage ? (
                        ""
                    ) : (
                        <button onClick={nextPage}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    )}
                    <button onClick={lastPage}>
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}
