/*
Hidden elements
*/
function hiddenInputs(selector) {
    $(selector).each(function(){
        $(this).hide();
    });
}

/*
Show elements
*/
function showInputs(selector) {
    $(selector).each(function(){
        $(this).show();
        $(this).addClass('animated fadeIn');
    });
}

function changeAccountType(selector) {

    $('input[name=\'account_type\']').on('click', function() {
        if ($('input#account_patreon').is(':checked')) {
            if(!$('input#email').val()) { 
                $('input#email').attr('placeholder', 'Email registered in patreon');
            }
            hiddenInputs(selector);
        } else {
            showInputs(selector);
            if(!$('input#email').val()) { 
                $('input#email').attr('placeholder', 'Your email');
            }
        }
    });
}
function scrollTo() {
    $('[data-scrollto]').on('click', function(){
        var id = '#' + $(this).data('scrollto');
        if ( $(id).length > 0 ) {
            var offset = 0;
            if ( $('.header').length ) {
                offset = $('.header').height();
            }
            $('html').animate({scrollTop: $(id).offset().top - offset}, 700);
        }
        return false;
    });
}


$(document).ready(function() {
    // hidden default;
    hljs.initHighlightingOnLoad();
    $('#form-response').show();
    hiddenInputs('.account_free');
    changeAccountType('.account_free');
    scrollTo();

    $('#form-apikey').submit(function(e) {
        e.preventDefault();
        var fullname = $('#fullname').val(),
            email = $('#email').val(),
            account_type = $('input[name=\'account_type\']:checked').val(),
            use = $('#use').val();
        
        $.ajax({
            type: 'POST',
            url: 'https://api.brainlamp.io/v1/apike',
            contentType: 'application/json',
            data: JSON.stringify({
                'fullname': fullname,
                'email': email,
                'use': use,
                'account_type': account_type
            }),
            success: function(res){
                console.log(res);
                console.log(res.data);
                $('#form-response').html('<div class="alert alert-success rounded-0" role="alert"><strong>Please!</strong> You successfully read this important alert message.</div>');
            },
            error: function(res){
                $('#form-response').html('<div class="alert alert-danger rounded-0" role="alert"><strong>Please!</strong> You successfully read this important alert message.</div>');
            }
        });

    })
});

