/**
 * Created by Ablion on 2017/3/27.
 * 用于验证密码和传回用户数据
 */
var express = require('express');
var router = express.Router();
var connection=require('../conf/db');

//获取public login.js 的数据
router.post('../public/javascript/login',function (req,res) {
    
});

//连接数据库
connection.connect();
//sql语句
var sql="SELECT user_pwd FROM wuser WHERE user_id="+user_id;
//查找
connection.query(sql,function (err,rows) {
    if(err) throw err;
    console.dir(rows);
});
