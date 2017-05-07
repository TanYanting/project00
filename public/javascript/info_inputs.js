/**
 * Created by Ablion on 2017/4/12.
 */
//获取用户信息
let user=window.sessionStorage.getItem('userinfo')?window.sessionStorage.getItem('userinfo').split('-'):['-1','','-1'];
//vue
var siteVm=new Vue({
    el:'#sitemanage',
    data: {
        datainfo: null,
        user: {
            'num': parseInt(user[0]),
            'name': user[1],
            'access': parseInt(user[3])
        },
        open:function (sid,event) {
            event.prevent;
            let target = $(event.target);
            //把sid传给弹出层对象
            infoVm.sid = sid;
            $('.inputbox').removeClass('hide');
            //查询时间
            $.ajax({
                type: 'get',
                url: '/site/timeList?siteId=' + sid,
                success: function (timeList) {
                    console.dir(timeList);
                    var str="<option value='0'>-请选择-</option>";
                    for(let i=0;i<timeList.length;i++){
                        let time=new Date(timeList[i].wtime);
                        let timeStr=time.toLocaleString();
                        str+="<option value='"+time+"'>"+timeStr+"</option>";
                    }
                    infoVm.option=str;
                    $("#timeSel").html(str);
                }
            });
        }
    }
});
//录入信息 vue对象
var infoVm=new Vue({
    el:'#inputInfo',
    data:{
        option:'',
        sid:0,
        timeSel:null,
        timePick:null,
        timeQuery:null,
        info:{},
        tabs:function (val,event) {
            event.prevent;
            let target=$(event.target);
            if(val){
                $('.add').removeClass('hide');
                $('.new').addClass('hide');
               // $("#timeSel").html(infoVm.option);
            }else{
                $('.add').addClass('hide');
                $('.new').removeClass('hide');
                //清空数据
                $('.inputList input').val('');
            }
            target.parent().addClass('active');
            target.parent().siblings().removeClass("active");
        },
        //获取数据
        getInfo:function (event) {
            event.prevent;
            let target=$(event.target);
            infoVm.timeQuery=(new Date(target.val())).getTime();
            debugger;
            $.ajax({
                type:'post',
                url:'/site/queryInfo',
                data:{sid:infoVm.sid,wtime:infoVm.timeQuery},
                success:function (info) {
                    infoVm.info=info[0];
                }
            });
        },
        save:function (event) {
            event.prevent;
            let target=$(event.target);
            /*sid,temperature,ph,dissolved_oxyge,
            electrical_conductivity,turbidity,ammontia,
            chlorophyll_a,blur_green_algae,'+
            'permanganate_index,fluoride,pertoleum,bod5,wtime*/
            var infoDate={
                sid:infoVm.sid,
                temperature:infoVm.info.temperature,
                ph:infoVm.info.ph,
                dissolved_oxyge:infoVm.info.dissolved_oxyge,
                electrical_conductivity:infoVm.info.electrical_conductivity,
                turbidity:infoVm.info.turbidity,
                ammontia:infoVm.info.ammontia,
                chlorophyll_a:infoVm.info.chlorophyll_a,
                blur_green_algae:infoVm.info.blur_green_algae,
                permanganate_index:infoVm.info.permanganate_index,
                fluoride:infoVm.info.fluoride,
                pertoleum:infoVm.info.pertoleum,
                bod5:infoVm.info.bod5,
                wtime:infoVm.timeQuery
            }
            $.ajax({
                type:'post',
                url:'/site/inpInfo',
                data:infoDate,
                success:function (msg) {
                    if(msg=='success'){
                        alert('保存成功');
                    }
                }
            });
            //关闭弹出层
            $('.inputbox').addClass('hide');
        },
        close:function (event) {
            event.prevent;
            //关闭弹出层
            $('.inputbox').addClass('hide');
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
            $('#sitename').val('');
            $('#stype').val('');
            $('#state').val('');
            $('#username').val('');
        });
        $('.closedel').on('click',function () {
            $('.alertbox').addClass('hide');
            $('.delete-tr').removeClass('delete-tr');
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
