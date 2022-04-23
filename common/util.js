

// var HOST = 'https://192.168.123.198:8003'

// var HOST = 'http://yixiou.pro.hego.site:8003'
var HOST = 'http://yixiou-svr.moran.loc'

const API_URI = HOST + '/api.php/'
// const NEW_HOST = 'http://192.168.123.175:8098'
const NEW_HOST = 'http://localhost:8098'
const API_URI2 = NEW_HOST+'/auto/api/graphql' //golang server for graphql
const NEW_API_URI = NEW_HOST+'/yixiou/api'    // golang server
const BATCHSQL_URI = NEW_HOST+'/auto/api/parse/batchsql'    // golang server

// const HOST = 'https://app.yidikj.com'
// const API_URI = HOST + '/'


const IMAGE_URI = HOST + ''
const H5_URL = HOST + '/index.php/'
const DEV_MODE = false;



function isDevMode() {

	return DEV_MODE
}

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.'),
	}
}

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000,
	},
	humanize: function(milliseconds) {
		var humanize = ''
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前'
				break
			}
		}
		return humanize || '刚刚'
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime()
		if (diff < this.UNITS['天']) {
			return this.humanize(diff)
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number)
		}
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' +
			_format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes())
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/)
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
	},
}

function getAPI(path) {
	return API_URI + path
}

/*  list:
     {page/data:{}}
		 object 
*/
function GET(uri, data, successFun, failFun) {

	var token = uni.getStorageSync('token')
	if (data) {
		data.token = token
	}
	var user_id = uni.getStorageSync('user_id')
	data.user_id = user_id

	uni.request({
		url: API_URI + uri,
		method: 'GET',
		data: data,
		dataType: 'json',
		success: (res) => {
			console.debug('Api response:' , uri,res)

			if (res.statusCode == 200) {

				if (res.data.status >= 1) {
					successFun(res.data)
				} else if (res.data.status == -2) { //need login
					uni.navigateTo({
						url: '/pages/my/login/login',
					})

				} else {

					var failContinue = true;
					if (typeof(failFun) != 'undefined') {
						failContinue = failFun(res.data)
					}
					if (failContinue) {
						uni.showToast({
							icon: 'none',
							title: res.data.message,
						})
					}
					console.error(res.data.message)
				}

			} else {
				uni.showToast({
					title: '请求失败:' + res.data.message,
					icon: 'none',
				})
				console.error(res.data.message)
			}

		},
		fail: (res) => {
			//console.log('Api response fail:' + uri + JSON.stringify(res))
			console.debug('Api response fail:' , uri, res)
			if (res.statusCode != 200) {

				uni.showToast({
					title: res.errMsg,
					icon: 'none',
				})

				console.error(res.errMsg)

			}

		},

	})

}

function POST(uri, data, successFun, failFun) {
	var token = uni.getStorageSync('token')
	if (data) {
		data.token = token
	}
	var user_id = uni.getStorageSync('user_id')
	data.user_id = user_id

	uni.request({
		url: API_URI + uri,
		method: 'POST',
		data: data,
		dataType: 'json',
		header: {
			// 'content-type': 'application/json',
			'content-type': 'application/x-www-form-urlencoded',
		},
		success: (res) => {
		
			console.debug('Api response :' , uri, res)
			if (res.statusCode == 200) {

				if (res.data.status >= 1) {

					successFun(res.data)

				} else if (res.data.status == -2) { //need login
					uni.navigateTo({
						url: '/pages/my/login/login',
					})

				} else {
					var failContinue = true;
					if (typeof(failFun) != 'undefined') {
						failContinue = failFun(res.data)
					}
					if (failContinue) {
						uni.showToast({
							icon: 'none',
							title: res.data.message,
						})
					}

					console.error(res.data.message)
				}
			} else {


				var failContinue = true;
				if (typeof(failFun) != 'undefined') {
					failContinue = failFun(res.data)
				}
				if (failContinue) {
					uni.showToast({
						icon: 'none',
						title: res.message,
					})
				}



				console.error(res.message)
			}

		},
		fail: (res) => {
			
			console.debug('Api response fail:' , uri, res)
			if (res.statusCode != 200) {

				uni.showToast({
					title: '发生异常:' + res.errMsg,
					icon: 'none',
				})

				console.error(res.errMsg)

			}

		},

	}, )

}



