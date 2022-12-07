import Head from 'next/head';
import Menu from '../components/Menu';
import AvisoTestes from '../components/AvisoTestes'
import Footer from '../components/Footer';

function Home({data}){
    return(
        <div>
            <Head>
                <meta name="description" content="Previsio Engenharia: Ferramentas para Saúde e Segurança do Trabalho"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Ferramentas - Previsio Engenharia</title>
            </Head>
            <Menu/>

            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Ferramentas</h2>                    
                    <div className='contact-content'>                        
                        <div className='column left'>
                            <div className='titulo-consulta'>
                                Normas Regulamentadoras (NRs)                             
                            </div>
                            <ul>
                                <br/><li><a target="_blank" href="/consulta_nr04">&gt; NR-04: Consulta equipe SESMT</a></li>
                                <br/><li><a target="_blank" href="/consulta_nr05">&gt; NR-05: Consulta equipe CIPA</a></li>
                            </ul>
                        </div>
                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Ferramentas de Consulta
                            </div>
                            <div>
                                <p>Disponibilizamos ferramentas para consulta de dados das NRs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>


            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="custom.js"></script>
         
           
        </div>
    )
}

/*
export async function getServerSideProps(){
    const response = await fetch(process.env.SERVER_URL);
    //const response = await fetch(process.env.SERVER_URL);
    const data = await response.json();
    //console.log(data);

    return { props:{data}};
}*/

export default Home;