/**
 * Created by Ablion on 2017/3/29.
 * 封装数据查找方法
 */
//数据库
var connection=require('../conf/db');
//sql语句
var sql=require('./sql');

module.exports=function (sql,data) {
    var rows={};
    //连接数据库
    connection.connect();
    //到数据库查询
    connection.query(sql,data,function (err,result) {
        console.log('sql:'+sql+'\ndata:'+data);
        console.dir('result:'+result);
        if(result){
            rows=result;
        }
    });
    //断开连接
    connection.end();
    //返回查询结果
    return rows;
}

