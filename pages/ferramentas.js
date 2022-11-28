import { useState } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';
import FormCNPJ from '../components/FormCNPJ';

function Ferramentas(){

    const [dataForm, setDataForm] = useState({
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        numero_trabalhadores: '',
        type: ''
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
        faixa_nro_trabalhadores_sesmt: '',
        nro_tecnico_seg: '',
        nro_engenheiro_seg: '',
        nro_aux_tec_enfermagem: '',
        nro_enfermeiro: '',
        nro_medico: '',
        faixa_nro_trabalhadores_cipa: '',
        cipa_efetivos: '',
        cipa_suplentes: ''
    })
    

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {

        //console.log(dataForm.type);

        e.preventDefault(); //indica que não deve recarregar a página
        //console.log(dataForm);

        alert('CNPJ : ' + dataForm.cnpj);

        var nroFuncOk = false;
        var nroCnaeOk = false;
        var cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;

        //alert('Entrou no ENVIAR');
        if(dataForm.numero_trabalhadores != 0 || dataForm.numero_trabalhadores != ""){
            nroFuncOk = true;
        }
        else{
            alert('Erro: Insira o número de funcionários.');
            return
        }

        if(dataForm.type == 'cnpj'){
            //const cnpjRegex = 
            dataForm.codigo_cnae1 = '';
            dataForm.codigo_cnae2 = '';

        }else if(dataForm.type == 'cnae'){
            if(dataForm.codigo_cnae1.match(cnaeRegex) || dataForm.codigo_cnae2.match(cnaeRegex)){
                nroCnaeOk = true;
                /*
                if(dataForm.numero_trabalhadores != 0 || dataForm.numero_trabalhadores != ""){
                    nroFuncOk = true;
                }
                else{
                    alert('Erro: Insira o número de funcionários.');
                    return
                }
                */
               dataForm.cnpj = '';
            }
            else{
                alert('Erro: Insira um código CNAE válido');
                return
            }
        }else{
            alert('Erro: Falha no envio do formulário');
            return
        }


/*
        if(dataForm.codigo_cnae1.match(cnaeRegex) || dataForm.codigo_cnae2.match(cnaeRegex)){
            nroCnaeOk = true;
            if(dataForm.numero_trabalhadores != 0 || dataForm.numero_trabalhadores != ""){
                nroFuncOk = true;
            }
            else{
                alert('Erro: Insira o número de funcionários.');
                return
            }
        }
        else{
            alert('Erro: Insira um código CNAE válido');
            return
        }*/

        try{
            const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            //console.log(dataForm);
            
            const retorno = await res.json();
            console.log(retorno.respostaConsultaTabelas);
            //console.log(responseEnv.sesmt_table[0]);
            
            if(retorno.respostaConsultaTabelas.erro){
                setResponse({
                    type:'error',
                    mensagem: retorno.respostaConsultaTabelas.mensagem                        
                });
            }
            else{
                setResponse({
                    type:'success',
                    //mensagem: responseEnv.mensagem
                    /*
                    mensagem:
                        'COMPOSIÇÃO DO SESMT: ' +                   
                        'grau_risco: ' + retorno.respostaConsultaTabelas.grauDeRisco +
                        'nro_trabalhadores: entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxSesmt  +
                        'tecnico_seg: ' + retorno.respostaConsultaTabelas.tecnicoSeg +
                        'engenheiro_seg: ' + retorno.respostaConsultaTabelas.engenheiroSeg +
                        'aux_tec_enfermagem: ' + retorno.respostaConsultaTabelas.auxTecEnfermagem +
                        'enfermeiro: ' + retorno.respostaConsultaTabelas.enfermeiro +
                        'medico: ' + retorno.respostaConsultaTabelas.medico     
                        
                    */
                });
                setDataForm({
                    cnpj: '',
                    codigo_cnae1: '',
                    codigo_cnae2: '',
                    numero_trabalhadores: '',
                    type: ''
                });
                setRespostaDadosNR({
                    cod_cnae: retorno.respostaConsultaTabelas.cnae,
                    desc_cnae: retorno.respostaConsultaTabelas.denominacao,
                    grau_risco: retorno.respostaConsultaTabelas.maiorGrauRisco,
                    nro_trabalhadores: retorno.respostaConsultaTabelas.nroTrabalhadores,
                    faixa_nro_trabalhadores_sesmt: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxSesmt,
                    nro_tecnico_seg: retorno.respostaConsultaTabelas.tecnicoSeg,
                    nro_engenheiro_seg: retorno.respostaConsultaTabelas.engenheiroSeg,
                    nro_aux_tec_enfermagem: retorno.respostaConsultaTabelas.auxTecEnfermagem,
                    nro_enfermeiro: retorno.respostaConsultaTabelas.enfermeiro,
                    nro_medico: retorno.respostaConsultaTabelas.medico,
                    faixa_nro_trabalhadores_cipa: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinCipa + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxCipa,
                    cipa_efetivos: retorno.respostaConsultaTabelas.cipaEfetivos,
                    cipa_suplentes: retorno.respostaConsultaTabelas.cipaSuplentes
                });
            }
        }catch(err){            
            setResponse({
                type:'error',
                mensagem:'Erro: não foi possível realizar a consulta. Tente novamente mais tarde.'
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
                    <h2 className='title'>Consulta NR04 e NR05</h2>
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
                                Consultas: Equipes SESMT e CIPA                                
                            </div>
                            <div>
                                <button className='selecionaEntrada btnCNPJ' >Consultar com CNPJ</button>
                                <button className='selecionaEntrada btnCNAE' >Consultar com CNAE</button>
                                
                            </div>
                            
                            <form className='formCNPJ' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field'>
                                    <input type="text" name="cnpj" data-mask="00.000.000/0000-00" reverse="false" placeholder="Digite o CNPJ da empresa" onChange={onChangeInput} value={dataForm.cnpj}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.numero_trabalhadores}/>
                                    </div>
                                </div>
                                
                                <div className='button-area'>
                                    <button type="submit" onClick={()=>dataForm.type='cnpj'}>Enviar</button>
                                </div>                                
                            </form>

                            <form className='formCNAE' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field name tooltip'>
                                        <span className='tooltiptext'>A atividade econômica principal é a constante no Cadastro Nacional de  Pessoa Jurídica - CNPJ.</span>
                                        <input type="text" name="codigo_cnae1" placeholder="Digite o CNAE principal da empresa" data-mask="00.00-0-99" reverse="true" clearifnotmatch="false" onChange={onChangeInput} value={dataForm.codigo_cnae1}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field name tooltip'>
                                        <span className='tooltiptext'>A atividade econômica preponderante é aquela que ocupa o maior número de trabalhadores.</span>
                                        <input type="text" name="codigo_cnae2" placeholder="Digite o CNAE preponderante da empresa" data-mask="00.00-0-99" clearifnotmatch="false" reverse="true" onChange={onChangeInput} value={dataForm.codigo_cnae2}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.numero_trabalhadores}/>
                                    </div>
                                </div>
                                <div className='button-area'>
                                    <button type="submit" onClick={()=>dataForm.type='cnae'}>Enviar</button>
                                </div>
                            </form>

                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <div className='alert-success'>
                                <h3>CARACTERÍSTICA DA EMPRESA:</h3>
                                <ul>
                                    <li>CNAE consultado: {respostaDadosNR.cod_cnae};</li>
                                    <li>Denominação do CNAE: {respostaDadosNR.desc_cnae}</li>
                                    <li>Grau de Risco da Empresa: {respostaDadosNR.grau_risco};</li>
                                    <li>Quantidade de Trabalhadores: {respostaDadosNR.nro_trabalhadores} ({respostaDadosNR.faixa_nro_trabalhadores_sesmt});</li>
                                </ul><br></br>
                                <h3>EQUIPE SESMT NECESSÁRIA:</h3>
                                <ul>
                                    <li>Técnicos de Segurança: {respostaDadosNR.nro_tecnico_seg};</li>
                                    <li>Engenheiros de Segurança: {respostaDadosNR.nro_engenheiro_seg};</li>
                                    <li>Auxiliares/Técnicos de Enfermagem: {respostaDadosNR.nro_aux_tec_enfermagem};</li>
                                    <li>Enfermeiros: {respostaDadosNR.nro_enfermeiro};</li>
                                    <li>Médicos: {respostaDadosNR.nro_medico}.</li>
                                </ul><br></br>
                                <h3>EQUIPE CIPA NECESSÁRIA:</h3>
                                <ul>
                                    <li>Membros da equipe efetiva: {respostaDadosNR.cipa_efetivos};</li>
                                    <li>Membros da equipe suplente {respostaDadosNR.cipa_suplentes}.</li>
                                </ul>
                            </div> : ""}


                        </div>
                    </div>                                   
                </div>
            </section>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <script src="custom.js"></script>
         
           
        </div>
    )
}

export default Ferramentas;

/*
                            {response.type === 'error' ? <p className='alert-danger'>{response.mensagem}</p> : ""}
                            {response.type === 'success' ? <p className='alert-success'>{response.mensagem}</p> : ""}
                            */