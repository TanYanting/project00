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
    insert:'INSERT site(site_id,site_name,stype,state,uid,wid,aid，remark) value(?,?,?,?,?,?,?)',
    updateType:'UPDATE site set stype=? WHERE site_id=?',//修改水质标准
    updateState:'UPDATE site set state=? WHERE site_id=?',//修改状态
    updateRemark:'UPDATE site set remark=? WHERE site_id=?',//修改状态
    updateStime:'UPDATE site set stime=? WHERE site_id=?',//修改状态
    updateUser:'UPDATE site set uid=? WHERE site_id=?',//修改负责人
    updateSite:'UPDATE site set site_name=?,stype=?,state=?,uid=? WHERE site_id=?',
    delete:'UPDATE site SET del=1 WHERE site_id=?',//非物理删除
    queryById:'SELECT * FROM site WHERE site_id=?',//根据ID查找
    queryByName:'SELECT * FROM site WHERE site_name=?',//根据name查找
    queryAll:'SELECT * FROM site WHERE del!=1'
}
//监测站点信息表
sql.info={
    deleteSite:'UPDATE info SET del=1 WHERE sid=?',//b标记删除（不可物理删除）
    queryWeekBySid:'SELECT DISTINCT wtime FROM info WHERE sid=? AND (wtime BETWEEN ? AND ?) and del!=1 ORDER BY wtime;',// 查找一周的数据（站点数据）
    queryInfoByTime:'SELECT ph,dissolved_oxyge as d_o,permanganate_index as p_i,ammontia as a_a,wtime ' +
        'FROM info WHERE sid=? AND wtime IN ' +
        '(SELECT DISTINCT wtime FROM info WHERE sid=? AND (wtime BETWEEN ? AND ?) and del!=1 ORDER BY wtime)'
    //TODO:批量插入
}
//监测站点历史状态表
sql.sitehistory={
    insert:'INSERT sitehistory(sid,stime,state,remark) value(?,?,?,?)'
}
//联合查询，批量
sql.batch={
    querySite:'SELECT * FROM sitemanage'
}

module.exports = sql;
