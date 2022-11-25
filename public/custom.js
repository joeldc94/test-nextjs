$(function(){
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })
})

$(function(){
    $('.btnCNPJ').click(function(){
        $('.formCNPJ').show();
        $('.formCNAE').hide();
    })
})

$(function(){
    $('.btnCNAE').click(function(){
        $('.formCNAE').show();
        $('.formCNPJ').hide();
    })
})