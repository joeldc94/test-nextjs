const Menu = () => (
    
    <div>
        
        <nav className="navbar">
            <div className="max-width">
                <div className="logo">
                    <a href="/">
                        <img src="../public/logo_previsio_azul.png" alt="Logo Previsio Engenharia" width="500" height="42"></img>
                    </a>
                </div>
                <ul className="menu">
                    <li><a href="https://previsio.com.br/" className="menu-btn">Início</a></li>
                    <li><a href="/ferramentas" className="menu-btn">Ferramentas</a></li>
                    <li><a href="https://previsio.com.br/contato/" className="menu-btn">Contato</a></li>
                </ul>
                <div className="menu-btn">                    
                    <i className="fa-solid fa-bars"></i>
                </div>

            </div>
        </nav>
    </div>
);

export default Menu;