function getToken() {
	return '2d0ecbd6ebeb113e0026aa45c97c7968'
}

function isNull(exp) {
	if (typeof(exp) == 'undefined' || !exp || exp == 0) {
		return true
	}

	// if (typeof(options) == "undefined" || options== null){
	//   return true;

	return false
}

function getAPPInfo(packageName) {

	if (!plus) return {
		versionName: null,
		versionCode: null
	}

	var main = plus.android.runtimeMainActivity()

	var packageManager = main.getPackageManager()

	var PackageManager = plus.android.importClass(packageManager)

	var packageInfo = packageManager.getPackageInfo(packageName,
		PackageManager.GET_ACTIVITIES)

	if (packageInfo) { //类对象，获取其类属性值

		var versionName = plus.android.getAttribute(packageInfo, 'versionName')

		var versionCode = plus.android.getAttribute(packageInfo, 'versionCode')

		return {
			versionName: versionName,
			versionCode: versionCode
		}

	} else {

		return {
			versionName: null,
			versionCode: null
		}

	}

}

function getParam(uri) {
	var obj = new Object()
	var query = uri
	var vars = query.split('&')
	if (!vars) {
		return null
	}
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		obj[pair[0]] = pair[1]
	}

	console.debug('get params:' + JSON.stringify(obj))
	return obj
}

//skip url
function buildParam(obj) {
	if (!obj) {
		return ''
	}
	var params = ''
	for (var key in obj) {
		if (key == 'url')
			continue
		params += '&' + key + '=' + obj[key]
	}
	if (params.length > 0) { //remove first
		params = params.substring(1, params.length)
	}
	console.debug('buildparam:' + params)
	return params
}

function getMainUri(uri) {
	var query = uri
	var vars = query.split('?')
	if (!vars) {
		return uri
	}
	for (var i = 0; i < vars.length; i++) {
		return vars[i]
	}
	return ''
}

function getUriParams(uri) {
	if (uri && uri.length <= 0) {
		return ''
	}
	//replace &amp; =>&
	uri = uri.replace(/&amp;/g, '&')
	var query = uri
	var vars = query.split('?')
	if (!vars) {
		return ''
	}

	return vars[1]
	// for (var i=0;i<vars.length;i++) {
	// return vars[i]
	// }
	return ''
}

function goH5(inurl) {
	var url = getMainUri(inurl)
	var param = getUriParams(inurl)
	if (param && param.length > 0) {
		url += '&' + param
	}

	uni.navigateTo({
		url: '/pages/home/web?url=' + url,

	})
	console.log('go h5:' + url)
}

function goPage(e) {
	let path = e.url ? e.url : e;
	let url = ~path.indexOf('platform') ? path : '/pages/' + path;
	uni.navigateTo({
		url: url
	});
	return false;
}


/**
 * 版本比较(三位) ，如"1.1.0","1.2.0",
 *
 * @param {string} nowVersion 当前版本
 * @param {string} requestVersion 要求版本
 * @return {Boolen|undefine} requestVersion大于nowVersion时表明版本不符合，返回false。 若参数有误返回undefine
 * @example
 *  compareVersion("1.1.0","1.2.0");
 */
function compareVersion(nowVersion, requestVersion) {
	let reg = /(\d+)\.(\d+)\.(\d+)/;
	let nowArr = [];
	let requestArr = [];
	//参数检查
	try {
		if (nowVersion.match(reg).length !== 4 || requestVersion.match(reg).length !== 4) {
			console.log("Error compareVersion", "param");
			return;
		}
	} catch (e) {
		console.log("Error compareVersion", "param");
		return;
	}

	nowArr = nowVersion.match(reg).slice(1, 4);
	requestArr = requestVersion.match(reg).slice(1, 4);

	//console.log(nowArr,requestArr);
	for (let i = 0; i < 3; i++) {
		//console.log(i);
		if (nowArr[i] < requestArr[i]) {
			//console.log("requestVersion is bigger.");
			return false;
		}
	}
	return true;
}

