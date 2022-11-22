function myFunction(nfunc) {
    document.getElementById("result").value = nfunc;
}


function validareConsultar(nfunc) {
    var cnaesPreenchidos = 0;
    if(nfunc == null || nfunc == ""){
        alert("Erro: Selecione o número de funcionários!")
        return
    }
    //alert("Checar CNAE")

    for(var i=1; i<=10; i++)
    {
        var cnaePref = "cnae_"
        var cnaeName = cnaePref + i;                
        var cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;
        var element = document.getElementById(cnaeName);

        //cnaesPreenchidos = 0;
        
        if(typeof(element) != 'undefined' && element != null){
            //cnae element existe
            if(element.value != null && element.value != ""){
                //cnae foi preenchido
                //alert('Element '+cnaeName+' exists!');
                if(element.value.match(cnaeRegex)){
                    //cnae está no formato correto
                    //alert('CNAE ' +i+' ok');
                    cnaesPreenchidos++;
                }
                else{
                    alert('Erro: CNAE '+i+' não está no formato correto');
                    return;
                }
            }
            else{
                //cnae não foi preenchido
                //alert("Preencha o CNAE "+i);
            }
        }
        else{
            //cnae não foi criado
            //alert('Element '+cnaeName+' does not exist!');
            //return
            break;
        }
    }
    if(cnaesPreenchidos<1){
        alert("Erro: Insira ao menos 1 Código CNAE");
    }
    else{
        alert("Foram inseridos "+cnaesPreenchidos+" CNAEs");
    }
}

var cnae_num = 1;

$("#box").click(function(){
    if(cnae_num<10){
        var add="";
        cnae_num++;
        add+='<p>CNAE '+ cnae_num +': <input type="text" id="cnae_' + cnae_num + '"><br/></p>';
        $("#cnae").append(add);
    }else
        alert('Número máximo de CNAEs adicionados');
    
});