import { NavLink } from "react-router-dom";
import styles from "./HeaderLinks.module.css";

export default function HeaderLinks({ name, link }) {
    return (
        <li class={styles.linkItem}>
            <NavLink
                style={({isActive}) =>
                    isActive ? { color: "lightgrey" } : {}
                }
                to={link}
            >
                {name}
            </NavLink>
        </li>
    );
}
