import App from './App'
import store from "store/index.js"
// #ifndef VUE3
import Vue from 'vue'
	import '@/common/iconfont.css'
Vue.config.productionTip = false
// 数量格式化
Vue.filter('formatCount',function(value){
	if(value>=10000 && value<=100000000){
		value /= 10000;
		return value.toFixed(1)+'万'
	}else if(value > 100000000){
		value /= 100000000;
		return value.toFixed(1)+'亿'
	}else{
		return value
	}
})
// 日期格式化
Vue.filter('formatDate',function(value){
	const date = new Date(value);
	const y = date.getFullYear();
	const month = date.getMonth()+1;
	const d = date.getDate();
	const result = `${y}年${month}月${d}日`;
	return result;
})
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif