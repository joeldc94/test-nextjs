import Head from 'next/Head';
import Menu from '../components/Menu';

function Home({data}){
    return(
        <div>
            <Head>
                <meta charset="utf-8"/>
                <meta name="robots" content="index, follow"/>
                <meta name="description" content="Site em desenvolvimento em Next.js"/>
                <meta name="author" content="Joel De Conto"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Testes com Next.js: Home</title>
            </Head>

            <Menu/>
            <section className='top'>
                <div className='max-width'>
                    <div className='top-content'>
                        <div className='text-1'>
                            {data.dataHome.text_one}
                        </div>
                        <div className='text-2'>
                            {data.dataHome.text_two}
                        </div>
                        <div className='text-3'>
                            {data.dataHome.text_three}
                        </div>
                        <a href={data.dataHome.btn_link}>{data.dataHome.btn_title}</a>
                    </div>
                </div>
            </section>


            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="custom.js"></script>
         
           
        </div>
    )
}

export async function getServerSideProps(){
    const response = await fetch(`http://localhost:8080/`);
    const data = await response.json();
    //console.log(data);

    return { props:{data}};
}

export default Home;