const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (__, res) => {
    res.json({
        mensagem: 'API funcionando!',
        versao: '1.0.0',
        timestamp: new Date().toISOString()
    });
});


module.exports = app;