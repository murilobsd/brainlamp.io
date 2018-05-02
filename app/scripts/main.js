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

$(document).ready(function() {
    // hidden default;
    hiddenInputs('.account_free');
    changeAccountType('.account_free');
});

