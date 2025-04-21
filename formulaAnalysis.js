export function infixToPostfix(expression) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    const stack = [];
    const output = [];
    
    const tokens = expression.match(/(\d+\.\d+|\d+|[\+\-\*\/\(\)])|-/g);
    
    tokens.forEach((token, index) => {
        if (/^-?\d+(\.\d+)?$/.test(token)) {
            output.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else {
            // 修正: '-' が単項演算子の場合を考慮
            if (
                token === '-' &&
                (index === 0 || tokens[index - 1] === '(' || /[\+\-\*\/]/.test(tokens[index - 1]))
            ) {
                output.push('0'); // 単項マイナスを 0 - x に変換
            }
            while (
                stack.length && 
                stack[stack.length - 1] !== '(' && 
                precedence[token] <= precedence[stack[stack.length - 1]]
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    });
    
    while (stack.length) {
        output.push(stack.pop());
    }
    
    return output.join(' ');
}

export function evaluatePostfix(expression) {
    const stack = [];
    const tokens = expression.split(' ');
    
    tokens.forEach(token => {
        if (/^-?\d+(\.\d+)?$/.test(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    });
    
    return stack[0];
}
