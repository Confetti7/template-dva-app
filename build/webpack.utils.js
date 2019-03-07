const path = require('path');
const fs = require('fs');

function resolve(dir) {
    return path.join(__dirname, '../', dir);
}

function src(dir) {
    return resolve(path.join('src', dir));
}

function dirs() {
    let dirs;
    fs.existsSync(resolve('dist')) && (dirs = fs.readdirSync(resolve('dist')));
    return dirs || [];
}

function clean(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('已成功删除', filePath);
        }
    } catch (err) {
        console.log('删除文件失败', filePath);
    }
}

module.exports = {
    resolve,
    src,
    dirs,
    clean,
};
