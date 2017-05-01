/*
 * @Author: Marte
 * @Date:   2017-04-26 21:05:13
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-04-29 09:52:59
 */

'use strict';

const Koa = require('koa');
const path = require('path');
const wechat = require('./wechat/g.js');
const wechat_file = path.join(__dirname + '/config/wechat.txt');
const config = require('./config.js');
const weixin = require('./weixin.js');

var app = new Koa();
app.use(wechat(config.config.wechat,weixin.reply));

app.listen(1234);
console.log('listen : 1234');