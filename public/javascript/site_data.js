/**
 * Created by Ablio on 2017/4/11.
 */
//获取用户信息
let user=window.sessionStorage.getItem('userinfo')?window.sessionStorage.getItem('userinfo').split('-'):['-1','','-1'];
//vue
var siteVm=new Vue({
    el:'#sitedata',
    data: {
        datainfo: null,
        user: {
            'num': parseInt(user[0]),
            'name': user[1],
            'access': parseInt(user[3])
        },
        open:function (sid,event) {
            event.prevent;
            let target=$(event.target);
            let char=target.parents('tr').next();
            char.siblings('.chart').addClass('hide');
            char.hasClass('hide')?(char.removeClass('hide')):(char.addClass('hide'));
            let div='<div id="chart'+sid+'"></div>';
            char.children().html(div);
            getdata.showChar(sid);
        }
    }
});

//数据格式
option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

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
    },
    showChar:function (sid) {
    //    计算当前日期前七天的毫秒数
        var weeks=604800000;
        var thistime=new Date();
        var mintime=thistime.getTime()-weeks;
        $.ajax({
            type:'post',
            data:{sid:sid,max:thistime,min:mintime},
            url:'/site/getinfo',
            success:function (res) {
                console.dir(res);
            }
        });
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
            url:'/site',
            success:function (site) {
                getdata.pager.data=site;
                getdata.datalist(site);
            }
        });
    },
    datalist:function (site) {
        this.pager.recordCount=site.length;
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
        siteVm.datainfo=subdata;
    }
}
getdata.init();

