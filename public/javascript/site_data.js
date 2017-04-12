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
        text: '一周基础数据'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['PH','溶氧量','高锰酸钾指数','氨氮']
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
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'PH',
            type:'line',
            stack: '总量',
            data:[]
        },
        {
            name:'溶氧量',
            type:'line',
            stack: '总量',
            data:[]
        },
        {
            name:'高锰酸钾指数',
            type:'line',
            stack: '总量',
            data:[]
        },
        {
            name:'氨氮',
            type:'line',
            stack: '总量',
            data:[]
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
        thistime=thistime.getTime();
        var div='chart'+sid;
        var myChart = echarts.init(document.getElementById(div));
        $.ajax({
            type:'post',
            data:{sid:sid,max:thistime,min:mintime},
            url:'/site/getinfo',
            success:function (res) {
                //清空上一次数据
                for(let i=0;i<4;i++){
                    option.series[i].data=[];
                }
                option.xAxis.data=[];
                for(let i=0;i<res.length;i++){
                    res[i].ph==9999?option.series[0].data.push(''):option.series[0].data.push(res[i].ph);
                    res[i].d_o==9999?option.series[1].data.push(''):option.series[1].data.push(res[i].d_o);
                    res[i].p_i==9999?option.series[2].data.push(''):option.series[2].data.push(res[i].p_i);
                    res[i].a_a==9999?option.series[3].data.push(''):option.series[3].data.push(res[i].a_a);
                    let time=new Date(res[i].wtime);
                    time=(time.getMonth()+1)+'/'+time.getDate()+' '+time.getHours()+'时';
                    option.xAxis.data.push(time);
                }
                myChart.setOption(option);
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

