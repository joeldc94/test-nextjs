const RespostaSesmtCnae = ({dados}) => {
    
    const OBSSESMT1 = '(*) Tempo parcial (mínimo de três horas)';
    const OBSSESMT2 = '(**) O dimensionamento total deverá ser feito levando-se em consideração o dimensionamento da faixa de 3.501 a 5.000, acrescido do dimensionamento do(s) grupo(s) de 4.000 ou fração acima de 2.000.';
    const OBSSESMT3 = '(***) O empregador pode optar pela contratação de um enfermeiro do trabalho em tempo parcial, em substituição ao auxiliar ou técnico de enfermagem do trabalho';

    return(
        <div className='alert-success'>
            <h3>CARACTERÍSTICAS DA EMPRESA:</h3>
            <ul>
                <li>CNAE consultado: {dados.cod_cnae};</li>
                <li>Denominação do CNAE: {dados.desc_cnae}</li>
                <li>Grau de Risco Associado: {dados.grau_risco};</li>
                <li>Quantidade de Trabalhadores: {dados.nro_trabalhadores} ({dados.faixa_nro_trabalhadores_sesmt});</li>
            </ul><br></br>
            <h3>EQUIPE SESMT NECESSÁRIA:</h3>
            <ul>
                <li>Técnicos de Segurança: {dados.nro_tecnico_seg};</li>
                <li>Engenheiros de Segurança: {dados.nro_engenheiro_seg};</li>
                <li>Auxiliares/Técnicos de Enfermagem: {dados.nro_aux_tec_enfermagem};</li>
                <li>Enfermeiros: {dados.nro_enfermeiro};</li>
                <li>Médicos: {dados.nro_medico}.</li>
            </ul><br></br>
            {dados.obsSesmt1 ? <p>{OBSSESMT1}</p> : ""}
            {/*respostaDadosNR.obsSesmt2 ? <p>{OBSSESMT2}</p> : ""*/}
            {dados.obsSesmt3 ? <p>{OBSSESMT3}</p> : ""}
        </div>
    )
};

export default RespostaSesmtCnae;