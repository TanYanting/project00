/**
 * Created by Ablion on 2017/3/27.
 * 用于配置数据库
 */
var mysql=require('mysql');
var sql='select * from wuser';
connection.query(sql,function (err,rows,fields) {
    console.dir(arguments);
    if(err) throw err;
    for(var i=0,user;user=rows[i++];){
        console.dir(user);
    }
});
module.exports=connection;