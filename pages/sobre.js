import { useState } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';

function Sobre(){

    const [dataForm, setDataForm] = useState({
        grau_risco: '',
        faixa_trabalhadores: ''        
    });

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    })
    

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {
        e.preventDefault(); //indica que não deve recarregar a página
        //console.log(dataForm);

        try{
            /*
            const res = await fetch('http://localhost:8080/nr04-sesmt-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            //const url = process.env.SERVER_URL + '/add-msg-contact';
            //console.log(url);
            //http://test-nodejs-git-nr04-form-joeldc94.vercel.app/
            */
            
            const res = await fetch('http://test-nodejs-git-nr04-form-joeldc94.vercel.app/nr04-sesmt-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            
            
            


            const responseEnv = await res.json();
            console.log(responseEnv.sesmt_table[0]);

            
            if(responseEnv.erro){
                setResponse({
                    type:'error',
                    //mensagem: responseEnv.mensagem
                    mensagem: 'Falha ao coletar dados'
                        
                });
            }
            else{
                setResponse({
                    type:'success',
                    //mensagem: responseEnv.mensagem
                    mensagem: 
                    
                        'grau_risco: ' + responseEnv.sesmt_table[0].grau_risco +
                        ',nro_trabalhadores: ' + responseEnv.sesmt_table[0].nro_trabalhadores +
                        ',tecnico_seg: ' + responseEnv.sesmt_table[0].tecnico_seg +
                        ',engenheiro_seg: ' + responseEnv.sesmt_table[0].engenheiro_seg +
                        ',aux_tec_enfermagem: ' + responseEnv.sesmt_table[0].aux_tec_enfermagem +
                        ',enfermeiro: ' + responseEnv.sesmt_table[0].enfermeiro +
                        ',medico :' + responseEnv.sesmt_table[0].medico
                    
                });
                setDataForm({
                    grau_risco: '',
                    faixa_trabalhadores: ''
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
                <meta charset="utf-8"/>
                <meta name="robots" content="index, follow"/>
                <meta name="description" content="Site em desenvolvimento em Next.js"/>
                <meta name="author" content="Joel De Conto"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                
                <title>Testes com Next.js: Consulta NR04</title>
            </Head>

            <Menu/>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Consulta NR04</h2>
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
                                Consulta NR04: Equipe SESMT
                            </div>
                            <form onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field name'>
                                        <input type="text" name="grau_risco" placeholder="Digite o Grau de Risco" onChange={onChangeInput} value={dataForm.grau_risco} />
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="text" name="faixa_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.faixa_trabalhadores} />
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

export default Sobre;

/*
                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <p className='alert-success'>{response.mensagem}</p> : ""}
                            */