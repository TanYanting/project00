/**
 * Created by Ablion on 2017/3/29.
 * 封装数据查找方法
 */
//数据库
var connection=require('../conf/db');
//sql语句
var sql=require('./sql');

module.exports=function (sql,data,callback) {
    var rows={};
    //连接数据库
    connection.connect();
    //到数据库查询
    connection.query(sql,data,function (err,result) {
        if(err) throw err;
        rows={
            code:200,
            msg:'success',
            data:result
        }
        if(callback && typeof(callback) === "function"){
            callback(rows);
        }
    });
    connection.end();
}

