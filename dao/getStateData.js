/**
 * Created by Ablio on 2017/4/4.
 * 用于从国家水质自动见测站获取数据 爬虫
 * 国家水质监测站：http://online.watertest.com.cn/
 * superagent,cheerio
 */
var experss=require('express');
var cheerio=require('cheerio');
var superagent=require('superagent');

var getdata=experss();
//数据库
var query=require('./pool');
//sql语句
var sql=require('./sql');

function pushArr(str) {
    let arr=str.split('!!');
    let arrObj=[];
    for(let i=0;i<arr.length;i++){
         arrObj.push(arr[i].split('$'));
    }
    return arrObj;
}

getdata.get('/',function (req,res,next) {
    superagent.get('http://online.watertest.com.cn').end(function (err,sres) {
        if(err){
            return next(err);
        }
        var $=cheerio.load(sres.text);//解析
        var dataStr={};
        //获取字符串数据
        // dataStr.infoStr=$('[name=stainfo]').val();
        // dataStr.siteNameStr=$('[name=staname]').val();
        dataStr.stateStr=$('[name=stastatus]').val();
        dataStr.stateInfoStr=$('[name=stationinfo]').val();
        //存入数据库
        //存入状态数据，同时，将原状态添加到历史状态表中
        let code=[];
        var state=pushArr(dataStr.stateStr);
        for(let i=0;i<state.length;i++){
            query(sql.site.updateState,[state[i][1],state[i][0]],function (rest) {
                console.log(rest.data);
                code.push(rest.code);
            });
        }
    });
});

getdata.listen(3000,function () {
    console.log('getdata is listen in port 3000!');
});