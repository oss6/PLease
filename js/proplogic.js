var pl = (function (undefined) {
    // Variables
    var op_map = {
        '→': 'IMPL',
        '∧': 'AND',
        '∨': 'OR',
        '¬': 'NOT'
    },
    operators = ['IMPL', 'AND', 'OR', 'NOT'],
    arity = {
        'IMPL': 2,
        'AND': 2,
        'OR': 2,
        'NOT': 1
    };
    
    // Functions
    var get_precedence = function (operator) {
        switch (operator) {
                case 'NOT': return 4;
                case 'AND': return 3;
                case 'OR': return 2;
                case 'IMPL': return 1;
        }
        
        return null;
    };
    
    var implify = function (str) {
        var arg = str.split(':');
        var premises = arg[0].split(',');
        return '(' + premises.join('∧') + ')→' + arg[1];
    };
    
    var map = function (arr) {
        var new_arr = [],
            len = arr.length,
            i;
        
        for (i = 0; i < len; i++) {
            var val = arr[i];
            new_arr.push(op_map[val] !== undefined ? op_map[val] : val);
        }
        
        return new_arr;
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
                
                // If stack is empty...
                
                stack.pop();
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
        
        console.log(map(out_queue));
        
        return map(out_queue);
    };
    
    // arg = "prem,prem,prem:concl"
    var get_props = function (arr) {
        var new_arr = [];
        
        for (var i = 0; i < arr.length; i++) {
            var val = arr[i];
            
            if (op_map[val] === undefined)
                new_arr.push(val);
        }
    };
    
    /**
        PROP => [T, T, T, T ....]
    */
    var eval_expr = function (operands, operator) {
        switch (operator) {
                case 'NOT':
                
                break;
                case 'AND': break;
                case 'OR': break;
                case 'IMPL': break;
        }
    };
    
    // n = number of elements
    // m = number of alternate
    var fill = function (n, m) {
        var fill_value = true,
            arr = [];
        
        for (var i = 1; i <= n; i++) {
            arr.push(fill_value);
            
            if (i % m === 0)
                fill_value = !fill_value;
        }
        
        return arr;
    }
    
    var get_keys = function (obj) {
        var keys = [];
        
        for(var key in obj) {
            keys.push(key);
        }
        return keys;
    }
    
    // ['p', 'q'] --> [{'p': [t, t]}, {'q': [f, f]}]
    var to_prop_inst = function (props) {
        var n = props.length,
            combs = Math.pow(2, n),
            new_arr = [],
            props_rev = props.reverse();
        
        for (var i = 0; i < n; i++) {
            var new_val = {};
            
            new_val[props[i]] = fill(combs, Math.pow(2, i));
            new_arr.push(new_val);
        }
        
        return new_arr;
    };
    
    var replace_props = function (arr, prop_inst) {
        var new_arr = [],
            len = arr.length,
            i;
        
        for (i = 0; i < len; i++) {
            if (prop_inst[arr[i]] !== undefined)
                new_arr.push(prop_inst[arr[i]]);
            else
                new_arr.push(arr[i]);
        }
        
        return new_arr;
    };
    
    // arg = "prem,prem,prem:concl" --> gets no spaces etc...
    var eval = function (arg) {
        arg = arg.replace(/ /g, '');
        console.log(arg);
        
        var parsed = parse(arg),
            props = get_props(parsed),
            prop_inst = to_prop_inst(props),
            tokens = replace_props(parsed, prop_inst),
            len = tokens.length,
            stack = [];
        
        // Convert propositions to instantiations
        // [{'p': [T; T; F; F]}, {'q': ...}, ...];
        
        for (var i = 0; i < len; i++) {
            var token = tokens[i],
                key = get_keys(token);
            
            // Proposition
            if (key.indexOf(operators) === -1)
                stack.push(token);
            // Operator
            else {
                var n = arity[token],
                    args = [];
                
                if (stack.length < n)
                    return false; // (Error) The user has not input sufficient values in the expression
                
                for (var i = 0; i < n; i++)
                    args.push(stack.pop()); 
                
                var result = eval_expr(args, token);
                stack.push(result);
            }
        }
        
        if (stack.length === 1) {
            // check result
            console.log(stack[0]);
        }
        else {
            return false; // (Error) The user input has too many values   
        }
    };
    
    return {
        eval: eval
    }
})();