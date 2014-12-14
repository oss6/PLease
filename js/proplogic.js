(function (undefined) {
    var op_map = {
        '→': 'IMPL',
        '∧': 'AND',
        '∨': 'OR',
        '¬': 'NOT'
    };
     
    /*var par = {
        '(': 'LPAR',
        ')': 'RPAR'
    };*/
    
    /*
    define data structure
    */
    
    var get_precedence = function (operator) {
        switch (operator) {
                case 'NOT': return 4;
                case 'AND': return 3;
                case 'OR': return 2;
                case 'IMPL': return 1;
        }
        
        return null;
    }
    
    var implify = function (str) {
        var arg = str.split(':');
        var premises = arg[0].split(',');
        return '(' + premises.join('∧') + ')→' + arg[1];
    };
    
    // Convert from "prem, prem, prem : concl" -> "(prem and prem and prem) -> concl
    // Queue: enq -> push, deq -> shift
    // Stack: enq -> push, deq -> pop
    var parse = function (str) {
        var tokens = implify(str).split(''),
            len = tokens.length,
            stack = [],
            out_queue = [];
        
        for (var i = 0; i < len; i++) {
            var token = tokens[i];
            
            // Operator token
            if (op_map[token] !== undefined) {
                while (stack.length > 0 && // Check this
                       op_map[stack[stack.length - 1]] !== undefined &&
                       get_precedence(token) <= get_precedence(op_map[stack[stack.length - 1]])) {
                    out_queue.push(stack.pop());
                }
                stack.push(token); 
            }
            // Left parenthesis token
            else if (token === '(') {
                stack.push(token);
            }
            // Right parenthesis token
            else if (token === ')') {
                while (stack.length > 0 && stack[stack.length - 1] !== '(')
                    out_queue.push(stack.pop());
            }
            // Proposition
            else {
                out_queue.push(token);
            }
        }
        
        // While there are still operator tokens in the stack
        while (stack.length > 0) {
            if (stack[stack.length - 1] === '(' || stack[stack.length - 1] === ')')
                return false; // Syntax exception
            
            out_queue.push(stack.pop());
        }
        
        return out_queue;
    };
    
    var getPropositions = function (str) {
        
    };
    
    // arg = "prem,prem,prem:concl" --> gets no spaces etc...
    var eval = function (arg) {
        
    };
    
    return {
        eval: eval
    }
})();