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
        electrical:  null,
        turbidity:null,
        chlorophyll_a:null,
        blue_green_algae:null,
        fluoride:null,
        pertoleum:null,
        bod5:null,
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
