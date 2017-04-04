/**
 * Created by Ablion on 2017/3/29.
 * 封装数据查找方法
 */
//数据库
var pool=require('../conf/db');
//sql语句

module.exports=function (sql,data,callback) {
    var rows={};
    pool.getConnection(function (err,connection) {
        if(err) throw err;
        if(data==''){

        }
        //到数据库查询
        connection.query(sql,data,function (err,result) {
            if(err) throw err;
            else {
                rows = {
                    code: 200,
                    msg: 'success',
                    data: result
                }
            }
            if(callback && typeof(callback) === "function"){
                callback(rows);
            }
            connection.release(); //释放连接
        });
    });

}

