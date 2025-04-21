document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('btn_eval');
    fetchBtn.addEventListener('click', async () => {
        const display = document.getElementsByClassName('display')[0];
        const calcResult = display.value;
        try {
            const response = await fetch('http://localhost:8000/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ result: calcResult })
            });
            const data = await response.json();
            if (response.ok) {
                // 計算機の下に送信成功メッセージを表示
            } else {
                console.error("Error evaluating expression:", data.error);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    });
});
