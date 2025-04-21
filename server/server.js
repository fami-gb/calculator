const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

let data = "";

app.use(cors());
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
    data = req.body.result;
    return res.status(200).json({ message: '計算結果を取得しました。'});
});

app.get('/api/data', (req, res) => {
    if (!data) { return res.status(400).json({ message: '計算結果が見つかりません。' }) }
    return res.status(200).json( { result: data });
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})
