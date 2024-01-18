import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import './ErrorPage.scss';

import { Link } from 'react-router-dom';

import Typewriter from 'typewriter-effect';

export default function ErrorPage() {

    const path = '/images/pres-back.jpeg';

    return (
        <div className='error-container' style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Nav>
                <ul className='links'>
                    <li><a className='link' href="/">Accueil</a></li>
                    <li><a className='link' href="/contact">Contact</a></li>
                </ul>
            </Nav>
            <div className="error-page" >
                <div className="error-logo">
                    <img src='/images/404.png' alt="error"/>
                </div>
                <div className="error-and-link">
                    <Typewriter
                        options={{
                            strings: ['Oups! La page que vous demandez n\'existe pas.'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                    <Link className="home-link" to="/">Retourner sur la page d’accueil</Link>
                </div>
            </div>
            <div className='error-footer'> 
                <Footer />
            </div>
        </div>
    )
}