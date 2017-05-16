/**
 * Created by Ablion on 2017/4/6.
 */
//获取用户信息
let user=window.sessionStorage.getItem('userinfo')?window.sessionStorage.getItem('userinfo').split('-'):['-1','','-1'];
//创建联动菜单 地域
$.ajax({
    type:'get',
    url:'/data',
    success:function (response) {
        var sel = document.getElementById("province");
        for (let i = 0; i < response.length; i++) {
            //创建option，同时设置内容为当前分类的name，值为当前分类的id，再将新option追加到select下
            sel.add(
                new Option(response[i].province_name, response[i].province_id)
            );
            //为sel元素绑定选择事件
            sel.onchange = function () {//this->selvar
                var pid = parseInt(this.value);
                option.legend.data=[];
                option.series=[];
                psite(pid);
            }
        }
    }
});
//联动菜单 水系
//遍历arr中每个商品分类对象
$.ajax({
    type:'get',
    url:'/data/water',
    success:function (response) {
        var sel = document.getElementById("water");
        for (let i = 0; i < response.length; i++) {
            //创建option，同时设置内容为当前分类的name，值为当前分类的id，再将新option追加到select下
            sel.add(
                new Option(response[i].water_name, response[i].water_id)
            );
            //为sel元素绑定选择事件
            sel.onchange = function () {//this->selvar
                var wid = this.value;
                option.legend.data=[];
                option.series=[];
                wsite(wid);
            }
        }
    }
});


var schema = [
    {name: 'wtime', index: 0, text: '日期'},
    {name: 'ph', index: 1, text: 'pH'},
    {name: 'ammontia', index: 2, text: '氨氮'},
    {name: 'dissolved_oxyge', index: 3, text: '溶氧量'},
    {name: 'permanganate_index', index: 4, text: '高锰酸钾指数'},
    {name: 'level', index: 5, text: '等级'}
];

var lineStyle = {
    normal: {
        width: 1,
        opacity: 0.5
    }
};

option = {
    backgroundColor: '#FFF',
    legend: {
        bottom: 30,
        data: [],
        itemGap: 20,
        textStyle: {
            color: '#333',
            fontSize: 14
        }
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
            var value = obj[0].value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + obj[0].seriesName + ' ' + value[0] + '日期：'
                + value[7]
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
                + schema[3].text + '：' + value[3] + '<br>'
                + schema[4].text + '：' + value[4] + '<br>'
                + schema[5].text + '：' + value[5] + '<br>';
        }
    },
    // dataZoom: {
    //     show: true,
    //     orient: 'vertical',
    //     parallelAxisIndex: [0]
    // },
    parallelAxis: [
        {dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
        {dim: 1, name: schema[1].text},
        {dim: 2, name: schema[2].text},
        {dim: 3, name: schema[3].text},
        {dim: 4, name: schema[4].text},
        {dim: 5, name: schema[5].text,
            type: 'category', data: ['I', 'II', 'III', 'VI', 'V', '劣V']}
    ],
    visualMap: {
        show: true,
        min: 0,
        max: 150,
        dimension: 2,
        inRange: {
            color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
            // colorAlpha: [0, 1]
        }
    },
    parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                color: '#333',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#777'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#333'
                }
            }
        }
    },
    series: []
};
var myChart = echarts.init(document.getElementById('chart'));
//查询站点数据
function psite(pid) {
    $.ajax({
        type: "post",
        url: '/data/provincelist',
        data: {pid: pid},
        success: function (response) {
            var title=[];
            response.forEach(function (item,arr) {
                var serObj={type:'parallel',lineStyle:lineStyle};
                serObj.name=item.site_name;
                title.push(item.site_name);
                $.ajax({
                    type:"post",
                    url:"/data/sitelist",
                    data:{sid:item.site_id},
                    success:function(res){
                        var dataArr=[];
                        res.forEach(function(site,i){
                            //添加时间和等级数据
                            dataArr.push(maxType(site,i));
                        });
                        serObj.data=dataArr;
                        option.series.push(serObj);
                        if(arr==response.length-1){
                            option.legend.data=title;
                            myChart.setOption(option);
                        }
                    }
                });
            });
        }
    });
}
function wsite(wid) {
    $.ajax({
        type: "post",
        url: '/data/waterlist',
        data: {wid: wid},
        success: function (response) {
            var title=[];
            response.forEach(function (item,arr) {
                var serObj={type:'parallel',lineStyle:lineStyle};
                serObj.name=item.site_name;
                title.push(item.site_name);
                $.ajax({
                    type:"post",
                    url:"/data/sitelist",
                    data:{sid:item.site_id},
                    success:function(res){
                        var dataArr=[];
                        res.forEach(function(site,i){
                            //添加时间和等级数据
                            dataArr.push(maxType(site,i));
                        });
                        serObj.data=dataArr;
                        option.series.push(serObj);
                        if(arr==response.length-1){
                            option.legend.data=title;
                            myChart.setOption(option);
                        }
                    }
                });
            });
        }
    });
}
function maxType(data,i){
    //获得一个数据对象
    let arr=[];
    let dataArr=[];
    arr.push(type(data.ph,'ph'));
    arr.push(type(data.ammontia,'ammontia'));
    arr.push(type(data.dissolved_oxyge,'dissolved_oxyge'));
    arr.push(type(data.permanganate_index,'permanganate_index'));
    var level=arr[0];
    for(let i=0;i<arr.length;i++){
        if(level<arr[i])level=arr[i];
    }
    level=(level==1)?'I':
        (level==2?'II':
            (level==3?'III':
                (level==4?'VI':
                    (level==5?'V':'劣V'))));
    let time=new Date(data.wtime)
    time=time.getDate();
    data.wtime=time;
    dataArr[0]=i;
    dataArr[1]=data.ph==9999?'':data.ph;
    dataArr[2]=data.ammontia==9999?'':data.ammontia;
    dataArr[3]=data.dissolved_oxyge==9999?'':data.dissolved_oxyge;
    dataArr[4]=data.permanganate_index==9999?'':data.permanganate_index;
    dataArr[5]=level;
    return dataArr;
}

function type(val,type) {
    var level=0;
    if(type=='ph'){
        level=(val<=8&&val>=5)?1:3;
    }else if(type=='ammontia'){
        level=(val<=0.15)?1:
            (val<=0.5?2:
                (val<=1?3:
                    (val<=1.5?4:
                        (val<=2.0?5:6))));
    }else if(type=='dissolved_oxyge'){
        level=(val>=7.5)?1:
            (val>=6?2:
                (val>=5?3:
                    (val>=3?4:
                        (val>=2?5:6))));
    }else if(type=='permanganate_index'){
        level=(val<=2)?1:
            (val<=4?2:
                (val<=6?3:
                    (val<=10?4:
                        (val<=15?5:6))));
    }
    return level;
}