/**
 * Created by Ablio on 2017/4/9.
 * 基于javascript
 * 0.0.1 overbox 弹出层插件
 */
//立即执行
(function () {

//    创建构造函数
var overbox=function () {

//        全局变量
    var doc=window.document;
    var body=doc.body;
    var option={};//合并的参数

    var tbox=function () {
        //默认参数
        this.default={
            inhtml:'成功',//弹出层的里面要放什么
            ele:'overbox',//选择器，触发弹出层的元素，  按类名
            isCancel:false,//是否有取消按钮
            cancelCallback:null,//取消的回调函数
            isAffirm:true,//是否有确认按钮
            affirmCallback:null,//确认的回调函数
            isBg:true,//是否要背景
            bgClassName:'tbox-bg',//背景的类名
            bgColor:'rgba(80,80,80,0.5)',//背景的颜色
        }
    }
    tbox.prototype={
        getOption: function(arg){
            var temp = {}, i;
            for(i in this.defaults){
                temp[i] = arg[i] !== undefined ? arg[i] : this.defaults[i];
            }
            return temp;
        },
    //    删除元素
        removenode:function(node){
            node.parentNode.removeChild(node);
        }
    }

    var $=new tbox();

//    遮罩层
    var tboxbg=function () {
        var tboxbg;
        return (function () {
            tboxbg=tboxbg || doc.createElement('div');
            tboxbg.style.cssText='margin:0;padding:0;width:100%;height:100%;position:fixed;top:0;left:0;z-index:1000;background:rgba(80,90,80,0.5)'
            tboxbg.id='tboxbg';
            return tboxbg;
        })();
    }
//    弹出框
    var dialogbox=function () {
        var dialogbox;
        return (function () {
            dialogbox=dialogbox||doc.createElement('div');
            dialogbox.style.cssText='margin:0;padding:0;border:0;position:fixed;top:0;left:0;right:0;bottom:0;height:200px;width:400px;z-index:1001';

            dialogbox.id='dialogbox';
            return dialogbox;
        })();
    }


}

})();