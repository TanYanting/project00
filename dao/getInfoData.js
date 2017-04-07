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
        dataStr.infoStr=$('[name=stainfo]').val();
        // dataStr.siteNameStr=$('[name=staname]').val();
        // dataStr.stateStr=$('[name=stastatus]').val();
        // dataStr.stateInfoStr=$('[name=stationinfo]').val();
        //存入数据库
        //监测站点信息表
        let info=pushArr(dataStr.infoStr);
        let infoSql='INSERT info(sid,ph,dissolved_oxyge,ammontia,permanganate_index,wtime) values';
        for(let i=0;i<info.length-3;i++){
            for(let j=0;j<info[i].length;j++){
                debugger;
                if(info[i][j]!='undefined'){
                    info[i][j]=(info[i][j]).replace(/\s+/g,'');
                    info[i][j]=(info[i][j]=='-')?9999:info[i][j];
                }
            }
            let n=info[i].length;
            if(info[i][12]){
                let timeStr=info[i][12].replace(/-/g,'/')+' '+info[i][1];
                info[i][n]=new Date(timeStr).getTime();
            }
            if(i==0){
               // infoSql+=`(${info[i][0]},${info[i][2]},${info[i][4]},${info[i][10]},${info[i][6]},${info[i][n]})`;
                infoSql+=``;
            }else if(i==1){
                infoSql+=`(${info[i][0]},${info[i][2]},${info[i][4]},${info[i][10]},${info[i][6]},${info[i][n]})`;
            }else{
                infoSql+=`,(${info[i][0]},${info[i][2]},${info[i][4]},${info[i][10]},${info[i][6]},${info[i][n]})`;
            }
        }
        query(infoSql,'',function (res) {
            console.log(res.code);
        })

        res.send(infoSql);
    });
});

getdata.listen(3000,function () {
    console.log('getdata is listen in port 3000!');
});