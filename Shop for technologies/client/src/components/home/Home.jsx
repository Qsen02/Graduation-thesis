import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useGetLatsetProducts } from "../../hooks/useProducts";
import HomeProducts from "./home-products/HomeProducts";

export default function Home() {
	const {
		products,
		isLoading,
		isError,
		curProductCount,
		setCurProductCount,
	} = useGetLatsetProducts([]);

	function onProductCountChange(e) {
		setCurProductCount(Number(e.target.value));
	}

	return (
		<section className={styles.homeWrapper}>
			<section className={styles.titleWrapper}>
				<section className={styles.title}>
					<h1>Добре дошли в нашия сайт за техника!</h1>
					<p>
						Тук ще намерите най-различна , разнообразна и съвременна
						техника!
					</p>
					<p>
						Можете да разгледате нашите продукти тук в нашия{" "}
						<Link to="/catalog">Каталог</Link>.
					</p>
				</section>
				<div className={styles.productCount}>
					<p>Изберете по колко продукта да виждате</p>
					<select
						onChange={onProductCountChange}
						value={curProductCount}
					>
						<option value="3">3</option>
						<option value="6">6</option>
						<option value="9">9</option>
						<option value="12">12</option>
						<option value="15">15</option>
					</select>
				</div>
			</section>
			<h1>Най-новите продукти</h1>
			<section className={styles.productWrapper}>
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
