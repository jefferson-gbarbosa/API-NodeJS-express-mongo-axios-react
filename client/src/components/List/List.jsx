import { RiGithubFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import {Link} from 'react-router-dom';
import '../Header/Header.css';
function List(){
    return(
    <>
        <li>
            <Link className="nav-link" to="https://www.linkedin.com/in/jefferson-gbarbosa/" target="_blank" rel="noopener noreferrer">
                <RiLinkedinFill />
            </Link>
        </li><li>
            <Link className="nav-link" to="https://github.com/jefferson-gbarbosa" target="_blank" rel="noopener noreferrer">
                <RiGithubFill />
            </Link>
        </li>
    </>
    )
}
export default List