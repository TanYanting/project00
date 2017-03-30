/**
 * Created by Ablion on 2017/3/27.
 */
var user={}
var login={

    init:function () {
        $("#btn_login").on('click',this.vaildUser);
    },
    //登录验证——将数据
    vaildUser:function () {
        user.uid= $("#user_id").val();
        user.pwd=$("#user_pwd").val();
        $.ajax({
            type:'post',
            url:'/login',
            data:{user_id:user.uid},
            success:function (xml) {
                debugger;
                let userArr=xml.data;
                let userObj=userArr[0];
                if(userObj.user_pwd==user.pwd){
                    user.uname=userObj.user_name;
                    user.flag=userObj.login_flag;
                    login.updateFlag(user.uid);
                }
            }
        });
    },
    //修改数据库中user的登录状态
    updateFlag:function (uid) {
        $.ajax({
            type:'post',
            url:'/login/updateflag',
            data:{user_id:user.uid,login_flag:user.flag},
            success:function(xml) {
                if(xml.msg=='success'){
                    alert("登录成功！");
                }
            }
        });
    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function () {
        
    }
}
login.init();