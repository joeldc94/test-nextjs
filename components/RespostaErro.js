const RespostaErro = (mensagem) => (
    <div>
        <p className='alert-danger'>{mensagem}</p>
    </div>
      
    
);

RespostaErro.getInitialProps = (ctx) =>{
    return ctx.mensagem
}

export default RespostaErro;
