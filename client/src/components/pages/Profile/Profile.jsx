import api from '../../../api/axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import '../Profile/Profile.css';

function Profile(){
   const navigate = useNavigate();
   const [suc, setSuc] = useState()

   useEffect(() => {
      (async () => {
          try {
              const {data} = await api.get('/profile');
              if(data.status === "success"){
                  setSuc(data.name);
               }else{
                  navigate('/login')
                  localStorage.removeItem("loggedIn");
              }
          } catch (err) {
            console.log(err)
          }
      })();
   });
    return(
       <> 
        <Header />
        <div className="container profile_container">
            <h1 className="title_profile">Seja bem vindo,{suc}!</h1>
            <p className="text_profile">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
               Dolores nisi consequatur culpa eos veritatis atque molestiae est at recusandae, 
               praesentium non magnam eveniet sunt nobis reprehenderit soluta cum dignissimos impedit?

               Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
               A qui porro corporis laudantium sapiente amet. 
               Architecto, quod error eveniet itaque repudiandae eius eligendi, magnam dolore sed impedit nobis adipisci aliquid!
            </p>
         </div>
         <Footer/>
       </>
    )
 }
 export default Profile;