const express = require('express');
const compression = require('compression');
const app = express();
const port = 3000;

app.use(compression({ filter: shouldCompress }));
app.use(express.static('./dist'));

app.listen(port, function() {
    console.log(`server listening on port ${port}!`);
});

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
