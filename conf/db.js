/**
 * Created by Ablion on 2017/3/27.
 * 用于配置数据库
 */
var mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'wqm',
    port:'3306',
    connectionLimit:100 //最大连接数
});
module.exports=pool;