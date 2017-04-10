/**
 * Created by Ablion on 2017/3/27.
 */
var user={}
var login={
    init:function () {
        //TODO:判断用户是否有本地数据，如果有，则自动填写并登录
        var userinfo=localStorage.getItem('userinfo');
        if(userinfo){
            sessionStorage.setItem('userinfo',userinfo);
            let thisuser=userinfo.split('-');
            this.updateFlag(thisuser[0],function () {
                if(user.flag==1){//如果登录成功
                    $('.modal-login-wrapper').modal('hide');
                    $('.userName').html(thisuser[1]);//显示用户名
                    //如果用户权限大于等于9，显示用户管理
                    if(thisuser[3]>=9){
                        $('.admin').removeClass('hide');
                        $('.isInput').removeClass('hide');
                    }else{
                        if(thisuser[3]>=2){
                            $('.isInput').removeClass('hide');
                        }
                        $('.admin').hasClass('hide')?1:$('.admin').addClass('hide');
                    }
                    $('.login').removeClass('hide');
                    $('.no-login').addClass('hide');
                }
            });
        }
        $("#btn_login").on('click',this.vaildUser);
        $(".exit").on('click',this.exit);
        $('.nav li').on('click','a[href]',this.goto);
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
                    login.getUser(userObj);
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
                sessionStorage.setItem('userinfo','');
                $('.isInput').hasClass('hide')?1:$('.isInput').addClass('hide');
                $('.admin').hasClass('hide')?1:$('.admin').addClass('hide');
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
                if(msg=='success'){
                    user.flag=user.flag==1?0:1;
                }else{
                //    TODO:自定义弹框消息提示，或者消息提示
                }
            },
            complete:doAfter//回调函数
        });

    },
    //当验证正确以后，从后台获取完整的该用户信息，并存放在user对象中
    getUser:function (userObj) {
        var isRemember=$('#remember').prop('checked');
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
            $('.isInput').removeClass('hide');
        }else{
            if(user.access>=2){
                $('.isInput').removeClass('hide');
            }
            $('.admin').hasClass('hide')?1:$('.admin').addClass('hide');
        }
        $('.login').removeClass('hide');
        $('.no-login').addClass('hide');
        //    TODO：存储当前用户信息，会话级
        let userinfo=user.id+'-'+user.uname+'-'+user.pwd+'-'+user.access+'-'+user.flag;
        isRemember&&localStorage.setItem('userinfo',userinfo);
        sessionStorage.setItem('userinfo',userinfo);
    },
    //导航栏点击事件
    goto:function (e) {
        e.preventDefault();
        // $(this).hasAttribute('href')
        let url=$(this).attr('href');
        $('#inPage').attr('src',url);
        //样式
        let is1st=$(this).parent().parent().hasClass('nav');
        if(is1st){
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }else{
            $(this).parent().parent().parent().addClass('active');
            $(this).parent().parent().parent().siblings().removeClass('active');
        }
    }
}
login.init();
//重新计算iframe的大小
$(function () {
    function resize() {
        let height=window.innerHeight-76;
        $('#inPage').height(height);
    }
    resize();
    window.onresize=resize;
});