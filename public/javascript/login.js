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
        debugger;
        user.uid= $("#user_id").val();
        $.ajax({
            type:'post',
            url:'/login',
            data:{user_id:user.uid},
            success:function (xml) {
                console.dir(xml);
            }
        });
    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function () {
        
    }
}
login.init();