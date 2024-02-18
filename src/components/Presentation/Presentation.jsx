import './Presentation.scss';

import Typewriter from 'typewriter-effect';

export default function Presentation() {
    
    const path = '/images/IMG_6556.jpg';

    return (
        <section className="presentation">
            <div className='presentation-content'>
                    <div className="title-and-text">
                        <Typewriter
                            options={{
                                strings: ['Bonjour \! Je m\'appelle'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                        <h1>Ian Le Pape</h1>
                        <p className='terminal-text'>
                            Je suis développeur Front-end débutant, passionné de programmation et de jeux vidéos.
                            <br></br>
                            J'aime découvrir de nouvelles technologies et relever toujours plus de défis.
                        </p>
                    </div>
                <div className="profil-pic" style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',  }}></div>
            </div>  
        </section>
    )
}