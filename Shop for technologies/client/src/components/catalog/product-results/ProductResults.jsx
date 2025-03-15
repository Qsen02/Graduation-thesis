import { Link } from "react-router-dom";
import styles from "./ProductResults.module.css";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import { addDots } from "../../../utils/addDots";

export default function ProductResults({ productId, image, name }) {
    return (
        <Link to={`/catalog/${productId}`} className={styles.wrapper}>
            <section>
                <img src={image} onError={imageErrorHandler}/>
                {name.length >= 30 ? (
                    <h2>{addDots(name)}</h2>
                ) : (
                    <h2>{name}</h2>
                )}
            </section>
        </Link>
    );
}
