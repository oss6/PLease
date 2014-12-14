window.onload = function () {
    var eval_btn = document.getElementById('eval'),
        operators = document.getElementsByClassName('operator'),
        prem_input = document.getElementById('prem'),
        concl_input = document.getElementById('concl'),
        fprem = true;
    
    prem_input.addEventListener('focus', function () {
        fprem = true;
    }, false);
    
    concl_input.addEventListener('focus', function () {
        fprem = false;
    }, false);
    
    for (var i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function (e) {
            console.log(document.activeElement);
            
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
    
    eval_btn.addEventListener('click', function (e) {
        //prem,prem,prem:concl
        // Construct string
        var prem = prem_input.value,
            concl = concl_input.value;
        
        if (prem === '' || concl === '') {
            alert('hold on!');  
        }
        else {
            pl.eval(prem + ':' + concl);
        }
    }, false);
};