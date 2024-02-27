import { useState } from 'react';

import api from '../../axios';

import './Form.scss';

export default function Form() {
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [text, setText] = useState('Envoyer');
    const [display, setDisplay] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const messageSent = async (e) => {
        e.preventDefault();
        // Ici on vérifie l'état des champs du formulaire avant d'envoyer la requête post à l'API
        if (name && surname && isValidEmail(email) && area) {
            // Ici on attend la réponse de la requête asynchrone sendmail  
            // définie dans le fichier nodemailer.js
            const response = await api.post("/mail", {
                name, surname, email, area
            });

            setText(response.data.message);
            setName('');
            setSurname('');
            setEmail('');
            setArea('');

        }
        else {
            setText('Erreur !');
            setDisplay(true);
        }

        setTimeout(() => {
            setText('Envoyer');
            setDisplay(false);
        }, 1500);

    }

    return (
        <div className='form-container' id='contact'>
            <h1>Contact</h1>
            <form className={`form ${display && 'noPadding'}`} required>
                <div className="form--text">
                    <div className='form-fields'>
                        <div className='form-title'>Contact</div>
                        <div className="form-field">
                            <label htmlFor="nom" style={{fontFamily: "'signika', sans-serif", fontWeight: '600', textShadow: '1px 1px 1px black'}}>Nom</label>
                            <input type="text" name="nom" id="nom" placeholder='Nom' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="prenom" style={{fontFamily: "'signika', sans-serif", fontWeight: '600', textShadow: '1px 1px 1px black'}}>Prénom</label>
                            <input type="text" name="prenom" id="prenom" placeholder='Prénom' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="email" style={{fontFamily: "'signika', sans-serif", fontWeight: '600', textShadow: '1px 1px 1px black'}}>E-mail</label>
                            <input type="e-mail" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor='message'>Message</label>
                        <textarea id='message' placeholder='Message' value={area} onChange={(e) => setArea(e.target.value)}></textarea>
                    </div>
                    <div className="form-field">
                        <button style={{ fontFamily: "'signika', sans-serif", fontWeight: '400' }} onClick={messageSent} className="submit" type='submit'>
                            <span className="buttonText">{text}</span>
                        </button>
                        <div className='errorMsgContainer'>
                            <div id='errorMsg' className={`${display && 'errorDisplayed' || 'errorHidden'}`} style={{color: 'white'}}>Veuillez remplir correctement tous les champs.</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}