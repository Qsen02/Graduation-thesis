import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import HeaderLinks from "./header-links/HeaderLinks";
import styles from "./Header.module.css";

export default function Header() {
    const {user}=useUserContext();
    const guestNav=[
        {name:"Каталог",link:"/catalog"},
        {name:"Вход",link:"/login"},
        {name:"Регистрация",link:"/register"}
    ]
    const userNav=[
        {name:"Каталог",link:"/catalog"},
        {name:"Количка",link:"/cart"},
        {name:"Профил",link:"/profile"},
        {name:"Изход",link:"/logout"}
    ]
    const adminNav=[
        {name:"Каталог",link:"/catalog"},
        {name:"Създай",link:"/create"},
        {name:"Профил",link:"/profile"},
        {name:"Изход",link:"/logout"}
    ]
    return (
        <header className={styles.navigation}>
            <nav>
                <ul>
                    <li>
                        <Link to="/home"><img src="assets/logo.png"/></Link>
                    </li>
                {
                  user
                  ? user.isAdmin
                    ? adminNav.map(el=><HeaderLinks key={el.name} name={el.name} link={el.link}/>)
                    : userNav.map(el=><HeaderLinks key={el.name} name={el.name} link={el.link}/>)
                  : guestNav.map(el=><HeaderLinks key={el.name} name={el.name} link={el.link}/>)
                }
                </ul>
            </nav>
        </header>
    );
}
