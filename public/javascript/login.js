/**
 * Created by Ablion on 2017/3/27.
 */
var user={}
var login={
    init:function () {
        $("#btn_login").on('click',this.vaildUser);
        $(".exit").on('click',this.exit);
    },
    //登录验证——将数据
    vaildUser:function () {
        user.uname= $("#user_name").val();
        user.pwd=$("#user_pwd").val();
        $.ajax({
            type:'post',
            url:'/login',
            data:{user_name:user.uname},
            success:function (xml) {
                let userArr=xml.data;
                let userObj=userArr[0];
                if(userObj.user_pwd==user.pwd){
                    user.id=userObj.user_id;
                    user.flag=userObj.login_flag;
                    user.access=userObj.user_access;
                    //更改登录状态值
                    login.updateFlag(user.id,function () {
                        if(user.flag==1){
                            $('.modal-login-wrapper').modal('hide');
                        }
                    });
                    $('.userName').html(user.uname);//显示用户名
                    //如果用户权限大于等于9，显示用户管理
                    if(user.access>=9){
                        $('.admin').removeClass('hide');
                    }else{
                        $('.admin').hasClass('hide')?1:$('.admin').addClass('hide');
                    }
                    $('.login').removeClass('hide');
                    $('.no-login').addClass('hide');
                //    TODO：存储当前用户信息，会话级
                }else{
                    //TODO:提示密码或用户名错误，增加提示信息
                }
            }
        });
    },
    //退出登录
    exit:function (e) {
        e.preventDefault();
        login.updateFlag(user.id,function () {
            if(user.flag==0){
                $('.no-login').removeClass('hide');
                $('.login').addClass('hide');
            }
        });
    },
    //修改数据库中user的登录状态
    updateFlag:function (uid,doAfter) {
        $.ajax({
            type:'post',
            url:'/login/updateflag',
            data:{user_id:uid,login_flag:user.flag},
            success:function(msg) {
                debugger;
                if(msg=='success'){
                    user.flag=user.flag==1?0:1;
                }else{
                //    TODO:自定义弹框消息提示，或者消息提示
                }
            },
            complete:doAfter
        });

    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function () {
        
    }
}
login.init();
//重新计算iframe的大小
$(function () {
    $("#inPage").on('load',function () {
        let height=this.contentWindow.document.body.offsetHeight;
        $(this).height(height);
    });
});