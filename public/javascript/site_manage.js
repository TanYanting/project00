/**
 * Created by Ablion on 2017/4/6.
 */
//页面加载完成异步加载站点信息
var getdata={
    init:function () {
        this.getsitelist();
    },
    getsitelist:function () {
        $.ajax({
            type:'get',
            url:'/site',
            success:function (site) {
                var siteVm=new Vue({
                    el:'#sitemanage',
                    data:{
                        sitedata:site,
                        user:{
                            'num':1,
                            'access':3
                        }
                    }
                });
            }
        });
    }
}
getdata.init();