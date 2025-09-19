import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Website created by Wilker Vivas</p>

            <div className="footer__contact">
                <p className="footer__contact-title">Contacts:</p>
                <ul className="footer__socials">
                    <li>
                        <a
                            href="https://github.com/wilker31vivas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__link"
                        >
                            <img src="../icons/github.svg" alt="GitHub" className="footer__icon" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/wilker-vivas-531965234/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__link"
                        >
                            <img src="../icons/linkedin.svg" alt="LinkedIn" className="footer__icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
