//获取用户信息
let user=window.sessionStorage.getItem('userinfo')?window.sessionStorage.getItem('userinfo').split('-'):['-1','','-1'];
//vue
var userVm=new Vue({
    el:'#usermanage',
    data: {
        userdata: null,
        user: {
            'num': parseInt(user[0]),
            'name': user[1],
            'access': parseInt(user[3])
        },
        eidt:function (event) {
            event.prevent;
            $('.dialogbox').removeClass('hide');
            let target=$(event.target);
            $('#save').data('user',target.parent().siblings().eq(0).html());
            $('#username').val(target.parent().siblings().eq(1).html());
            $('#user_pwd').val(target.parent().siblings().eq(2).html());
            $('#user_access').val(target.parent().siblings().eq(3).html());
        },
        del:function(event){
            event.prevent;
            $('.alertbox').removeClass('hide');
            let target=$(event.target);
            var uname=target.parent().siblings().eq(1).html();
            $('.uname').html(uname);
            $('#delete').data('user',target.parent().siblings().eq(0).html());
        }
    }
});
//页面加载完成异步加载站点信息
var getdata={
    pager:{
        'recordCount':0,//总记录条数
        'pageSize':10,//一页显示的条数
        'pageCount':0,//总页数
        'pageNum':1,//当前页码
        'data':null//数据
    },
    init:function () {
        this.getsitelist();
        /*if(this.pager.pageNum==1){
         $('.previous').attr('disable',true);
         }*/
        $('.previous').on('click',this.previous);
        $('.next').on('click',this.next);
        $('#save').on('click',this.save);
        $('#delete').on('click',this.delete);
        $('.closeedit').on('click',function () {
            $('.dialogbox').addClass('hide');
            $('#username').val('');
            $('#user_pwd').val('');
            $('#user_access').val('');
        });
        $('.closedel').on('click',function () {
            $('.alertbox').addClass('hide');
        });
    },
    delete:function () {
        debugger;
        $('.alertbox').addClass('hide');
        let user_id=parseInt($('#delete').data('user'));
        $.ajax({
            type:'post',
            data:{user_id:user_id},
            url:'/users/delete',
            success:function (msg) {
                if(msg=='success'){
                    alert('删除成功！');
                    getdata.getsitelist();
                }
            }
        });
    },
    save:function () {
        $('.dialogbox').addClass('hide');
        let user=[];
        var data=$('.eidtform').serializeArray();
        debugger;
        user.user_name=data[0].value;
        user.user_pwd=data[1].value;
        user.user_access=data[2].value;
        user.user_id=$('#save').data('user');
        $.ajax({
            type:'post',
            data:user,
            url:'/users/updateuser',
            success:function (msg) {
                alert('修改成功！');
            }
        })
    },
    previous:function () {
        if(getdata.pager.pageNum<=1){
            return;
        }
        getdata.pager.pageNum--;
        if(getdata.pager.pageNum<=1){
            $('.previous').addClass('disabled');
        }
        $('.next').removeClass('disabled');
        getdata.showlist(getdata.pager.pageNum);
        $('.pageNum').html(getdata.pager.pageNum);

    },
    next:function () {
        if(getdata.pager.pageNum>=getdata.pager.pageCount){
            return;
        }
        getdata.pager.pageNum++;
        if(getdata.pager.pageNum>=getdata.pager.pageCount){
            $('.next').addClass('disabled');
        }
        $('.previous').removeClass('disabled');
        getdata.showlist(getdata.pager.pageNum);
        $('.pageNum').html(getdata.pager.pageNum);

    },
    getsitelist:function () {
        $.ajax({
            type:'get',
            url:'/users',
            success:function (user) {
                getdata.pager.data=user;
                getdata.datalist(user);
            }
        });
    },
    datalist:function (user) {
        this.pager.recordCount=user.length;
        this.pager.pageCount=Math.ceil(this.pager.recordCount/this.pager.pageSize);
        this.showlist(1);
        $('.recordCound').html(this.pager.recordCount);
        $('.pageSize').html(this.pager.pageSize);
        $('.pageCount').html(this.pager.pageCount);
        $('.pageNum').html(this.pager.pageNum);
    },
    showlist:function (pageNum) {
        let start=(pageNum-1)*this.pager.pageSize;
        let end=pageNum*this.pager.pageSize;
        let subdata=this.pager.data.slice(start,end);
        userVm.userdata=subdata;
    }
}
getdata.init();

