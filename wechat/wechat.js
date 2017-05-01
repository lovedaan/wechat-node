/*
 * @Author: Marte
 * @Date:   2017-04-27 12:15:27
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-04-28 23:29:36
 */
'use strict';

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const util = require('./util.js');

var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken: prefix + 'token?grant_type=client_credential'
}

//封装构造函数来请求access_token，因为access_token是每隔20分钟就失效
//
function Wechat(opts) {
    var selt = this;
    this.appId = opts.appId;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;


    this.getAccessToken().then(function(data) {
        //console.log(data.toString());
        try {
            data = JSON.parse(data.toString());
        } catch (e) {
            return selt.updateAccessToken();
        }
        if (selt.isValidAccessToken(data)) {

            return Promise.resolve(data);
        } else {
            return selt.updateAccessToken();
        }
    }).then(function(data) {
        //console.log(data);
        selt.access_token = data.access_token;
        selt.expires_in = data.expires_in;

        selt.saveAccessToken(data);
    });
}


//验证是否合法或过期了
Wechat.prototype.isValidAccessToken = function(data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }

    var now = new Date().getTime();
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    if (now < expires_in) {
        return true;
    } else {
        return false;
    }

}

//更新access_token
Wechat.prototype.updateAccessToken = function() {
    var appId = this.appId;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appId + '&secret=' + appSecret;

    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }).then(function(res) {
            var data = res.body;
            console.log(data.expires_in);
            var now = new Date().getTime();
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;

            resolve(data);
        });
    });

}

Wechat.prototype.reply = function(){
    var content = this.body;
    var message = this.weixin;
    var xml = util.tpl(content,message);

    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}

module.exports = Wechat;