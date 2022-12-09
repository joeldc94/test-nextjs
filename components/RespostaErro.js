const RespostaErro = ({dados}) => {
    return(
        <div className='resposta-erro'>
            <p className='error'>{dados.mensagem}</p>
        </div>
    );
}

export default RespostaErro;