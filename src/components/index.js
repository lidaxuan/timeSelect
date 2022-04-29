/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-29 12:01:31
 * @FilePath: /timeSelect/src/components/index.js
 */
// index.js

import Vue from "vue";
import Timer from "./timer/index.vue";

const Components = {
  Timer
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
