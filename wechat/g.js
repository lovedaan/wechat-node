/*
 * @Author: Marte
 * @Date:   2017-04-26 21:05:13
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-04-29 10:32:37
 */

'use strict';

const sha1 = require('sha1');
const getRawBody = require('raw-body');
const Wechat = require('./wechat.js');
const util = require('./util.js');


module.exports = function(opts,handler) {
    //console.log(opts);
    var wechat = new Wechat(opts);

    return function*(next) {
        var _this = this;
        //console.log(this.query);
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (this.method === 'GET') {
            //console.log('get');
            if (sha === signature) {
                this.body = echostr + '';
            } else {
                this.body = '出错了';
            }
        } else if (this.method === 'POST') {
            //console.log('post');
            if (sha !== signature) {
                this.body = '出错了';
            }

            var data = yield (getRawBody(this.req, {
                    length: this.length,
                    limit: '1mb',
                    encoding: this.charset
                }));

            //console.log(data.toString());

            var content = yield (util.parseXMLAsync(data));
            //console.log(content);

            var message = util.formatMessage(content.xml);
            //console.log(message);
            /*if(message.MsgType === 'event'){
                if(message.Event === 'subscribe'){
                    var now = new Date().getTime();

                    _this.status = 200;
                    _this.type = 'application/xml';
                    var msg = '<xml>'+
                         '<ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'+
                         '<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>'+
                         '<CreateTime>'+now+'</CreateTime>'+
                        ' <MsgType><![CDATA[text]]></MsgType>'+
                         '<Content><![CDATA[hello 童鞋!]]></Content>'+
                    '</xml>';
                    console.log(msg);
                    _this.body = msg;

                    return;
                }
            }*/
            this.weixin = message;
            yield (handler.call(this,next));
            //yield (handler.call(this,next));
            wechat.reply.call(this);
        }

    }
}