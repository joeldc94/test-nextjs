//import Link from "next/link"
/*
const linkStyle = {
    marginTop: 15,
    marginRight: 15
}
*/

const Menu = () => (
    <div>
        <nav className="navbar">
            <div className="max-width">
                <div className="logo">
                    <a href="/">Previsio</a>
                </div>
                <ul className="menu">
                    <li><a href="/" className="menu-btn">Home</a></li>
                    <li><a href="/ferramentas" className="menu-btn">Ferramentas</a></li>
                    <li><a href="/contato" className="menu-btn">Contato</a></li>
                </ul>
                <div className="menu-btn">                    
                    <i className="fa-solid fa-bars"></i>
                </div>

            </div>
        </nav>
    </div>
);

export default Menu;