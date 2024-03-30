import '../Header/Header.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ButtonLogout(){
    const navigate = useNavigate();

    const handleLogout = () => {
       axios.get('http://localhost:3000/auth/logout')
             .then(res => {
                    if(res.data.status === 'success'){
                        navigate('/')
                        localStorage.removeItem("loggedIn");
                    }
             })
             .catch(err => console.log(err));
    }

    return(
        <a onClick={handleLogout} className="form_open">LOGOUT</a>
    )
 }

 export default ButtonLogout;