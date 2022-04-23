# yixiou-union

yixiou-union

用户端: https://share.mockplus.cn/go/GDDHFS6SSAEN3UEU/index.html ，
查看密码是：yixiuyhd。

异修修改版——师傅端: https://share.mockplus.cn/go/BXNKFEMKHG3N9S6D/index.html ，
查看密码是：yixiusfd。 

异修后台: https://share.mockplus.cn/go/PGM7T5SMEJGSP54C/index.html ，
查看密码是：yiixuhtd。 

城市合伙人项目管理: https://share.mockplus.cn/go/D6RWT647KKK5KQMX/index.html ，
查看密码是：yxcshhr。


## graphql request demo
### query
uni.request({
		   url: 'http://192.168.123.175:8080/graphql?query={admin_user{id,nickname,username,create_time}}', //仅为示例，并非真实接口地址。
			method:"GET",
		    success: function(res) {
		        console.log(res.data);
		    },fail:(ret) => {
		 		console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
		 		console.log(ret)
		 	}
		});
		
		uni.request({
				    url: 'http://192.168.123.175:8080/graphql',
					method:"GET",
				    data: {query:'{admin_user(id:1){id,nickname,username,create_time}}'},
				    success: function(res) {
				        console.log(res.data);
				    },fail:(ret) => {
				 		console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
				 		console.log(ret)
				 	}
				});
				
				
### motation
uni.request({
		    url: 'http://192.168.123.175:8080/graphql',
			method:"GET",
			data: {query:'mutation{create_admin_link(title:"title",icon:"content"){id,eff,msg}}'},
		    success: function(res) {
		        console.log(res.data);
		    },fail:(ret) => {
		 		console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
		 		console.log(ret)
		 	}
		});
		
		uni.request({
				    url: 'http://192.168.123.175:8080/graphql?query=mutation+_{create_admin_link(title:"title",icon:"content"){id,eff,msg}}', //仅为示例，并非真实接口地址。
					method:"GET",
				    success: function(res) {
				        console.log(res.data);
				    },fail:(ret) => {
				 		console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
				 		console.log(ret)
				 	}
				});
				
				
	## hprose
 [hrpose wx](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=903&extra=page%3D1)
 [2](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=903&extra=page%3D1)
 [3](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=904&extra=page%3D1)
 [co](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=903&highlight=hprose)
 ### 协和  [协和](https://github.com/hprose/hprose-html5/wiki/协程)   
 ### demo
        var client = hprose.Client.create("http://192.168.123.175:8082/path", ["hello"]);
		client.hello("world", function(result) {
			
		  console.log('hprose:',result);
		});

or 

var client = hprose.Client.create("http://192.168.123.175:8082/path", ["hello"]);
client.hello("world").then(function(result) {
  console.log(result);
});


		
### websocket with subscrib 		
		var client = hprose.Client.create("ws://192.168.123.175:8080/", ["hello"]);
		client.hello("world", function(result) {
			
		  console.log('hprose:',result);
		});
		client.subscribe("ip", function(res){
			console.log(res)
		})
		
		or 
		
		var client = hprose.Client.create("ws://192.168.123.175:8080/", ["hello","hello2"]);
		
		client.subscribe("ip", function(res){
			console.log(res)
			
			
		},30000)
		
		
		client.hello("world", function(result) {
			
		  console.log('hprose:',result);
		});
		
		setInterval(function(res){
			client.hello2("world", function(result) {
			  console.log('hprose2:',result);
			});
		},24000)
		
### upload file
> uni.uploadFile({
            url: util.API_URI + '/sys/upload',
            filePath: imagepath,
            name: 'data',
            success: (ret) => {
              console.log('uploadImage success, res is:', ret)
              //ret is
              // var obj = JSON.parse(ret)
              // ret.data is string
              var obj = eval('(' + ret.data + ')')
              console.debug('parse obj is:', obj)
              self.imageVerifyIDList.push(obj.id)
							this.imageVerifyList.push(imagepath)
              uni.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000,
              })
            },
            fail: (err) => {
              console.log('uploadImage fail', err)
              uni.showModal({
                content: err.errMsg,
                showCancel: false,
              })
              uni.hideLoading()
            },
            complete: () => {
              console.log('complate')
              //check  use count

              if (self.imageVerifyList.length == self.imageVerifyIDList.length) {

                console.debug('all complate')
              }
            },
          })
		  
		  
		  
		  wx.uploadFile({
		  	url: util.API_URI + '/sys/upload',
		  	filePath: imagePath,
		  	name: 'data',
		  	success: res => {
		  		console.log('uploadImage success, res is:' + JSON.stringify(res));
		  		//res is
		  		// var obj = JSON.parse(res)
		  		// res.data is string
		  		// var obj = eval('(' + res.data + ')');
		  		var obj = JSON.parse(res.data);
		  		console.debug('parse obj is:' + JSON.stringify(obj));
		  		if (obj.success == 1) {
		  			_self.work_refer_images_finish_ids.push(obj.id);
		  
		  			// _self.work_refer_images_finish.push(imagePath);
		  			_self.work_refer_images_finish.push(util.IMAGE_URI + obj.url);
		  
		  			if (_self.work_refer_images_finish.length >= maxNum) {
		  				_self.btnImg = false;
		  			}
		  
		  			console.debug('iamgeList:' + JSON.stringify(_self.work_refer_images_finish));
		  			uni.showToast({
		  				title: '上传成功',
		  				icon: 'none',
		  				duration: 1000
		  			});
		  		} else {
		  			uni.showToast({
		  				title: obj.message,
		  				icon: 'none',
		  				duration: 1000
		  			});
		  		}
		  
		  		uni.hideLoading();
		  	},
		  	fail: err => {
		  		console.log('uploadImage fail', err);
		  		uni.showModal({
		  			content: err.errMsg,
		  			showCancel: false
		  		});
		  		uni.hideLoading();
		  	},
		  	complete: () => {
		  		console.log('complate');
		  		//check  use count
		  
		  		if (_self.work_refer_images_finish.length == _self.work_refer_images_finish.length) {
		  			console.debug('all complate');
		  		}
		  		uni.hideLoading();
		  	}
		  });
		  
		  
		
### 协程 demo   需ES6支持
> var hprose = require('../../utils/hprose.js');
var co = hprose.co;
var regeneratorRuntime = require("../../utils/regenerator-runtime.js");

onLoad: co.wrap(function *() {
    console.log('onLoad')
    var client = hprose.Client.create("http://hprose.com/example/", ["hello"]);
    var result = yield client.hello("world");
    console.log(result);
	
    //调用应用实例的方法获取全局数据
    this.setData({
      userInfo: yield app.getUserInfo
    });
  })
 
### function prame take place.
>  eg:  @change="change1($event,index)"
  function change1(envt,index) {}
  
  
  
## task
* 头像要裁剪压缩
* 订单分类子类别只选一个
* 

## bug
* 