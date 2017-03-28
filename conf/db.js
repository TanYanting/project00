/**
 * Created by Ablion on 2017/3/27.
 * 用于配置数据库
 */
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'wqm',
    port:'3306'
});
module.exports=connection;