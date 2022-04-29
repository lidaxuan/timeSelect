/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-29 14:49:44
 * @FilePath: /timeSelect/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './components/index';

new Vue({
  render: h => h(App),
}).$mount('#app')