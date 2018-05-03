String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

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
                offset = $('.header').height() + 10;
            }
            $('html').animate({scrollTop: $(id).offset().top - offset}, 700);
        }
        return false;
    });
}

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };
  
  var states = ['Ironman Alabama', 'Ironman Alaska', 'Ironman Arizona', 'Arkansas', 'California',
    'Ironman Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Ironman Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Ironman Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Ironman Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'Ironman New Jersey', 'Ironman New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ironman Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'Ironman South Carolina', 'Ironman South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Ironman Virginia', 'Ironman Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  var chart = function()  {
      // Bar chart
    //   window.addEventListener('load', function() {
        new Chart(document.getElementById("chart-area"), {
            type: 'pie',
    data: {
      labels: ["Finish", "DNS-Swmin", "DNS-Bike", "DNS-Run"],
      datasets: [{
        label: "Quantity",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784]
      }]
    },
    options: {
      title: {
        display: false,
        text: 'Predicted world population (millions) in 2050'
      }
    }
        });
    
        new Chart(document.getElementById("chart-averages"), {
            type: 'bar',
            data: {
                labels: ["All", "Women", "Men"],
                datasets: [{
                    label: "Swmin",
                    backgroundColor: "#F29220",
                    borderColor: "#F29220",
                    data: [40,20,30]
                    }, {
                    label: "Bike",
                    backgroundColor: "#4365B0",
                    borderColor: "#4365B0",
                    data: [60,80,70]
                    }, {
                    label: "Run",
                    backgroundColor: "#D00",
                    borderColor: "#D00",
                    data: [10,5,10]
                    }]
            },
            options: {
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                          },
                          label: function(tooltipItem, data) {
                            return  data['datasets'][0]['label']+": "+data['datasets'][0]['data'][tooltipItem['index']].toString().toHHMMSS();
                          }
                    }
                  },
                scales: {
                    xAxes: [{stacked: true}],
                    yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: false,
                        callback: function(value, index, values) {
                            return value.toString().toHHMMSS();
                            // if(parseInt(value) >= 1000){
                            //   return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            // } else {
                            //   return '$' + value;
                            // }
                          }
                    }
                }]
                }
            }
        });
    //   });
  };


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

    });


    var $input = $(".typeahead");
    $input.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },{
        name: 'states',
        source: substringMatcher(states)
    });

    $input.change(function() {
        var current = $input.typeahead("getActive");
        if (current) {
            // Some item from your model is active!
            console.log($input.val());
            if (current.name == $input.val()) {
            // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
            } else {
            // This means it is only a partial match, you can either add a new item
            // or take the active if you don't want new items
            }
        } else {
            // Nothing is active so it is a new value (or maybe empty value)
        }
    });

    
    chart();

    
});

