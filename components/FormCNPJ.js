const FormCNPJ = () => (
    <form className='formCNPJ' onSubmit={sendInfo}>
        <div className='fields'>
            <div className='field'>
                <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa" onChange={onChangeInput} value={dataForm.cnpj} />
            </div>
        </div>
        <div className='fields'>
            <div className='field email'>
                <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.numero_trabalhadores} />
            </div>
        </div>
        
        <div className='button-area'>
            <button type="submit">Enviar</button>
        </div>                                
    </form>
);

export default FormCNPJ;