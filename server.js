const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./dist'));

app.listen(port, function() {
    console.log(`server listening on port ${port}!`);
});
