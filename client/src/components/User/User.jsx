import { useEffect, useState } from "react";
import '../User/User.css'
import api from "../../api/axios";
function User(){
    const [suc, setSuc] = useState()
    useEffect(() => {
        (async () => {
            try {
                const {data} = await api.get('/profile');
                if(data.status === "success"){
                    setSuc(data.email)
                }
            } catch (err) {
              console.log(err)
            }
        })();
     });
    return(
        <p className="user">{suc}</p>
    )
}
export default User;