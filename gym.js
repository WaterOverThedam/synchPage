/**
 * Created by Tony on 2017/9/10.
 */


function result(data) {
    data = data.replace(/\|/g, '"')
    try {
        //alert($.parseJSON(data))
        return $.parseJSON(data)
    }catch (e){
        console.error(data)
        console.error(e.message)
    }
    return null;
}

function getUrlParam(name) {
    var reg = new RegExp("('|&)" + name + "=(['&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


function date_end(dt,n){
    ndays = parseInt(n)*7-1;
    return date_cal(dt,ndays)
}
function date_start(dt,n){
    ndays = parseInt(n)*7;
    return date_cal(dt,ndays)
}
function date_cal(dt,ndays){
    dt = new Date(dt)
    dt.setDate(dt.getDate()+ndays);
    dtend  = dt.Format("yyyy-MM-dd");
    return dtend
}

Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}


Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));//后4位
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function rank(nums,item,gym,type,rate) {
    var colors = ['rgba(119, 152, 191, .5)','rgba(223, 83, 83, .5)','yellow'];
    var aliasName = type? '排名前25%中心':'排名后25%中心';
    rate = rate||0.25;
    type = type||0;
    var rank = rate*nums.length;
    nums = nums.sort(function(a,b){
        if(!type){
            return a[item]-b[item];
        }else{
            return b[item]-a[item];
        }
    });
    var arr=[];
    var j=0;
    var v;
    for(var i=0; i<nums.length-1;i++)
    {
        if(v!=nums[i][item]){
            j++;
        }
        if (j<rank  && nums[i][item]){
            var color='red';
            if(nums[i].年份.indexOf(gym)==-1){
                var color=colors[type];
            }
            obj = {年份:nums[i].年份,月份:nums[i].月份,xh:j,color:color,alias:aliasName};
            obj[item] = nums[i][item];
            arr.push(obj);
        }
        v=nums[i];
    }
    return arr;
}


function rank2(nums,item,type,rate) {
    var colors = ['rgba(119, 152, 191, .5)','rgba(223, 83, 83, .5)','yellow'];
    var aliasName = type? '排名前25%中心平均值':'排名后25%中心平均值';
    rate = rate||0.25;
    type = type||0;
    var rank = rate*nums.length;

    nums = nums.sort(function(a,b){
        if(!type){
            return a[item]-b[item];
        }else{
            return b[item]-a[item];
        }
    });
    console.log(JSON.stringify(nums));
    var j=0
    var v;
    var indexValue=0;
    var num=0;
    var test=[]
    for(var i=0; i<nums.length-1;i++)
    {
        if(v!=nums[i][item]){
            j++;
        }
        if (j<rank && nums[i][item]){
            num++;
            indexValue += parseInt(nums[i][item]);
            test.push(nums[i][item])
        }
        v=nums[i];
    }
    console.log(JSON.stringify(test));
    var color=colors[type];
    indexValue = parseInt(indexValue/num);
    obj = {年份:aliasName,月份:nums[i].月份,xh:j,color:color,alias:aliasName};
    obj[item] = indexValue;
    return obj;
}

function clearNullArr(arr){
    for(var i=0,len=arr.length;i<len;i++){
        if(!arr[i]||arr[i]==''||arr[i] === undefined){
            arr.splice(i,1);
            len--;
            i--;
        }
    }
    return arr;
}