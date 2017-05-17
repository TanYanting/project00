DROP DATABASE IF EXISTS WQM;
#创建数据库
CREATE DATABASE WQM;

#使用utf-8编码
alter database wqm CHARACTER SET utf8;
#使用WQM
USE WQM;

#---------表结构---------------

#---用户信息表 wuser
CREATE TABLE wuser(
       user_id INT(8) NOT NULL PRIMARY KEY,
       user_name VARCHAR(50) NOT NULL,
       user_pwd VARCHAR(6) NOT NULL,
       user_access INT(1) NOT NULL DEFAULT 1,
       login_flag INT(1) NOT NULL DEFAULT 0
);

#---流域表 water
CREATE TABLE water(
       water_id INT(3) NOT NULL PRIMARY KEY,
       water_name VARCHAR(100)
);

#---省份表 province
CREATE TABLE province(
       province_id INT(2) NOT NULL PRIMARY KEY,
       province_name VARCHAR(50)
);

#---地域表 warea
CREATE TABLE warea(
       area_id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
       pid INT(2) NOT NULL,
       area_name VARCHAR(100),
       FOREIGN KEY(pid) REFERENCES province(province_id)
);

#---水质标准表 standard
CREATE TABLE standard(
       standard_id INT(2) NOT NULL PRIMARY KEY,
       temperature VARCHAR(8),
       ph VARCHAR(8),
       dissolved_oxyge_flag INT(1),
       dissolved_oxyge NUMERIC(8,2),
       permanganate_index_flag INT(1),
       permanganate_index NUMERIC(8,2),
       fluoride_flag INT(1),
       fluoride NUMERIC(8,2),
       ammontia_flag INT(1),
       ammontia NUMERIC(8,2),
       pertoleum_flag INT(1),
       pertoleum NUMERIC(8,2),
       bod5_flag INT(1),
       bod5 NUMERIC(8,2)
);

#--监测站点表 site
CREATE TABLE site(
       site_id INT(5) NOT NULL PRIMARY KEY,
       site_name VARCHAR(50),
       stype INT(2) NOT NULL DEFAULT 3,
       state INT(1) NOT NULL DEFAULT 0,
       uid INT(8),
       wid INT(3),
       aid INT(3),
       remark VARCHAR(200),
       stime BIGINT,
       FOREIGN KEY(stype) REFERENCES standard(standard_id),
       FOREIGN KEY(uid) REFERENCES wuser(user_id),
       FOREIGN KEY(wid) REFERENCES water(water_id),
       FOREIGN KEY(aid) REFERENCES warea(area_id)
);

#---监测站点信息表 info
CREATE TABLE info(
       info_id INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
       sid INT(10) NOT NULL,
       temperature NUMERIC(8,2),
       ph NUMERIC(8,2),
       dissolved_oxyge NUMERIC(8,2),
       permanganate_index NUMERIC(8,2),
       fluoride NUMERIC(8,2),
       ammontia NUMERIC(8,2),
       pertoleum NUMERIC(8,2),
       bod5 NUMERIC(8,2),
       electrical_conductivity NUMERIC(8,2),
       turbidity NUMERIC(8,2),
       chlorophyll_a NUMERIC(8,2),
       blur_green_algae NUMERIC(8,2),
	   wtime BIGINT,
       FOREIGN KEY(sid) REFERENCES site(site_id)
);
#---监测站点历史状态表
CREATE TABLE sitehistory(
    shistory_id INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sid int(10) NOT NULL,
    stime BIGINT NOT NULL,
    state int(2) NOT NULL DEFAULT 0,
    remark VARCHAR(200),
    FOREIGN KEY(sid) REFERENCES site(site_id)
);


#-------------------------插入数据---------------------------
use wqm;
#---水质标准表数据
#id=1代表I类，以此类推
INSERT standard(standard_id,temperature,ph,
	dissolved_oxyge_flag,dissolved_oxyge,
	permanganate_index_flag,permanganate_index,
	fluoride_flag,fluoride,
	ammontia_flag,ammontia,
	pertoleum_flag,pertoleum,
	bod5_flag,bod5) value(1,'-2~1','6~8', 1,7.5, 0,2,  0,1,   0,0.15, 0,0.05, 0,3),
			     (2,'-2~1','6~8', 1,6,   0,4,  0,1,   0,0.5,  0,0.05, 0,3),
			     (3,'-2~1','6~8', 1,5,   0,6,  0,1,   0,1,    0,0.05, 0,4),
			     (4,'-2~1','6~8', 1,3,   0,10, 0,1.5, 0,1.5,  0,0.5,  0,6),
			     (5,'-2~1','6~8', 1,2,   0,15, 0,1.5, 0,2,    0,1,    0,10);
