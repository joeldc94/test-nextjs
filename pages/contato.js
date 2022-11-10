import Head from 'next/Head';
import Menu from '../components/Menu';

function Home(){
    return(
        <div>
            <Head>
                <meta charset="utf-8"/>
                <meta name="robots" content="index, follow"/>
                <meta name="description" content="Site em desenvolvimento em Next.js"/>
                <meta name="author" content="Joel De Conto"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                
                <title>Testes com Next.js: Contato</title>
            </Head>

            <Menu/>
            <p>Contato:</p>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            
            <script src="custom.js"></script>
         
           
        </div>
    )
}

export default Home;