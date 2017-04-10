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
            query(sql.info.deleteSite,site_id,function (rows) {
                if(rows.code==200){
                    res.send(rows.msg);
                }
            })
        }
    })
});
//获取一周的站点数据info
router.post('/getinfo',function (req,res) {
    let sid=req.body.sid;
    let max=req.body.max;
    let min=req.body.min;
    query(sql.info.queryWeekBySid,[sid,min,max],function (rows) {
        if(rows.code==200){
            res.send(rows.data);
        }
    })

});

module.exports = router;