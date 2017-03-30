/**
 * Created by Ablion on 2017/3/29.
 */
var express = require('express');
var router = express.Router();
//sql语句
var sql=require('../dao/sql');
//查询函数
var query=require('../dao/vaildUser');

router.post('/',function (req,res) {
    var user_id=req.body.user_id;
    console.log(user_id);
    query(sql.wuser.queryById,user_id,function(rows){
        console.log(rows);
        res.send(rows);
    });
});
router.post('/updateflag',function (req,res) {
    var user_id=req.body.user_id;
    var user_flag=req.body.login_flag==1?0:1;
    console.log(req.body);
    //updateFlag:'UPDATE wuser set login_flag=? WHERE user_id=?'
    query(sql.wuser.updateFlag,[user_flag,user_id],function(rows){
        console.log(rows);
        res.send(rows);
    });
    // res.send("change success！");
});

module.exports = router;