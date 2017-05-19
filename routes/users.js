var express = require('express');
var router = express.Router();
//数据库
var connection=require('../conf/db');
//sql语句
var sql=require('../dao/sql');
//查询函数
var query=require('../dao/pool');

router.get('/',function (req,res) {
    query(sql.wuser.queryAll,'',function(rows){
        if(rows.code=='200'){
            res.send(rows.data);
        }
    });
});
router.post('/delete',function (req,res) {
    var uid=req.body.user_id;
    query(sql.wuser.delete,uid,function(rows){
        if(rows.code=='200'){
            res.send(rows.msg);
        }
    });
});
router.post('/updateuser',function (req,res) {
    console.dir(req.body);
    var arr=[];
    arr.push(req.body.user_name);
    arr.push(req.body.user_pwd);
    arr.push(req.body.user_access);
    arr.push(req.body.user_id);
    query(sql.wuser.updataAll,arr,function(rows){
        if(rows.code=='200'){
            res.send(rows.msg);
        }
    });
});
router.post('/adduser',function (req,res) {
    var arr=[];
    arr.push(req.body.user_id);
    arr.push(req.body.user_name);
    arr.push(req.body.user_pwd);
    arr.push(req.body.user_access);
    query(sql.wuser.insert,arr,function(rows){
        if(rows.code=='200'){
            res.send(rows.msg);
        }
    });
});
router.get('/getid',function (req,res) {
    query(sql.wuser.nextId,'',function (rows) {
        if(rows.code=='200'){
            res.send(rows.data);
        }
    })
});
module.exports = router;
