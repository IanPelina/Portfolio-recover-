import './Footer.scss';

export default function Footer() {
    return (
        <footer style={{zIndex: 999}}>
            <ul>
                <li>
                    <a aria-label='git-logo' alt='git' href="https://github.com/IanPelina"><i className="fab fa-github icon"></i></a>
                </li>
                <li>
                    <a aria-label='linkedin-logo' alt='linkedin' href="https://www.linkedin.com/in/ian-le-pape"><i className="fab fa-linkedin-in icon"></i></a>
                </li>
            </ul>
            <div>
                <p>© Ian le Pape, Tous droits réservés.</p>
            </div>
        </footer>
    )
}