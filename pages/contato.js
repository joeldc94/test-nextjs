import { useState } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';

function Home(){

    const [dataForm, setDataForm] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    })

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendContact = async e => {
        e.preventDefault(); //indica que não deve recarregar a página
        //console.log(dataForm);

        try{
            /*const res = await fetch('http://localhost:8080/add-msg-contact', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });*/
            //const url = process.env.SERVER_URL + '/add-msg-contact';
            //console.log(url);
            const res = await fetch(process.env.SERVER_URL + 'add-msg-contact', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });


            const responseEnv = await res.json();

            if(responseEnv.erro){
                setResponse({
                    type:'error',
                    mensagem: responseEnv.mensagem
                });
            }
            else{
                setResponse({
                    type:'success',
                    mensagem: responseEnv.mensagem
                });
                setDataForm({
                    name: '',
                    email: '',
                    subject: '',
                    content: ''
                })
            }

        }catch(err){
            setResponse({
                type:'error',
                mensagem:'Erro, tente novamente mais tarde.'
            });
            console.log(err);
        }
    }

    return(
        <div>
            <Head>
                <meta name="description" content= "Previsio Engenharia: Formulário de Contato"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Contato - Previsio Engenharia</title>
            </Head>

            <Menu/>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Contato</h2>
                    <div className='contact-content'>
                        <div className='column left'>
                            <p>Texto aleatório de parágrafo texto aleatório de parágrafo texto aleatório de parágrafo texto aleatório de parágrafo texto aleatório de parágrafo texto </p>
                            <div className='icons'>
                                <div className='row'>
                                    <i className="fa-solid fa-user"></i>
                                    <div className='info'>
                                        <div className='head'>
                                            Empresa
                                        </div>
                                        <div className='sub-title'>
                                            Previsio
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <i className="fa-solid fa-map-location-dot"></i>
                                    <div className='info'>
                                        <div className='head'>
                                            Endereço
                                        </div>
                                        <div className='sub-title'>
                                            Rua Júlio de Castilhos, 45, bairro Niterói - Canoas/RS
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <i className="fa-solid fa-envelope"></i>
                                    <div className='info'>
                                        <div className='head'>
                                            E-mail
                                        </div>
                                        <div className='sub-title'>
                                            joel@previsio.com.br
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='column right'>
                            <div className='text'>
                                Formulário de Contato
                            </div>
                            <form onSubmit={sendContact}>
                                <div className='fields'>
                                    <div className='field name'>
                                        <input type="text" name="name" placeholder="Digite o nome" onChange={onChangeInput} value={dataForm.name} />
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="email" name="email" placeholder="Digite o seu melhor e-mail" onChange={onChangeInput} value={dataForm.email} />
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field subject'>
                                        <input type="text" name="subject" placeholder="Digite o assunto da Mensagem" onChange={onChangeInput} value={dataForm.subject} />
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field content'>
                                        <input type="text" name="content" placeholder="Digite o conteúdo da Mensagem" onChange={onChangeInput} value={dataForm.content} />
                                    </div>
                                </div>
                                <div className='button-area'>
                                    <button type="submit">Enviar</button>
                                </div>
                                
                            </form>

                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <p className='alert-success'>{response.mensagem}</p> : ""}


                        </div>
                    </div>                                   
                </div>
            </section>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            
            <script src="custom.js"></script>
         
           
        </div>
    )
}

export default Home;