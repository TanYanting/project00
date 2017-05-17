/**
 * Created by Ablion on 2017/4/6.
 * 用于站点管理界面的数据
 */
var express = require('express');
var router = express.Router();
//数据库
var connection=require('../conf/db');
//sql语句
var sql=require('../dao/sql');
//查询函数
var query=require('../dao/pool');

//地域联动菜单
//一级菜单
router.get('/',function (req,res) {
    query(sql.province.queryAll,'',function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
//站点列表 地区
router.post('/provincelist',function (req,res) {
    var pid=req.body.pid;
    query(sql.site.queryEachProvince,pid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});

//水系联动菜单
//一级菜单
router.get('/water',function (req,res) {
    query(sql.water.queryAll,'',function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
//二级菜单
router.post('/waterlist',function (req,res) {
    var wid=req.body.wid;
    query(sql.site.queryEachWater,wid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});

//站点数据
router.post('/sitelist',function (req,res) {
    var sid=req.body.sid;
    query(sql.info.queryAreaInfo,sid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});

//主页数据
router.get('/index',function (req,res) {
    query(sql.warea.queryAll,'',function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
router.post('/getph',function (req,res) {
    var aid=req.body.aid;
    query(sql.info.queryPhAVG,aid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
router.post('/getammontia',function (req,res) {
    var aid=req.body.aid;
    query(sql.info.queryAmmontiaAVG,aid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
router.post('/getpindex',function (req,res) {
    var aid=req.body.aid;
    query(sql.info.queryPindexAVG,aid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
router.post('/getoxy',function (req,res) {
    var aid=req.body.aid;
    query(sql.info.queryOxyAVG,aid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});


module.exports = router;
