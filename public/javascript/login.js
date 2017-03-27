/**
 * Created by Ablion on 2017/3/27.
 */
var connection=require('../../conf/db');
//连接数据库
connection.connect();
var login={
    user:{},
    init:function () {
        var sql='select * from wuser';
        connection.query(sql,function (err,rows,fields) {
            console.dir(arguments);
            if(err) throw err;
            for(var i=0,user;user=rows[i++];){
                console.dir(user);
            }
        });
    },
    //登录验证——将数据
    vaildUser:function () {
        
    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function () {
        
    }
}
login.init();