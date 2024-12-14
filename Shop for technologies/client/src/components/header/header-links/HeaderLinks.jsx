import { NavLink } from "react-router-dom";

export default function HeaderLinks({
     name,
     link
}) {
    return (
        <li>
            <NavLink to={link}>{name}</NavLink>
        </li>
    );
}
