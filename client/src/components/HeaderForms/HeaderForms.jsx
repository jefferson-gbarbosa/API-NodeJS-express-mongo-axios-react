import '../Header/Header.css';
import {Link} from 'react-router-dom';

function HeaderForms(){
    return(
        <header className="header">
            <nav className="nav container">
                <Link to="/" className="logo">LOGO</Link>
            </nav>
        </header>
    )
 }
 export default HeaderForms;