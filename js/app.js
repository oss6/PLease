window.onload = function () {
    var eval_btn = document.getElementById('eval'),
        operators = document.getElementsByClassName('operator'),
        prem_input = document.getElementById('prem'),
        concl_input = document.getElementById('concl'),
        fprem = true;
    
    // Premise button listener
    prem_input.addEventListener('focus', function () {
        fprem = true;
    }, false);
    
    // Conclusion button listener
    concl_input.addEventListener('focus', function () {
        fprem = false;
    }, false);
    
    // Operator buttons' listeners
    for (var i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function (e) {
            if (fprem) {
                prem_input.value += e.srcElement.innerText;
                prem_input.focus();
            }
            else {
                concl_input.value += e.srcElement.innerText;
                concl_input.focus();
            }
        }, false);
    }
    
    // Eval button listener
    eval_btn.addEventListener('click', function (e) {
        //prem,prem,prem:concl
        // Construct string
        var prem = prem_input.value,
            concl = concl_input.value;
        
        if (prem === '' || concl === '') {
            alert('Hold on!');  
        }
        else {
            if (pl.eval(prem + ':' + concl))
                alert("Valid argument!");
            else alert("Invalid argument!");
        }
    }, false);
};