const RespostaCipaCnpj = ({dados}) => {

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
            <h3 className='titulo2'>EQUIPE CIPA NECESSÁRIA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v"></th>
                        <th className="header-h">Representantes da organização</th>
                        <th className="header-h">Representantes dos empregados</th>                        
                    </tr>
                    <tr>
                        <th className="header-v">Membros da equipe efetiva</th>
                        <td>{dados.cipa_efetivos}</td>
                        <td>{dados.cipa_efetivos}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Membros da equipe suplente</th>
                        <td>{dados.cipa_suplentes}</td>
                        <td>{dados.cipa_suplentes}</td>
                    </tr> 
                </tbody>
                <tfoot>                    
                    <tr>
                        <td colspan="3">
                        Os representantes da organização na CIPA, titulares e suplentes, serão por ela designados.
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                        Os representantes dos empregados, titulares e suplentes, serão eleitos em escrutínio secreto, do qual participem, independentemente de filiação sindical, exclusivamente os empregados interessados.
                        </td>
                    </tr>
                </tfoot>
            </table>                 
        </div>
    )
};

export default RespostaCipaCnpj;