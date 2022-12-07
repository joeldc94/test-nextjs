const RespostaErro = ({dados}) => {
    return(
        <div className='alert-danger'>
            <p className='error'>{dados.mensagem}</p>
        </div>
    );
}

export default RespostaErro;