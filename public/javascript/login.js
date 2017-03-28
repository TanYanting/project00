/**
 * Created by Ablion on 2017/3/27.
 */
var login={
    user:{},
    init:function () {

    },
    //登录验证——将数据
    vaildUser:function () {
        this.user.uid=$("#user_id").val();
        $.ajax({
            type:'post',
            url:'../../dao/loginRouter.js',
            data:login.user.uid,
            success:function (xml) {
                
            }
        });
    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function () {
        
    }
}
login.init();