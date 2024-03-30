import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import {Link} from 'react-router-dom';
import '../../pages/Home/Home.css'

function Home(){
    return(
        <>
            <Header />
            <section className="home">
                <div className="content container">
                    <h1 className="content_title">Tenha acesso a diversas oportunidades para desenvolvedores.</h1>
                    <p className="content_paragraph container">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                        voluptatum voluptatibus ut sunt beatae ducimus quibusdam odio dicta incidunt nostrum cupiditate vero ad distinctio atque quia illo saepe,
                        consequatur labore?
                    </p>
                    <Link to='/login'className="content_button" >Entrar na comunidade</Link>
                </div>
            </section>
            <Footer/>
        </>
    )
 }
 export default Home;