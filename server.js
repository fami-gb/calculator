import { infixToPostfix, evaluatePostfix } from './formulaAnalysis.js';

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementsByClassName('display')[0];
    const fetchBtn = document.getElementById('btn_eval');
    const ulElement = document.getElementsByClassName('history-list')[0];
    fetchBtn.addEventListener('click', async () => {
        // 数式取得->evaluateで構文解析・計算
        const formula = display.value;
        const result = evaluate(formula);
        display.value = result;
        if (result === 'Error') return;
        const calcResult = formula + ' = ' + result;
        try {
            const response = await fetch('https://192.168.10.12:8000/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ result: calcResult })
            });
            if (response.ok) {
                const data = await response.json();
                ulElement.innerHTML = '';
                data.forEach((c) => {
                    const liElement = document.createElement('li');
                    liElement.className = 'history-item';
                    liElement.innerHTML = c.result + `<span class="calc-date">\
                    [${c.date}]</span>`;
                    ulElement.appendChild(liElement);
                });
            } else {
                console.error("Error evaluating expression:", data.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    });

});

function evaluate(expression) {
    try {
        const postfix = infixToPostfix(expression);
        const result = evaluatePostfix(postfix);
        return result;
    } catch (error) {
        console.error("Error evaluating expression:", error);
        return 'Error';
    }
}