#---流域表数据
INSERT water(water_id,water_name) value (001,'太湖流域'),(002,'巢湖流域'),
	(003,'淮河流域'),(004,'南水北调东线'),(005,'海河流域'),
	(006,'辽河流域'),(007,'松花江流域'),(008,'黄河流域'),
	(009,'南水北调中线'),(010,'长江流域'),(011,'东南诸河'),
	(012,'珠江流域'),(013,'滇池流域'),(014,'西南诸河'),(015,'内陆河');
#---省份表数据
INSERT province(province_id,province_name) value(01,'北京市'),(02,'天津市'),(03,'上海市'),
	(04,'浙江省'),(05,'安徽省'),(06,'福建省'),(07,'江西省'),(08,'湖南省'),(09,'广东省'),
	(10,'广西壮族自治区'),(11,'新疆维吾尔族自治区'),(12,'宁夏回族自治区'),
	(13,'黑龙江省'),(14,'辽宁省'),(15,'吉林省'),(16,'河南省'),(17,'河北省'),
	(18,'江苏省'),(19,'山东省'),(20,'青海省'),(21,'内蒙古自治区'),(22,'西藏自治区'),
	(23,'贵州省'),(24,'云南省'),(25,'海南省'),(26,'湖北省'),(27,'山西省'),(28,'陕西省'),
	(29,'甘肃省'),(30,'四川省'),(31,'重庆市'),(32,'香港'),(33,'澳门'),(34,'台湾省');
#---地域表数据
#浙江
INSERT warea(area_id,pid,area_name) value(001,04,'杭州'),(002,04,'台州'),(003,04,'嘉兴'),(004,04,'湖州'),(005,04,'金华'),(006,04,'温州'),
	(007,04,'衢州'),(008,04,'义乌'),(009,04,'绍兴'),(010,04,'宁波'),(011,04,'丽水');
#安徽
INSERT warea(area_id,pid,area_name) value(012,05,'合肥'),(013,05,'芜湖'),(014,05,'蚌埠'),(015,05,'淮南'),(016,05,'马鞍山'),(017,05,'安庆'),
	(018,05,'淮北'),(019,05,'铜陵'),(020,05,'黄山'),(021,05,'滁州'),(022,05,'阜阳'),(023,05,'六安'),(024,05,'宿州'),(025,05,'毫州'),
	(026,05,'池州'),(027,05,'宣城');
#福建
INSERT warea(area_id,pid,area_name) value(028,06,'福州'),(029,06,'厦门'),(030,06,'莆田'),(031,06,'三明'),(032,06,'泉州'),(033,06,'漳州'),
	(034,06,'南平'),(035,06,'龙岩'),(036,06,'宁德');
#江西
INSERT warea(area_id,pid,area_name) value(037,07,'南昌'),(038,07,'赣州'),(039,07,'上饶'),(040,07,'鹰潭'),(041,07,'萍乡'),(042,07,'景德镇'),
	(043,07,'九江'),(044,07,'吉安'),(045,07,'宜春'),(046,07,'抚州');
#湖南
INSERT warea(area_id,pid,area_name) value(047,08,'长沙'),(048,08,'岳阳'),(049,08,'株洲'),(050,08,'湘潭'),(051,08,'衡阳'),(052,08,'邵阳'),
	(053,08,'常德'),(054,08,'张家界'),(055,08,'益阳'),(056,08,'郴州'),(057,08,'永州'),(058,08,'怀化'),(059,08,'娄底'),(060,08,'湘西自治州');
#广东
INSERT warea(area_id,pid,area_name) value(061,09,'广州'),(062,09,'深圳'),(063,09,'珠海'),(064,09,'汕头'),(065,09,'佛山'),(066,09,'韶关'),
	(067,09,'湛江'),(068,09,'肇庆'),(069,09,'江门'),(070,09,'茂名'),(071,09,'惠州'),(072,09,'梅州'),(073,09,'汕尾'),(074,09,'河源'),
	(075,09,'阳江'),(076,09,'清远'),(077,09,'东莞'),(078,09,'中山'),(079,09,'潮州'),(080,09,'揭阳'),(081,09,'云浮');
#湖北
INSERT warea(area_id,pid,area_name) value(082,26,'武汉'),(083,26,'黄石'),(084,26,'十堰'),(085,26,'宜昌'),(086,26,'襄阳'),(087,26,'鄂州'),
	(088,26,'荆门'),(089,26,'孝感'),(090,26,'荆州'),(091,26,'黄冈'),(092,26,'随州'),(093,26,'咸宁'),(094,26,'恩施'),(095,26,'仙桃'),
	(096,26,'潜江'),(097,26,'天门');
#云南
INSERT warea(area_id,pid,area_name) value(098,24,'昆明'),(099,24,'曲靖'),(100,24,'玉溪'),(101,24,'保山'),(102,24,'邵通'),(103,24,'丽江'),
	(104,24,'普洱'),(105,24,'临沧'),(106,24,'文山'),(107,24,'红河'),(108,24,'西双版纳'),(109,24,'楚雄'),(110,24,'大理'),(111,24,'德宏'),
	(112,24,'怒江'),(113,24,'迪庆');
#河南
INSERT warea(area_id,pid,area_name) value(114,16,'郑州'),(115,16,'开封'),(116,16,'洛阳'),(117,16,'平顶山'),(118,16,'安阳'),
	(119,16,'鹤壁'),(120,16,'新乡'),(121,16,'焦作'),(122,16,'濮阳'),(123,16,'许昌'),(124,16,'漯河'),(125,16,'三门峡'),(126,16,'南阳'),
	(127,16,'商丘'),(128,16,'信阳'),(129,16,'周口'),(130,16,'驻马店');
#上海
INSERT warea(area_id,pid,area_name) value(131,03,'黄浦'),(132,03,'徐汇'),(133,03,'长宁'),(134,03,'静安'),(135,03,'普陀'),(136,03,'虹口'),
	(137,03,'杨浦'),(138,03,'闵行'),(139,03,'宝山'),(140,03,'嘉定'),(141,03,'浦东'),(142,03,'金山'),(143,03,'青浦'),(144,03,'奉贤'),
	(145,03,'崇明');
#江苏
INSERT warea(area_id,pid,area_name) value(146,18,'南京'),(147,18,'镇江'),(148,18,'常州'),(149,18,'无锡'),(150,18,'苏州'),(151,18,'南通'),
	(152,18,'泰州'),(153,18,'扬州'),(154,18,'盐城'),(155,18,'淮安'),(156,18,'宿迁'),(157,18,'连云港'),(158,18,'徐州');
#四川
INSERT warea(area_id,pid,area_name) value(159,30,'成都'),(160,30,'自贡'),(161,30,'攀枝花'),(162,30,'德阳'),(163,30,'绵阳'),(164,30,'广元'),
	(165,30,'遂宁'),(166,30,'内江'),(167,30,'乐山'),(168,30,'眉山'),(169,30,'南充'),(170,30,'宜宾'),(171,30,'广安'),(172,30,'达州'),
	(173,30,'雅安'),(174,30,'巴州'),(175,30,'资阳'),(176,30,'泸州'),(177,30,'阿坝'),(178,30,'甘孜'),(179,30,'凉山');
#重庆
INSERT warea(area_id,pid,area_name) value(180,31,'渝中'),(181,31,'大渡口'),(182,31,'江北'),(183,32,'沙坪坝'),(184,31,'九龙坡'),(185,31,'南岸'),
	(186,31,'北碚'),(187,31,'渝北'),(188,31,'巴南'),(189,31,'万州'),(190,31,'涪陵'),(191,31,'永川'),(192,31,'璧山'),(193,31,'大足'),(194,31,'綦江'),
	(195,31,'江津'),(196,31,'合川'),(197,31,'黔江'),(198,31,'长寿'),(199,31,'南区'),(200,31,'铜梁'),(201,31,'潼南'),(202,31,'荣昌'),(203,31,'开州'),
	(204,31,'梁平'),(205,31,'武隆'),(206,31,'城口'),(207,31,'丰都'),(208,31,'垫江'),(209,31,'忠县'),(210,31,'云阳'),(211,31,'奉节'),(212,31,'巫山'),
	(213,31,'巫溪'),(214,31,'石柱'),(215,31,'秀山'),(216,31,'酉阳'),(217,31,'彭水');
#黑龙江
INSERT warea(pid,area_name) value(13,'哈尔滨'),(13,'齐齐哈尔'),(13,'鸡西'),(13,'鹤岗'),(13,'双鸭山'),(13,'大庆'),(13,'伊春'),(13,'佳木斯'),(13,'七台河'),
    (13,'牡丹江'),(13,'黑河'),(13,'绥化'),(13,'大兴安岭地区');
#辽宁省
INSERT warea(pid,area_name) value(14,'沈阳'),(14,'大连'),(14,'鞍山'),(14,'抚顺'),(14,'本溪'),(14,'丹东'),(14,'锦州'),(14,'营口'),(14,'阜新'),
    (14,'辽阳'),(14,'盘锦'),(14,'铁岭'),(14,'朝阳'),(14,'葫芦岛');
