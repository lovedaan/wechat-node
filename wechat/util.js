/*
* @Author: Marte
* @Date:   2017-04-28 20:45:09
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-29 10:35:29
*/

'use strict';

const xml2js = require('xml2js');
const Promise = require('bluebird');
const tpl = require('./tpl.js');

exports.parseXMLAsync = function(xml){
    return new Promise(function (resolve,reject) {
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        });
    });
}

function formatMessage(result){
    var message = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(var i = 0; i<keys.length; i++){
            var item = result[keys[i]];
            var key = keys[i];

            if(!(item instanceof Array) || item.length === 0){
                continue;
            }

            if(item.length === 1){
                var val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }
            }else{
                message[key] = [];
                for(var j = 0, k = item.length; j<k;j++){
                    message[key].push(formatMessage(item[j]));
                }
            }

        }
    }

    return message;
}

exports.formatMessage = formatMessage;

exports.tpl = function(content,message){
    console.log(message);
    var info = {};
    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;

    if(Array.isArray(content)){
        type = 'news';
    }
    type = message.MsgType || type;
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = toUserName;
    info.fromUserName = fromUserName;

    return tpl.compile(info);
}