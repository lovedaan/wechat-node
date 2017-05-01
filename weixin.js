/*
* @Author: Marte
* @Date:   2017-04-29 09:27:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-29 10:13:24
*/

'use strict';

exports.reply = function *(next){
    var message = this.weixin;

    //判断是事件推送，普通消息
    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            //订阅
            if(message.EventKey){
                //通过二维码扫描进来的
                console.log('通过二维码扫描进来的 :'+message.EventKey + ' ' + message.Ticket);
            }

            this.body = '哈哈，你订阅了这个公众号\r\n' + '消息ID：'+message.MsgId;
        }
        else if(message.Event === 'unsubscribe'){
            //取消订阅
            console.log('无情取关！');
            this.body = '';
        }
    }else{

    }

    yield (next);
}