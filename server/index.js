const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const port = 3000;

app.use(
    compression({
        filter: function (req, res) {
            if (req.headers['x-no-compression']) {
                // don't compress responses with this request header
                return false;
            }
            return compression.filter(req, res);
        },
    }),
);

app.use(express.static('./dist'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.listen(port, function () {
    console.log(`server listening on port ${port}!`);
});
