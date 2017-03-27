/**
 * Created by Ablion on 2017/3/27.
 * 用于验证密码和传回用户数据
 */
var connection=require('../conf/db');
var user_id='12';
var user_pwd='123456';
//连接数据库
connection.connect();
//查找
connection.query('select user_pwd form wuser where user_id='+user_id,function (err,rows,fields) {
    if(err) throw err;
    var pwd=rows;

});
