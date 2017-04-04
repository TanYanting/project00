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
//监测站点信息表
sql.info={
    //TODO:批量插入
    //info_id INT(12) NOT NULL PRIMARY KEY,
    // sid INT(10) NOT NULL,
    // temperature NUMERIC(8,2),
    // ph NUMERIC(8,2),
    // dissolved_oxyge NUMERIC(8,2),
    // permanganate_index NUMERIC(8,2),
    // fluoride NUMERIC(8,2),
    // ammontia NUMERIC(8,2),
    // pertoleum NUMERIC(8,2),
    // bod5 NUMERIC(8,2),
    // electrical_conductivity NUMERIC(8,2),
    // turbidity NUMERIC(8,2),
    // chlorophyll_a NUMERIC(8,2),
    // blur_green_algae NUMERIC(8,2),
    // wtime TIME,
    // wdate DATE,
    // FOREIGN KEY(sid) REFERENCES site(site_id)
    insert:'INSERT ',
}
module.exports = sql;
