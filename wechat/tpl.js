/*
* @Author: Marte
* @Date:   2017-04-28 22:57:03
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-29 10:02:05
*/

'use strict';

const ejs = require('ejs');
const heredoc = require('heredoc');

var tpl = heredoc(function(){/*
    <xml>
         <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
         <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
         <CreateTime><%= createTime %></CreateTime>
         <MsgType><![CDATA[<%= msgType %>]]></MsgType>
         <% if( msgType === 'text'){ %>
            <Content><![CDATA[hello 童鞋!]]></Content>
         <% } else if( msgType === 'image'){ %>
            <Image>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
            </Image>
         <% } else if( msgType === 'voice'){ %>
            <Voice>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
            </Voice>
         <% } else if( msgType === 'video'){ %>
            <Video>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
            </Video>
         <% } else if( msgType === 'music'){ %>
            <Music>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
                <MusicUrl><![CDATA[<%= musicUrl%>]]></MusicUrl>
                <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
                <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
            </Music>
         <% } else if( msgType === 'news'){ %>
            <ArticleCount><%= content.length %></ArticleCount>
            <Articles>
                <% content.forEach(function(item){ %>
                <item>
                    <Title><![CDATA[<%= item.title %>]]></Title>
                    <Description><![CDATA[<%= item.description1 %>]]></Description>
                    <PicUrl><![CDATA[<%=item.picurl %>]]></PicUrl>
                    <Url><![CDATA[<%= item.url %>]]></Url>
                </item>
                <% }) %>
            </Articles>
        <% } %>
    </xml>
*/});

var compile = ejs.compile(tpl);

exports = module.exports = {
    compile : compile
}