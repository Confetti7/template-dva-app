const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '../', dir);
}

function src(dir) {
    return resolve(path.join('src', dir));
}

module.exports = {
    resolve,
    src
};
