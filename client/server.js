document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('btn_eval');
    fetchBtn.addEventListener('click', async () => {
        const display = document.getElementsByClassName('display')[0];
        const ulElement = document.getElementsByClassName('history-container')[0];
        ulElement.className = 'history-container';
        const calcResult = display.value;
        try {
            const response = await fetch('http://localhost:8000/api/data', {
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
