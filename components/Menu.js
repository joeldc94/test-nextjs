const Menu = () => (
    
    <div>        
        <nav className="navbar">
            <div className="max-width">
                <div className="logo">
                    <a href="https://previsio.com.br/">
                    <img src="https://github.com/joeldc94/test-nextjs/blob/integra%C3%A7ao-site-previsio/public/logo_previsio_azul.png?raw=true" alt="Previsio Engenharia" width="auto" height="90"></img>
                    </a>
                </div>
                <ul className="menu">
                    <li><a href="https://previsio.com.br/" className="menu-item inicio">Início</a></li>

                    <li><a href="https://previsio.com.br/seguranca-do-trabalho/" className="menu-item solucoes">Soluções e Serviços</a></li>

                    <li><a href="https://previsio.com.br/clientes/" className="menu-item clientes">Clientes</a></li>

                    <li><a href="https://previsio.com.br/artigos/" className="menu-item artigos">Artigos</a></li>

                    <li><a href="https://previsio.com.br/nrs/" className="menu-item nrs">NR's</a></li>

                    <li><a href="https://previsio.com.br/downloads/" className="menu-item downloads">Downloads</a></li>

                    <li><a href="/" className="menu-item ferramentas">Ferramentas</a></li>

                    <li><a href="https://previsio.com.br/contato/" className="menu-item contato">Contato</a></li>

                </ul>
                <div className="menu-btn">
                    <i className="fa-solid fa-bars"></i>
                </div>

            </div>
        </nav>
    </div>
);

export default Menu;
