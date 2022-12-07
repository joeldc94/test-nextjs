const RespostaSesmtCnpj = ({dados}) => {
    
    const OBSSESMT1 = '(*) Tempo parcial (mínimo de três horas)';
    const OBSSESMT2 = '(**) O dimensionamento total deverá ser feito levando-se em consideração o dimensionamento da faixa de 3.501 a 5.000, acrescido do dimensionamento do(s) grupo(s) de 4.000 ou fração acima de 2.000.';
    const OBSSESMT3 = '(***) O empregador pode optar pela contratação de um enfermeiro do trabalho em tempo parcial, em substituição ao auxiliar ou técnico de enfermagem do trabalho';

    return(
        <div className='resposta-success'>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA:</h3>
            <ul className='lista1'>
                <li>CNPJ: {dados.cnpj};</li>
                <li>Razão Social: {dados.razaoSocial};</li>
                <li>Nome Fantasia: {dados.nomeFantasia};</li>
                <li>CNAE consultado: {dados.cod_cnae};</li>
                <li>Denominação do CNAE: {dados.desc_cnae}</li>
                <li>Grau de Risco da Empresa: {dados.grau_risco};</li>
                <li>Quantidade de Trabalhadores: {dados.nro_trabalhadores} ({dados.faixa_nro_trabalhadores_sesmt});</li>
            </ul>
            <h3 className='titulo2'>EQUIPE SESMT NECESSÁRIA:</h3>
            <ul className='lista1'>
                <li>Técnicos de Segurança: {dados.nro_tecnico_seg};</li>
                <li>Engenheiros de Segurança: {dados.nro_engenheiro_seg};</li>
                <li>Auxiliares/Técnicos de Enfermagem: {dados.nro_aux_tec_enfermagem};</li>
                <li>Enfermeiros: {dados.nro_enfermeiro};</li>
                <li>Médicos: {dados.nro_medico}.</li>
            </ul>
            {dados.obsSesmt1 ? <p>{OBSSESMT1}</p> : ""}
            {/*respostaDadosNR.obsSesmt2 ? <p>{OBSSESMT2}</p> : ""*/}
            {dados.obsSesmt3 ? <p>{OBSSESMT3}</p> : ""}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA:</h3>
            <table>
                <tr>
                    <th>CNPJ:</th>
                    <td>{dados.cnpj}</td>
                </tr>
                <tr>
                    <th>Razão Social:</th>
                    <td>{dados.razaoSocial}</td>
                </tr>
                <tr>
                    <th>Nome Fantasia:</th>
                    <td>{dados.nomeFantasia}</td>
                </tr>
                <tr>
                    <th>CNAE Consultado:</th>
                    <td>{dados.cod_cnae}</td>
                </tr>
                <tr>
                    <th>Denominação:</th>
                    <td>{dados.desc_cnae}</td>
                </tr>
                <tr>
                    <th>Grau de Risco:</th>
                    <td>{dados.grau_risco}</td>
                </tr>
                <tr>
                    <th>Quantidade de Trabalhadores:</th>
                    <td>{dados.nro_trabalhadores}</td>
                </tr>
            </table>
            <h3 className='titulo2'>EQUIPE SESMT NECESSÁRIA:</h3>
            <table>
                <tr>
                    <th>Técnicos de Segurança:</th>
                    <td>{dados.nro_tecnico_seg}</td>
                </tr>
                <tr>
                    <th>Engenheiros de Segurança:</th>
                    <td>{dados.nro_engenheiro_seg}</td>
                </tr>
                <tr>
                    <th>Auxiliares/Técnicos de Enfermagem:</th>
                    <td>{dados.nro_aux_tec_enfermagem}</td>
                </tr>
                <tr>
                    <th>Enfermeiros:</th>
                    <td>{dados.nro_enfermeiro}</td>
                </tr>
                <tr>
                    <th>Médicos:</th>
                    <td>{dados.nro_medico}</td>
                </tr>
                <tfoot>
                    <tr>
                    {dados.obsSesmt1 ? {OBSSESMT1} : ""}
                    {/*respostaDadosNR.obsSesmt2 ? <p>{OBSSESMT2}</p> : ""*/}
                    {dados.obsSesmt3 ? <p>{OBSSESMT3}</p> : ""}
                    </tr>
                </tfoot>
            </table>
            
        </div>
    )
};

export default RespostaSesmtCnpj;