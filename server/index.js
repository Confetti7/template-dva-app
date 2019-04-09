const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(compression());

app.use(express.static('./dist'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.listen(port, function () {
    console.log(`server is listening on http://localhost:${port}`);
});

// 支持https
// const spdy = require('spdy');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync(__dirname + '/server.key'),
//     cert: fs.readFileSync(__dirname + '/server.crt'),
// };

// spdy.createServer(options, app).listen(port, (error) => {
//     if (error) {
//         console.error(error);
//         return process.exit(1);
//     }
//     console.log(`server is listening on http://localhost:${port}!`);
// });
