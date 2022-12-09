const Footer = () => (
    
    <footer className="footer">
        <div className='max-width'>                 
            <div className='footer-content'>                        
                <div className='footer-column left'>
                    <h3 className='titulo'>
                        Contato      
                    </h3>
                    <hr/>
                    <ul className='lista'>
                        <li><i class="fa-solid fa-location-dot"></i><span> Rua Júlio de Castilhos, 45 Niterói - Canoas /RS</span>
                        </li>
                        <li><i class="fa-regular fa-envelope"></i><span><a href="mailto:comercial@previsio.com.br">comercial@previsio.com.br</a></span>
                        </li>
                        <li><i class="fa-sharp fa-solid fa-phone-flip"></i><span><a href="tel:+55(51)34669601">(51) 3466.9601</a></span>
                        </li>
                    </ul>
                </div>
                <div className='footer-column right'>
                    <h3 className='titulo'>
                        Índice      
                    </h3>
                    <hr/>
                    <ul className='lista indice'>
                        <li>
                            <i class="fa-regular fa-circle"></i><a href="https://previsio.com.br/">Início</a>
                        </li>
                        <li>
                        <i class="fa-regular fa-circle"></i><a href="https://previsio.com.br/seguranca-do-trabalho/">Soluções e Serviços</a>
                        </li>
                        <li>
                        <i class="fa-regular fa-circle"></i><a href="https://previsio.com.br/artigos/">Artigos</a>
                        </li>
                        <li>
                        <i class="fa-regular fa-circle"></i><a href="https://previsio.com.br/downloads/">Downloads</a>
                        </li>
                        <li>
                        <i class="fa-regular fa-circle"></i><a href="https://ferramentas.previsio.com.br">Ferramentas</a>
                        </li>
                        <li>
                        <i class="fa-regular fa-circle"></i><a href="https://previsio.com.br/contato/">Contato</a>
                        </li>
                        
                    </ul>
                </div>

                
            </div>
        </div>
    </footer>       
);
export default Footer;
