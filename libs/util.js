/* 
 * @Author: Marte
 * @Date:   2017-04-27 11:48:45
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-04-27 11:55:26
 */

'use strict';

const fs = require('fs');
const Promise = require('bluebird');

//异步读取文件
exports.readFileAsync = function(fPath, encoding) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fPath, encoding, function(err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}

//异步写入文件
exports.writeFileAsync = function(fPath, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(fPath, content, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}