import { useState } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';

import Menu from '../components/Menu';
import AvisoTestes from '../components/AvisoTestes'
import RespostaErro from '../components/RespostaErro'
import Footer from '../components/Footer';

function ConsultaNR05(){

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
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
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

        e.preventDefault(); //indica que não deve recarregar a página

        /*
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
            //dataForm.cnpj = document.getElementsByName('formCNPJ').value;
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
                
                dataForm.cnpj = '';
                //ignora os dois ultimos digitos do codigo cnae se vier no formato 00.00-0-00
                //se vier no formato 00.00-0 esta ok para consultar no db
                dataForm.codigo_cnae1 = dataForm.codigo_cnae1.substring(0,7);
                dataForm.codigo_cnae2 = dataForm.codigo_cnae2.substring(0,7);                
            }
            else{
                alert('Erro: Insira um código CNAE válido');
                return
            }
        }else{
            alert('Erro: Falha no envio do formulário');
            return
        }
        */

        //verifica numero de funcionários
        if(dataForm.numero_trabalhadores == 0 || dataForm.numero_trabalhadores == ""){
            //nroFuncOk = true;
            alert('Erro: Insira o número de funcionários.');
            return
        }
        
        //verifica inicialmente se o CNPJ foi inserido corretamente
        if(dataForm.type == 'cnpj'){
            var cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if(!dataForm.cnpj.match(cnpjRegex)){
                alert('Erro: Insira o CNPJ no formato correto.');
                return
            }
            else{
                dataForm.codigo_cnae1 = '';
                dataForm.codigo_cnae2 = '';
            }
        }else if(dataForm.type == 'cnae'){
            //verifica se o cnae foi inserido corretamente
            var cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if(!dataForm.codigo_cnae1.match(cnaeRegex) && !dataForm.codigo_cnae2.match(cnaeRegex)){
                alert('Erro: Insira um código CNAE válido');
                return                                
            }
            else{
                dataForm.cnpj = '';
            }
        }else{
            //dá falha se não reconhecer nem cnpj nem cnae
            alert('Erro: Falha no envio do formulário');
            return
        }

        //se deu certo até aqui, realiza o POST
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
                });
                setDataForm({
                    cnpj: '',
                    codigo_cnae1: '',
                    codigo_cnae2: '',
                    numero_trabalhadores: '',
                    type: ''
                });
                setRespostaDadosNR({                    
                    cnpj: retorno.respostaConsultaTabelas.cnpj,
                    razaoSocial: retorno.respostaConsultaTabelas.razaoSocial,
                    nomeFantasia: retorno.respostaConsultaTabelas.nomeFantasia,
                    cod_cnae: retorno.respostaConsultaTabelas.codigoCnae[0],
                    desc_cnae: retorno.respostaConsultaTabelas.descricaoCnae[0],
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
        document.getElementById("resultado-consulta").scrollIntoView({behavior: 'smooth'})
    }



    return(
        <div>
            <Head>
                <meta charset="utf-8"/>
                <meta name="robots" content="index, follow"/>
                <meta name="description" content="Previsio Engenharia: Consulta NR-05: Constituição de Equipe CIPA"/>
                <meta name="author" content="Joel De Conto"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                
                <title>Consulta NR05 - Previsio Engenharia</title>
            </Head>

            <Menu/>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Consulta NR05: Equipe CIPA</h2>
                    <AvisoTestes/>
                    <div className='contact-content'>
                        
                        <div className='column left'>
                            <div className='bloco-explicacao'>
                                <h3 className='titulo-consulta'>NR05</h3>
                                <p>Esta Norma estabelece os parâmetros e os requisitos da Comissão Interna de Prevenção de Acidentes – CIPA, tendo por objetivo a prevenção de acidentes e doenças relacionadas ao trabalho, de modo a tornar compatível, permanentemente, o trabalho com a preservação da vida e promoção da saúde do trabalhador.</p>
                                <a target="_blank" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-05-atualizada-2021-1.pdf">&gt; Acesse a norma completa</a>
                            </div>
                        </div>

                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Composição da Equipe da CIPA                                
                            </div>
                            <p>Com esta ferramenta, é possível descobrir rapidamente a composição necessária da equipe da CIPA, conforme orientado pelas normas vigentes. Indique o CNPJ e o número de funcionários da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.</p>
                            <div>
                                <button className='selecionaEntrada btnCNPJ' >Consultar com CNPJ</button>
                                <button className='selecionaEntrada btnCNAE' >Consultar com CNAE</button>
                                
                            </div>
                            
                            <form className='formCNPJ' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field'>
                                    <InputMask type="text" name="cnpj" mask="99.999.999/9999-99" placeholder="Digite o CNPJ da empresa" onChange={onChangeInput} value={dataForm.cnpj}/>
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
                                        <InputMask type="text" name="codigo_cnae1" placeholder="Digite o CNAE principal da empresa" mask="99.99-9" onChange={onChangeInput} value={dataForm.codigo_cnae1}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field name tooltip'>
                                        <span className='tooltiptext'>A atividade econômica preponderante é aquela que ocupa o maior número de trabalhadores.</span>
                                        <InputMask type="text" name="codigo_cnae2" placeholder="Digite o CNAE preponderante da empresa" mask="99.99-9" onChange={onChangeInput} value={dataForm.codigo_cnae2}/>
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

                        </div>
                    </div> 

                    <div id='resultado-consulta'>
                        {response.type === 'error' ? 
                            <p className='alert-danger'>{response.mensagem}</p> 
                        : ""}

                        {response.type === 'success' ? 
                            <div className='alert-success'>
                                <h3>CARACTERÍSTICAS DA EMPRESA:</h3>
                                <ul>
                                    <li>CNPJ: {respostaDadosNR.cnpj};</li>
                                    <li>Razão Social: {respostaDadosNR.razaoSocial};</li>
                                    <li>Nome Fantasia: {respostaDadosNR.nomeFantasia};</li>
                                    <li>CNAE consultado: {respostaDadosNR.cod_cnae};</li>
                                    <li>Denominação do CNAE: {respostaDadosNR.desc_cnae}</li>
                                    <li>Grau de Risco da Empresa: {respostaDadosNR.grau_risco};</li>
                                    <li>Quantidade de Trabalhadores: {respostaDadosNR.nro_trabalhadores} ({respostaDadosNR.faixa_nro_trabalhadores_sesmt});</li>
                                </ul><br></br>
                                <h3>EQUIPE CIPA NECESSÁRIA:</h3>
                                <ul>
                                    <li>Membros da equipe efetiva: {respostaDadosNR.cipa_efetivos};</li>
                                    <li>Membros da equipe suplente {respostaDadosNR.cipa_suplentes}.</li>
                                </ul>
                            </div> 
                        : ""} 
                    </div>

                </div>
            </section>

            <Footer/>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="custom.js"></script>
         
        </div>
    )
}

export default ConsultaNR05;