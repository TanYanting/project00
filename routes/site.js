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

router.get('/',function (req,res) {
    query(sql.batch.querySite,'',function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
//获取站点列表
router.post('/updatesite',function (req,res) {
    var site=req.body;
    var site_id=site.site_id;
    var user_name=site.site_name;
    var uid;
    query(sql.wuser.queryById,user_name,function (row) {
        if(row.code=='200'){
            uid=row.data[0].user_id;
            query(sql.site.updateSite,[site.site_name,site.stype,site.state,uid,site.site_id],function (rows) {
                if(rows.code=='200'){
                    res.send(rows.msg);
                }
            });
        }
    });
});
//删除某个站点，同时删除该站点的info数据
router.post('/delete',function (req,res) {
    var site_id=req.body.site_id;
    query(sql.site.delete,site_id,function (row) {
        if(row.code=='200'){
            console.log('站点删除完成！')
        }
    });
    query(sql.info.deleteSite,site_id,function (rows) {
        if(rows.code==200){
            console.log('info删除完成！');
        }
    });
    query(sql.sitemanage.del,site_id,function (row) {
        if(row.code=='200'){
            console.log('视图删除完成！');
            res.send(row.msg);
        }
    });
});
//获取一周的站点数据info
router.post('/getinfo',function (req,res) {
    let sid=req.body.sid;
    let max=req.body.max;
    let min=req.body.min;
    query(sql.info.queryInfoByTime,[sid,sid,min,max],function (rows) {
        if(rows.code==200){
            res.send(rows.data);
        }
    })

});
//获取某一个站点数据的时间列表 录入
router.get('/timeList',function (req,res) {
    let sid=req.query.siteId;
    query(sql.info.queryTimeList,sid,function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
//根据sid和wtime获取数据
router.post('/queryInfo',function (req,res) {
    let sid=req.body.sid;
    let wtime=req.body.wtime;
    query(sql.info.queryInfoForInput,[sid,wtime],function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
//根据sid和wtime存入数据
router.post('/inpInfo',function (req,res) {
    let infoObj=req.body;
    let infoArr=[];
    for(index in infoObj){
        infoArr.push(infoObj[index]);
    }
    console.dir(infoArr);
    query(sql.info.insetInfo,infoArr,function(rows){
        if(rows.code=='200'){
            res.send(rows.msg);
        }
    });
});

module.exports = router;