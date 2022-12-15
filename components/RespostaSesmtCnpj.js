const RespostaSesmtCnpj = ({dados}) => {
    
    const OBSSESMT1 = '(*) Tempo parcial (mínimo de três horas)';
    const OBSSESMT2 = '(**) O dimensionamento total deverá ser feito levando-se em consideração o dimensionamento da faixa de 3.501 a 5.000, acrescido do dimensionamento do(s) grupo(s) de 4.000 ou fração acima de 2.000.';
    const OBSSESMT3 = '(***) O empregador pode optar pela contratação de um enfermeiro do trabalho em tempo parcial, em substituição ao auxiliar ou técnico de enfermagem do trabalho';

    return(
        <div className='resposta-success'>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v">CNPJ</th>
                        <td>{dados.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Razão Social</th>
                        <td>{dados.razaoSocial}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Nome Fantasia</th>
                        <td>{dados.nomeFantasia}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Porte da Empresa</th>
                        <td>{dados.porte}</td>
                    </tr>
                    <tr>
                        <th className="header-v">CNAE Principal</th>
                        <td>{dados.cod_cnae}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Denominação</th>
                        <td>{dados.desc_cnae}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Grau de Risco da Empresa</th>
                        <td>{dados.grau_risco}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Quantidade de Trabalhadores</th>
                        <td>{dados.nro_trabalhadores}</td>
                    </tr>
                </tbody>
            </table>                
            <h3 className='titulo2'>EQUIPE SESMT NECESSÁRIA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v">Técnicos de Segurança</th>
                        <td>{dados.nro_tecnico_seg}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Engenheiros de Segurança</th>
                        <td>{dados.nro_engenheiro_seg}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Auxiliares/Técnicos de Enfermagem</th>
                        <td>{dados.nro_aux_tec_enfermagem}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Enfermeiros</th>
                        <td>{dados.nro_enfermeiro}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Médicos</th>
                        <td>{dados.nro_medico}</td>
                    </tr> 
                </tbody>
                <tfoot>
                    {dados.obsSesmt1 ? 
                    <tr>
                        <td colspan="2">
                            {dados.obsSesmt1 ? <p className="obs">{OBSSESMT1}</p> : ""}
                        </td>
                    </tr>
                    : ""}
                    {dados.obsSesmt2 ? 
                    <tr>
                        <td colspan="2">
                            {/*respostaDadosNR.obsSesmt2 ? <p>{OBSSESMT2}</p> : ""*/}
                        </td>
                    </tr>
                    : ""}
                    {dados.obsSesmt3 ? 
                    <tr>
                        <td colspan="2">
                            {dados.obsSesmt3 ? <p className="obs">{OBSSESMT3}</p> : ""}
                        </td>
                    </tr>
                    : ""}
                </tfoot>                 
            </table>
            <div>  
                {dados.dispensaPGR ?
                <div className="avisoDispensaPGR">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>
                        Com as características encontradas, a empresa consultada dispensa a elaboração de PGR. Também está dispensada da elaboração de PCMSO, desde que não sejam identificados riscos físicos, químicos, biológicos ou relacionados a fatores ergonômicos.
                    </p>
                    <p>Para a comprovação desta dispensa, é necessária a elaboração da Declaração de Inexistência de Riscos.</p>
                </div>
                : ""} 
            </div>            
        </div>
    )
};

export default RespostaSesmtCnpj;