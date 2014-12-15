window.onload = function () {
    var eval_btn = document.getElementById('eval'),
        operators = document.getElementsByClassName('operator'),
        prem_input = document.getElementById('prem'),
        concl_input = document.getElementById('concl'),
        result_tooltip = document.getElementById('result'),
        tooltip_trigger = document.getElementById('trigger'),
        fprem = true;
    
    // Premise button listener
    prem_input.addEventListener('focus', function () {
        fprem = true;
    }, false);
    
    // Conclusion button listener
    concl_input.addEventListener('focus', function () {
        fprem = false;
    }, false);
    
    tooltip_trigger.addEventListener('click', function () {
        var classes = result_tooltip.className.split(' ');
        
        classes.splice(classes.indexOf('hover'), 1);
        result_tooltip.className = classes;
        result_tooltip.innerHTML = '';
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
            result_tooltip.innerHTML = 'Give me something!'; 
        }
        else {
            
            
            if (pl.eval(prem + ':' + concl)) {
                //alert("Valid argument!");
                result_tooltip.innerHTML = 'Argument valid!';
            }
            else {
                //alert("Invalid argument!");
                
                result_tooltip.innerHTML = 'Argument invalid!';
            }
        }
        
        result_tooltip.className = result_tooltip.className + " hover";
    }, false);
};