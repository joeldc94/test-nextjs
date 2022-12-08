import React, { useState, createContext } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';
import ContentLoader, {List} from 'react-content-loader';

import Menu from '../components/Menu';
import AvisoTestes from '../components/AvisoTestes'
import RespostaErro from '../components/RespostaErro'
import RespostaSesmtCnpj from '../components/RespostaSesmtCnpj'
import RespostaSesmtCnae from '../components/RespostaSesmtCnae'
import Footer from '../components/Footer';

function ConsultaNR04(){

    const [loading, setLoading] = useState(false);

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
    });

    var [respostaDadosNR, setRespostaDadosNR] = useState({
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        cod_cnae: '',
        desc_cnae: '',
        codigoCnaeFiscal: '',
        descricaoCnaeFiscal: '',
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
        cipa_suplentes: '',
        obsSesmt1: '',
        obsSesmt2: '',
        obsSesmt3: ''
    });    

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {
        //indica que não deve recarregar a página
        e.preventDefault(); 

        //verifica numero de funcionários
        if(dataForm.numero_trabalhadores == 0 || dataForm.numero_trabalhadores == ""){
            //nroFuncOk = true;
            alert('Erro: Insira o número de funcionários.');
            //setResponse({loading: false}); 
            setLoading(false);
            return
        }
       
        //verifica inicialmente se o CNPJ foi inserido corretamente
        if(dataForm.type == 'cnpj'){
            var cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if(!dataForm.cnpj.match(cnpjRegex)){
                alert('Erro: Insira o CNPJ no formato correto.');
                //setResponse({loading: false}); 
                setLoading(false);
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
                //setResponse({loading: false});
                setLoading(false); 
                return                                
            }
            else{
                dataForm.cnpj = '';
            }
        }else{
            //dá falha se não reconhecer nem cnpj nem cnae
            alert('Erro: Falha no envio do formulário');
            //setResponse({loading: false});
            setLoading(false);
            return
        }
        
        //se deu certo até aqui, realiza o POST
        try{
            const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const retorno = await res.json();
            //console.log(retorno.respostaConsultaTabelas);
            
            if(retorno.respostaConsultaTabelas.erro){
                setResponse({
                    type:'error',
                    mensagem: retorno.respostaConsultaTabelas.mensagem                        
                });
            }
            else{                
                
                if(dataForm.type=='cnpj'){
                    setRespostaDadosNR({  
                        cod_cnae: retorno.respostaConsultaTabelas.codigoCnaeFiscal,
                        desc_cnae: retorno.respostaConsultaTabelas.descricaoCnaeFiscal,
                        cnpj: retorno.respostaConsultaTabelas.cnpj,
                        razaoSocial: retorno.respostaConsultaTabelas.razaoSocial,
                        nomeFantasia: retorno.respostaConsultaTabelas.nomeFantasia,
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
                        cipa_suplentes: retorno.respostaConsultaTabelas.cipaSuplentes,
                        obsSesmt1: retorno.respostaConsultaTabelas.obsSesmt1,
                        obsSesmt2: retorno.respostaConsultaTabelas.obsSesmt2,
                        obsSesmt3: retorno.respostaConsultaTabelas.obsSesmt3
                    });                    
                }else if(dataForm.type=='cnae'){
                    setRespostaDadosNR({  
                        cod_cnae: retorno.respostaConsultaTabelas.codigoCnae[0],
                        desc_cnae: retorno.respostaConsultaTabelas.descricaoCnae[0],
                        cnpj: retorno.respostaConsultaTabelas.cnpj,
                        razaoSocial: retorno.respostaConsultaTabelas.razaoSocial,
                        nomeFantasia: retorno.respostaConsultaTabelas.nomeFantasia,
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
                        cipa_suplentes: retorno.respostaConsultaTabelas.cipaSuplentes,
                        obsSesmt1: retorno.respostaConsultaTabelas.obsSesmt1,
                        obsSesmt2: retorno.respostaConsultaTabelas.obsSesmt2,
                        obsSesmt3: retorno.respostaConsultaTabelas.obsSesmt3
                    });  
                }
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
            }
        }catch(err){  
            setLoading(false);    
            setResponse({
                type:'error',
                mensagem:'Erro: não foi possível realizar a consulta. Tente novamente mais tarde.'
            });            
            console.log(err);
        }
        setLoading(false);
        document.getElementById("resultado-consulta").scrollIntoView({behavior: 'smooth'})
    }

    return(
        <div>
            <Head>
                <meta name="description" content="Previsio Engenharia: Consulta NR04: Constituição de Equipe SESMT"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Consulta NR04 - Previsio Engenharia</title>
            </Head>

            <Menu/>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Consulta NR04: Equipe SESMT</h2>
                    <AvisoTestes/>
                    <div className='contact-content'>
                        <div className='column left'>
                            <div className='bloco-explicacao'>
                                <h3 className='titulo-consulta'>NR04</h3>
                                <p>Esta Norma estabelece os parâmetros e os requisitos para constituição e manutenção dos Serviços Especializados em Segurança e Medicina do Trabalho - SESMT, com a finalidade de promover a saúde e proteger a integridade do trabalhador</p>
                                <a target="_blank" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-04.pdf">&gt; Acesse a norma completa</a>
                            </div>
                        </div>

                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Consultas: Equipe SESMT                              
                            </div>
                            <p>Com esta ferramenta é possível descobrir rapidamente a composição da equipe SESMT, conforme orientado pelas normas vigentes. Indique o CNPJ e o número de funcionários da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.</p>
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
                                    <button type="submit" onClick={()=>{dataForm.type='cnpj';setLoading(true);}}>Consultar</button>
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
                                    <button type="submit" onClick={()=>{dataForm.type='cnae'; setLoading(true);}}>Enviar</button>
                                </div>
                            </form>

                        </div>
                    </div> 

                    <div id='resultado-consulta'>

                        {loading ? <List /> : ''}

                        {!loading && response.type === 'error' ? 
                           <RespostaErro dados={response}/>
                        : ""}

                        {!loading && response.type === 'success' && respostaDadosNR.cnpj ? 
                            <RespostaSesmtCnpj dados={respostaDadosNR}/> : ""} 

                        {!loading && response.type === 'success' && !respostaDadosNR.cnpj ? 
                            <RespostaSesmtCnae dados={respostaDadosNR}/> : ""} 
                    </div>

                </div>
            </section>

            <Footer/>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="custom.js"></script>
          
        </div>
    )
}

export default ConsultaNR04;