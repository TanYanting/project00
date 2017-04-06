/**
 * Created by Ablion on 2017/4/6.
 */
//页面加载完成异步加载站点信息
$(function () {
    var getData={

    }
})
var siteVm=new Vue({
    el:'#sitemanage',
    data:{
        sitedata:[
            {
                'num':1,
                'name':'重庆石坨',
                'waterstate':3,
                'status':3,
                'user':'test1',
                'water':'长江流域',
                'area':'重庆蓟州'
            },
            {
                'num':1,
                'name':'重庆石坨',
                'waterstate':3,
                'status':3,
                'user':'test1',
                'water':'长江流域',
                'area':'重庆蓟州'
            },
            {
                'num':1,
                'name':'重庆石坨',
                'waterstate':3,
                'status':3,
                'user':'test1',
                'water':'长江流域',
                'area':'重庆蓟州'
            },
            {
                'num':2,
                'name':'浙江湖州新塘港',
                'waterstate':3,
                'status':3,
                'user':'test1',
                'water':'太湖流域',
                'area':'浙江湖州'
            }
        ],
        user:{
            'num':1,
            'access':3
        }
    }
});