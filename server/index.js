const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(compression());

app.use(express.static('./dist'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(port, function () {
    console.log(`server is listening on http://localhost:${port}`);
});
