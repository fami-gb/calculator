import { infixToPostfix, evaluatePostfix } from './formulaAnalysis.js';

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn_number, .btn_operator');
    const btnDel = document.querySelectorAll('.btn_del');
    const btnCalc = document.getElementById('btn_eval');
    const display = document.getElementsByClassName('display')[0];
    
    // 数値と演算子入力
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            let clickedContent = event.target.textContent;
            if (clickedContent === '×') { clickedContent = '*' }
            else if (clickedContent === '÷') { clickedContent = '/' }
            const cursorPosition = display.selectionStart;
            const currentValue = display.value;
            display.value = currentValue.slice(0, cursorPosition) + clickedContent + currentValue.slice(cursorPosition);
        });
    });

    // 文字列削除
    btnDel.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.target.textContent == 'C') { display.value = display.value.slice(0, -1) }
            else if (event.target.textContent == 'AC') { display.value = '' }
        });
    });

    btnCalc.addEventListener('click', () => {
        const expression = display.value;
        try {
            const postfix = infixToPostfix(expression);
            const result = evaluatePostfix(postfix);
            display.value = result;
        } catch (error) {
            console.error("Error evaluating expression:", error);
            display.value = "Error";
        }
    });
});
