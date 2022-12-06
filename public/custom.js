$(function(){
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })
})



$(function(){
    $('.btnCNPJ').click(function(){
        $('.formCNPJ').show();
       //$('.selecionaEntrada').toggleClass(".btnCNPJ",true);
        $('.formCNAE').hide();
    })
})

$(function(){
    $('.btnCNAE').click(function(){
        $('.formCNAE').show();
        //$('.selecionaEntrada').toggleClass(".btnCNPJ", false);
        $('.formCNPJ').hide();
    })
})