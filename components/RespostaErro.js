const RespostaErro = ({props}) => {
    console.log("AQUI:   " + props);
    <div>
        <p className='alert-danger'>AQUI: {props.mensagem}</p>
    </div>  
}

export default RespostaErro;