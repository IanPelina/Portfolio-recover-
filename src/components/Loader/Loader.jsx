import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpRightAndDownLeftFromCenter,faTrash, faRotate} from '@fortawesome/free-solid-svg-icons';

import './Loader.scss';
import { useState, useEffect, useRef } from 'react';

export default function Loader() {

    // Indique que le serveur est visible
    const [isVisible, setIsVisible] = useState(true);
    // Indique que le serveur est ouvert 
    const [displayed, setDisplayed] = useState(true);

    // Indique que le chargement n'est pas terminé
    const [isLoaded, setIsLoaded] = useState(false);
    // Indique que le serveur n'est  pas aggrandi
    const [isMaximized, setIsMaximized] = useState(false);
    // Indique que le serveur est toujours visible
    const [hidden, setHidden] = useState(false);
    // Indique que l'utilisateur a fait le choix de ne pas relancer le serveur
    const [noReload, setNoReload] = useState(false);
    // Indique que l'utilisateur a relancé le serveur 
    const [reloadOneMore, setReloadOneMore] = useState(false);

    // Ici on définie timeout avec let ici car sa valeur va changé 
    let textTimeout;
 
    const timeoutRef = useRef(null);
    // Affichage du message de bienvenu 
    useEffect(() => {

        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)
        
        return () => clearTimeout(textTimeout);
    }, []);

    // Affichage de la page 
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            setIsLoaded(true);
        }, 6500);
        // Après avoir afficher le message de bienvenu la page s'affiche et les comptes a rebours sont renitialisés.
        return () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(textTimeout);
        };
    }, []);

    // Ici on tue le serveur sans fermer le terminal 
    const killServer = () => {
        setHidden(true);
        setIsLoaded(false);
        clearTimeout(timeoutRef.current);
        clearTimeout(textTimeout);
    }

    // Ici on ferme completement le terminal ce qui le tue également
    const hideServer = () => {
        if (isMaximized) {
            clearTimeout(timeoutRef.current);
            killServer();
            setDisplayed(false);
        } else {
            killServer();
            setDisplayed(false);
        }
    }
    
    // Ici on relance le serveur et renitialise les valeurs suivantes 
    const reloadServer = () => {
        setDisplayed(true);
        setHidden(false);
        setIsLoaded(false);
        clearTimeout(textTimeout);
        clearTimeout(timeoutRef.current);
        textTimeout = setTimeout(() => {
            setIsLoaded(true);
        },5500)
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        },6500)
    }
    // Ici on comme pour reload serveur, on va s'assurer de rénitialisé les valeurs suivantes avant de relancer le serveur
    const reloadAgain = () => {
        clearTimeout(textTimeout)
        clearTimeout(timeoutRef.current)
        setReloadOneMore(true);
        reloadServer();
        textTimeout = setTimeout(() => 5500)
        setNoReload(false);
        setReloadOneMore(false);
    }
    // Bouton pour accéder directement au site et passer l'animation 
    const skipAnimation = () => {
        setIsVisible(false);
        setIsLoaded(true);
    }

    return (
        <>
            <div className={`container ${!isVisible && 'invisible'}`}>
                    {displayed && 
                        <div className={`terminal-loader ${isMaximized && 'maximized'}`}>
                            <div className="terminal-header">
                                <div className={`terminal-title ${hidden && 'error-title'}`}>
                                    {isLoaded && !hidden && 'Bienvenue ✅'}
                                    {!isLoaded && !hidden && 'Veuillez patienter ...'}
                                    {hidden && 'Veuillez rafraichir la page ou fermer le terminal .'}
                                </div>
                                <div className="terminal-controls">
                                    <div className="control maximize">
                                        <FontAwesomeIcon className='close' icon={faUpRightAndDownLeftFromCenter} onClick={() => setIsMaximized(!isMaximized)}/>
                                    </div>
                                    <div className='control'>
                                        <FontAwesomeIcon  className='close' icon={faTrash} onClick={() => killServer()}/>
                                    </div>
                                    <div className="control">
                                        <FontAwesomeIcon className='close' icon={faXmark} onClick={() => hideServer()}/>
                                    </div>
                                </div>
                            </div>
                            {hidden && <div className="error-text">app crashed - waiting for file changes before starting ...</div>}
                            {!hidden && 
                                <>
                                    <div className="text">npm start</div>
                                    <div className="text text2">{`> portfolio@1.0.0 start `}</div>
                                    <div className="text text3">{`> react-scripts start `}</div>
                                    <div className="text4">Starting the development server ...</div>
                                </>
                            }
                        </div>
                    }
                    {!displayed && 
                        <div className={`reborn ${noReload && 'noReloaded' || ''}`}>Relancer le serveur ?
                            <div className="responses">
                                <div className='response' id='true' onClick={() => reloadServer()}>Oui</div>
                                <div className='response' id='false' onClick={() => setNoReload(true)}>Non</div>
                            </div>
                        </div>
                    }
                    {noReload && 
                        <div className={`${reloadOneMore && 'hideAgain' || 'reloadAgain-container'}`}>
                            <FontAwesomeIcon className='reload-icon' icon={faRotate} onClick={() => reloadAgain()} />
                            <div className='byebye'>Bye Bye 👋 😒</div>
                        </div>
                    }
                <div className='skip' onClick={() => skipAnimation()}>Passer l'animation</div>
            </div>
        </>
        )
    }