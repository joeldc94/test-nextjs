import { useState } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';

//const SERVER_URL='https://test-nodejs-8kd4sqoy4-joeldc94.vercel.app'


function Ferramentas(){

    const [dataForm, setDataForm] = useState({
        codigo_cnae: '',
        numero_trabalhadores: ''        
    });

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    })

    var [respostaDadosNR, setRespostaDadosNR] = useState({
        cod_cnae: '',
        desc_cnae: '',
        grau_risco: '',
        nro_trabalhadores: '',
        faixa_nro_trabalhadores: '',
        nro_tecnico_seg: '',
        nro_engenheiro_seg: '',
        nro_aux_tec_enfermagem: '',
        nro_enfermeiro: '',
        nro_medico: ''
    })
    

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {
        e.preventDefault(); //indica que não deve recarregar a página
        //console.log(dataForm);

        try{
            const res = await fetch(process.env.SERVER_URL + 'nr04-sesmt-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            //console.log(dataForm);
            
            const responseEnv = await res.json();
            console.log(responseEnv.denominacaoCnaeConsultada);
            //console.log(responseEnv.sesmt_table[0]);
            
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
                        'COMPOSIÇÃO DO SESMT: ' +                   
                        'grau_risco: ' + responseEnv.sesmt_table[0].grau_risco +
                        'nro_trabalhadores: entre ' + responseEnv.sesmt_table[0].nro_trabalhadores_min + ' e ' + responseEnv.sesmt_table[0].nro_trabalhadores_max +
                        'tecnico_seg: ' + responseEnv.sesmt_table[0].tecnico_seg +
                        'engenheiro_seg: ' + responseEnv.sesmt_table[0].engenheiro_seg +
                        'aux_tec_enfermagem: ' + responseEnv.sesmt_table[0].aux_tec_enfermagem +
                        'enfermeiro: ' + responseEnv.sesmt_table[0].enfermeiro +
                        'medico: ' + responseEnv.sesmt_table[0].medico                    
                });
                setDataForm({
                    codigo_cnae: '',
                    numero_trabalhadores: ''
                });
                setRespostaDadosNR({
                    cod_cnae: responseEnv.codigoCnaeConsultado,
                    desc_cnae: responseEnv.denominacaoCnaeConsultada,
                    grau_risco: responseEnv.sesmt_table[0].grau_risco,
                    nro_trabalhadores: responseEnv.numero_trabalhadores_inserido,
                    faixa_nro_trabalhadores: 'entre ' + responseEnv.sesmt_table[0].nro_trabalhadores_min + ' e ' + responseEnv.sesmt_table[0].nro_trabalhadores_max,
                    nro_tecnico_seg: responseEnv.sesmt_table[0].tecnico_seg,
                    nro_engenheiro_seg: responseEnv.sesmt_table[0].engenheiro_seg,
                    nro_aux_tec_enfermagem: responseEnv.sesmt_table[0].aux_tec_enfermagem,
                    nro_enfermeiro: responseEnv.sesmt_table[0].enfermeiro,
                    nro_medico: responseEnv.sesmt_table[0].medico
                });
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
                                        <input type="text" name="codigo_cnae" placeholder="Digite o CNAE da empresa" onChange={onChangeInput} value={dataForm.codigo_cnae} />
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.numero_trabalhadores} />
                                    </div>
                                </div>
                                
                                <div className='button-area'>
                                    <button type="submit">Enviar</button>
                                </div>
                                
                            </form>

                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <div className='alert-success'>
                                <h3>CARACTERÍSTICA DA EMPRESA:</h3>
                                <ul>
                                    <li>CNAE consultado: {respostaDadosNR.cod_cnae};</li>
                                    <li>Denominação do CNAE: {respostaDadosNR.desc_cnae}</li>
                                    <li>Grau de Risco da Empresa: {respostaDadosNR.grau_risco};</li>
                                    <li>Quantidade de Trabalhadores: {respostaDadosNR.nro_trabalhadores} ({respostaDadosNR.faixa_nro_trabalhadores});</li>
                                </ul><br></br>
                                <h3>EQUIPE SESMT NECESSÁRIA:</h3>
                                <ul>
                                    <li>Técnicos de Segurança: {respostaDadosNR.nro_tecnico_seg};</li>
                                    <li>Engenheiros de Segurança: {respostaDadosNR.nro_engenheiro_seg};</li>
                                    <li>Auxiliares/Técnicos de Enfermagem: {respostaDadosNR.nro_aux_tec_enfermagem};</li>
                                    <li>Enfermeiros: {respostaDadosNR.nro_enfermeiro};</li>
                                    <li>Médicos: {respostaDadosNR.nro_medico}.</li>
                                </ul>
                            </div> : ""}


                        </div>
                    </div>                                   
                </div>
            </section>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            
            <script src="custom.js"></script>
         
           
        </div>
    )
}

export default Ferramentas;

/*
                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <p className='alert-success'>{response.mensagem}</p> : ""}
                            */