/**
 * Created by Ablion on 2017/3/29.
 */
var express = require('express');
var router = express.Router();

var connection=require('../conf/db');
//sql语句
var sql=require('../dao/sql');
//查询函数
var query=require('../dao/vaildUser');

router.post('/',function (req,res) {
    var rows;
    var user_id=req.body.user_id;
    //连接数据库
    connection.connect();
    //到数据库查询
    connection.query('SELECT * FROM wuser WHERE user_id='+user_id,function (err,result) {
        console.dir('result:'+result);
        if(result){
            rows=result;
        }
    });
    //断开连接
    connection.end();
    req.send(rows);
});

module.exports=router;