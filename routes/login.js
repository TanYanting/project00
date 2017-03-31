/**
 * Created by Ablion on 2017/3/29.
 */
var express = require('express');
var router = express.Router();
//数据库
var connection=require('../conf/db');
//sql语句
var sql=require('../dao/sql');
//查询函数
var query=require('../dao/pool');

router.post('/',function (req,res) {
    var user_name=req.body.user_name;
    query(sql.wuser.queryByName,user_name,function(rows){
        res.send(rows);
    });
});
router.post('/updateflag',function (req,res) {
    var user_id=req.body.user_id;
    var user_flag=req.body.login_flag==1?0:1;
    //updateFlag:'UPDATE wuser set login_flag=? WHERE user_id=?'
    query(sql.wuser.updateFlag,[user_flag,user_id],function(rows){
        res.send(rows.msg);
    });
});

module.exports = router;