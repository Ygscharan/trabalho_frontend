const express = require('express');
const Routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(Routes);


const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});