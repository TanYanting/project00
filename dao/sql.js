/**
 * Created by Ablion on 2017/3/27.
 * CRUD 语句
 */
//创建sql对象
var sql={}
//用户表 CRUD
sql.wuser={
    insert:'INSERT wuser(user_id,user_name,user_pwd,user_access) value(?,?,?,?)',
    updatePwd:'UPDATE wuser set user_pwd=? WHERE user_id=?',//修改密码
    updateAccess:'UPDATE wuser set user_access=? WHERE user_id=?',//修改权限
    updateFlag:'UPDATE wuser set login_flag=? WHERE user_id=?',//修改登陆状态
    delete:'DELETE FROM wuser WHERE user_id=?',//删除
    queryById:'SELECT * FROM wuser WHERE user_id=?',//根据ID查找
    queryByName:'SELECT * FROM wuser WHERE user_name=?',//根据name查找
    queryAll:'SELECT * FROM wuser'
}
//监测站点表
sql.site={
    insert:'INSERT site(site_id,site_name,stype,state,uid,wid,aid) value(?,?,?,?,?,?,?)',
    updateType:'UPDATE site set stype=? WHERE site_id=?',//修改水质标准
    updateState:'UPDATE site set state=? WHERE site_id=?',//修改状态
    updateUser:'UPDATE site set uid=? WHERE site_id=?',//修改负责人
    delete:'DELETE FROM site WHERE site_id=?',//删除
    queryById:'SELECT * FROM site WHERE site_id=?',//根据ID查找
    queryByName:'SELECT * FROM site WHERE site_name=?',//根据name查找
    queryAll:'SELECT * FROM site'
}
module.exports = sql;