#吉林省
INSERT warea(pid,area_name) value(15,'长春'),(15,'吉林'),(15,'四平'),(15,'辽源'),(15,'通化'),(15,'白山'),(15,'松原'),(15,'白城'),(15,'延边');
#内蒙古自治区
INSERT warea(pid,area_name) value(21,'呼和浩特'),(21,'包头'),(21,'乌海'),(21,'赤峰'),(21,'通辽'),(21,'鄂尔多斯'),(21,'呼伦贝尔'),
    (21,'巴彦淖尔'),(21,'乌兰察布'),(21,'锡林郭勒盟'),(21,'兴安盟'),(21,'阿拉善盟');
#陕西省
INSERT warea(pid,area_name) value(28,'西安'),(28,'榆林'),(28,'延安'),(28,'宝鸡'),(28,'咸阳'),(28,'渭南'),(28,'铜川'),(28,'汉中'),(28,'安康'),(28,'商洛');
#北京市
INSERT warea(pid,area_name) value(1,'东城'),(1,'西城'),(1,'朝阳'),(1,'丰台'),(1,'石景山'),(1,'海淀'),(1,'门头沟'),(1,'房山'),(1,'通州'),(1,'顺义'),
    (1,'昌平'),(1,'大兴'),(1,'怀柔'),(1,'平谷'),(1,'密云'),(1,'延庆');
#天津市
INSERT warea(pid,area_name) value(2,'和平'),(2,'河东'),(2,'河西'),(2,'南开'),(2,'河北'),(2,'滨海新区'),(2,'东丽'),(2,'西青'),(2,'津南'),(2,'北辰'),
    (2,'武清'),(2,'宝坻'),(2,'宁河'),(2,'静海'),(2,'蓟州');
#广西壮族自治区
INSERT warea(pid,area_name) value(10,'南宁'),(10,'柳州'),(10,'桂林'),(10,'梧州'),(10,'北海'),(10,'防城港'),(10,'钦州'),(10,'贵港'),(10,'玉林'),
    (10,'百色'),(10,'贺州'),(10,'河池'),(10,'来宾'),(10,'崇左');
#海南省
INSERT warea(pid,area_name) value(25,'海口'),(25,'三亚'),(25,'三沙'),(25,'瞻洲');
#宁夏回族自治区
INSERT warea(pid,area_name) value(12,'银川'),(12,'石嘴山'),(12,'吴忠'),(12,'固原'),(12,'中卫');
#甘肃省
INSERT warea(pid,area_name) value(29,'兰州'),(29,'嘉峪关'),(29,'酒泉'),(29,'张掖'),(29,'金昌'),(29,'武威'),(29,'白银'),(29,'定西'),(29,'天水'),
    (29,'平凉'),(29,'庆阳'),(29,'陇南');
#贵州省
INSERT warea(pid,area_name) value(23,'贵阳'),(23,'六盘水'),(23,'遵义'),(23,'安顺'),(23,'毕节'),(23,'铜仁'),(23,'黔西南'),(23,'黔东南'),(23,'黔南');
#河北
INSERT warea(pid,area_name) value(17,'石家庄'),(17,'唐山'),(17,'秦皇岛'),(17,'邯郸'),(17,'邢台'),(17,'保定'),(17,'张家口'),(17,'承德'),(17,'沧州'),
    (17,'廊坊'),(17,'衡水');
#山东省
INSERT warea(pid,area_name) value(19,'济南'),(19,'青岛'),(19,'淄博'),(19,'枣庄'),(19,'东营'),(19,'烟台'),(19,'潍坊'),(19,'济宁'),(19,'泰安'),
    (19,'威海'),(19,'日照'),(19,'滨州'),(19,'德州'),(19,'聊城'),(19,'临沂'),(19,'菏泽'),(19,'莱芜');
#山西省
INSERT warea(pid,area_name) value(27,'太原'),(27,'大同'),(27,'朔州'),(27,'阳泉'),(27,'长治'),(27,'晋城'),(27,'忻州'),(27,'吕梁'),(27,'晋中'),
    (27,'临汾'),(27,'运城');
#修改
INSERT warea(pid,area_name) value(25,'五指山'),(25,'文昌'),(25,'万宁'),(25,'东方'),(25,'琼海');
UPDATE warea SET area_name='儋州' where area_name='瞻洲';

#---用户信息表
INSERT wuser(user_id,user_name,user_pwd,user_access) value(00000000,'admin','123456',9),(01,'test1','123456',1),
	(02,'test2','123456',2),(03,'test3','123456',3);

#创建站点管理的视图
CREATE VIEW sitemanage AS
	SELECT site_id,site_name,stype,state,user_name,water_name,province_name,area_name,site.del
	FROM site,wuser,water,warea,province
	WHERE site.uid=wuser.user_id and site.wid=water.water_id and site.aid=warea.area_id and warea.pid=province.province_id;

set global wait_timeout = 10;