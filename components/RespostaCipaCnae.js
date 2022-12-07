const RespostaCipaCnae = ({dados}) => {

    return(
        <div className='alert-success'>
            <h3>CARACTERÍSTICAS DA EMPRESA:</h3>
            <ul>
                <li>CNAE consultado: {dados.cod_cnae};</li>
                <li>Denominação do CNAE: {dados.desc_cnae}</li>
                <li>Grau de Risco Associado: {dados.grau_risco};</li>
            </ul><br></br>
            <h3>EQUIPE CIPA NECESSÁRIA:</h3>
            <ul>
                <li>Membros da equipe efetiva: {dados.cipa_efetivos};</li>
                <li>Membros da equipe suplente {dados.cipa_suplentes}.</li>
            </ul>
        </div> 
    )
};

export default RespostaCipaCnae;