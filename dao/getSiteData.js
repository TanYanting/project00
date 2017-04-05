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
        dataStr.siteNameStr=$('[name=staname]').val();
        // dataStr.stateStr=$('[name=stastatus]').val();
        // dataStr.stateInfoStr=$('[name=stationinfo]').val();
        //存入数据库
        //监测站
        let site=pushArr(dataStr.siteNameStr);
        let siteSql='INSERT site(site_id,site_name) values';
        for(let i=0,j=0;i<223;i++){
            if(i==0){
                siteSql+=`(${i},'未知')`;
                continue;
            }
            if(site[j][0]==i){
                siteSql+=`,(${site[j][0]},'${site[j][1]}')`;
                j++;
            }else{
                siteSql+=`,(${i},'')`;
            }
        }

        query(siteSql,'',function (res) {
            console.log(res.code);
        })

        res.send(siteSql);
    });
});

getdata.listen(3000,function () {
    console.log('getdata is listen in port 3000!');
});