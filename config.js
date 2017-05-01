/*
* @Author: Marte
* @Date:   2017-04-28 23:41:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-29 09:52:32
*/

'use strict';

const path = require('path');
const util = require('./libs/util.js');
const wechat_file = path.join(__dirname + '/config/wechat.txt');
const config = {
    wechat: {
        appId: 'wx388260d8a13a0e28',
        appSecret: 'e0ba3a493f1380e3d6f78ed4d6123b5f',
        token: 'x9Y-U4X9LKg4t6RRbBo9r-dsvUXPzrIH4GpeIkhGqkgrYFqIdmjBvSxf06ycgnCnmENoWMjYL5EIRZi4Fmd2-FjNJ3JzeQPBXgetIwsDD2CnOfxt1nVoAUT5himpYJa1ZMAbAAALYM',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
}

exports.config = config;