function getOrderStatus(status) {
	var arr = ['备用', '未知', '新订单', '已支付', '服务中', '服务结束', '完成'];
	return arr[status]
}

function getOrderMode(mode) {
	var arr = ['市场单', '竞价', '指派'];
	return arr[mode]
}

function getActorOrderStatus(actor, status, order_mode) {
	var order_type = order_mode ? order_mode : 1; //设置参数a的默认值为1 
	status = parseInt(status)
	var order_button_name = '';

	if (status == 1) {
		order_button_name = '待报价';
		// 		if(order_type==2){
		// 			order_button_name = '待报价';
		// 		}
	} else if (status == 2) { //new

		order_button_name = '待支付';

		// if(actor==1){
		// self.order_button_name = '立即抢单';

	} else if (status == 3) { //paied

		order_button_name = '待抢单';
		if (actor == 1) {
			order_button_name = '立即抢单';
		}
	} else if (status == 4) {

		order_button_name = '施工中';
		if (actor == 1) {
			order_button_name = '完成施工';
		}

	} else if (status == 5) {

		order_button_name = '确认验收';
		if (actor == 1) {
			order_button_name = '待验收';
		}

	} else if (status == 11) {
		order_button_name = '待付尾款';
	} else {
		order_button_name = '完成订单';
	}

	return order_button_name;
}

function pushBind() {
	console.debug('pushBind');
	// var info = plus.push.getClientInfo()
	var info = uni.getStorageSync('push_info');
	uni.subscribePush({
		provider: 'igexin',
		success: function(res) {
			console.log('push subscribe success:' + JSON.stringify(res));

			uni.setStorageSync('push_info', res);

			info = res;

			console.debug('client info for push:', JSON.stringify(info));
			util.POST('user/push_bind', {
				device_type: 'android',
				device_id: info.clientid
			}, function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					_self.user.jpush_id = info.clientid;
					uni.setStorageSync('user_info', _self.user);
				}
			}); //end post
		}
	});
}

 function cutStr(str,len)
 {
  if(isNull(len)){
	  len = 5;
  }
  var strlen = 0; 
  var s = "";
  for(var i = 0;i < str.length;i++)
  {
   if(str.charCodeAt(i) > 128){
    strlen += 2;
   }else{ 
    strlen++;
   }
   s += str.charAt(i);
   if(strlen >= len){ 
    return s ;
   }
  }
 return s;
 }

 function subStr(str,len,pos)
 {
  if(isNull(len)){
	  len = 5;
  }
  if(isNull(pos)){
  	  pos = 0;
  }
  
  var strlen = 0; 
  var s = "";
  for(var i = pos;i < str.length;i++)
  {
   if(str.charCodeAt(i) > 128){
    strlen += 2;
   }else{ 
    strlen++;
   }
   s += str.charAt(i);
   if(strlen >= len){ 
    return s ;
   }
  }
 return s;
 }

module.exports = {
	HOST: HOST,
	API_URI: API_URI,
	API_URI2: API_URI2,
	NEW_API_URI:NEW_API_URI,
	BATCHSQL_URI:BATCHSQL_URI,
	IMAGE_URI: IMAGE_URI,
	H5_URL: H5_URL,
	isDevMode: isDevMode,

	//sz center
	DEFAULT_LONGITUDE: 114.066223,
	DEFAULT_LATITUDE: 22.547242,
	isNull: isNull,
	getToken: getToken,
	getAPI: getAPI,
	GET: GET,
	POST: POST,
	goH5: goH5,
	goPage: goPage,
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	getMainUri: getMainUri,
	getParam: getParam,
	buildParam: buildParam,
	getUriParams: getUriParams,
	getAPPInfo: getAPPInfo,
	compareVersion: compareVersion,
	getOrderMode: getOrderMode,
	getOrderStatus: getOrderStatus,
	getActorOrderStatus: getActorOrderStatus,
	pushBind:pushBind,
	cutStr:cutStr,
	subStr:subStr,
	
}
