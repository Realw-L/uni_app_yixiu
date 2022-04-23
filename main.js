import Vue from 'vue'
import App from './App'
import util from 'common/util.js'
import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'

import store from './store'

Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head',pageHead)
Vue.component('page-foot',pageFoot)

Vue.filter("formatDate",(data)=>{
	const nDate=new Date(data);
	const year = nDate.getFullYear().toString().padStart(2,0);
	const month = nDate.getMonth().toString().padStart(2,0);
	const day = nDate.getDay().toString().padStart(2,0);
	return year +'-'+ month +'-'+ day
})

Vue.filter("checkArray",(value)=>{
	if (typeof(value) == 'undefined' || !value || value == 0) {
		return []
	}
	if(Array.isArray(value))
		return value
		
	return [];
})

Vue.filter("cutStr",(value, len)=>{

	return util.cutStr(value,len)
})

Vue.filter("subStr",(value, len, pos)=>{

	return util.subStr(value,len,pos)
})

App.mpType = 'app'

  
  
const app = new Vue({
	store,
	...App
})


app.$mount()
