// common.js
// 工具类
var Utils = {
	getlocalStorage: function (k) {
		return sessionStorage.getItem(k);
	},
	setlocalStorage: function (k,v) {
		sessionStorage.setItem(k,v);
	},
    'getQueryString' : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
    }
}
// 全局配置
var CONFIG = {
	/apiHost: 'http://192.168.201.191:8080/tv_payment/V1.0.0/',
	// apiHost: 'http://112.124.50.236:8080/tv_payment/V1.0.0/',
	pageHostDev: 'http://192.168.200.46:8170/wagepayment/',
	pageHostPro: 'http://10.27.106.146:8890/wagepayment/',
	pageHost: 'http://10.27.106.146:8890/wagepayment/',
}

// 有返回按钮
if(document.querySelector('.goback')){
	document.querySelector('.goback').addEventListener('click',function(){
		history.go(-1);
	})
}

// 有顶部菜单存在
if(document.querySelector('.top_menu')){
	var userinfo = JSON.parse(Utils.getlocalStorage('userinfo'));
	document.querySelector('.company').innerHTML = userinfo.companyName; //公司名
	document.querySelector('.realName').innerHTML = userinfo.realName; 
	document.querySelector('.position').innerHTML = userinfo.position == '01'?'会计':'财务经理';

	// 退出登录
	document.querySelector('.logout').addEventListener('click',function(){
		var url = CONFIG.apiHost + 'logout.do?token=' + Utils.getlocalStorage('token');
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.open('GET', url);
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            alert('退出登录!');
            location.href = '/login.html';
        }
        xhr.send();
		
	})
}

