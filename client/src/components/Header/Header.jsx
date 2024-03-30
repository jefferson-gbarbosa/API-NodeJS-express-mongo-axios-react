import '../Header/Header.css';
import ButtonOpen from '../LinkButton/ButtonOpen';
import ButtonLogout from '../ButtonLogout/ButtonLogout';
import List from '../List/List'
import User from '../User/User'
import {Link} from 'react-router-dom';

function Header(){
    const state = window.localStorage.getItem("loggedIn");
    return(
        <header className="header">
            <nav className="nav container">
                <Link to="/" className="logo">LOGO</Link>
                <ul className="nav-list">
                    { state ?   <User /> :  <List />}
                    { state ? <ButtonLogout /> : <ButtonOpen />}
                 </ul>
            </nav>
        </header>
    )
 }
 export default Header;

