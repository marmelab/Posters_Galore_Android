/* eslint-disable */
var babel = require('babel-core');

module.exports = {
    process: function (src, filename) {
        var result = babel.transform(src, {
            filename: filename
       });

        return result.code;
    }
};
