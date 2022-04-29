/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-06 09:47:12
 * @FilePath: /vue-shelf/src/components/timer/format.js
 */

import _ from 'lodash';
import moment from 'moment';

function makeTimer () {
  moment.locale('zh-cn');
  const time = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD') + ' 00:00';
  const initTime = moment(time, 'YYYY-MM-DD hh:mm');
  
  const list = {};
  for(let i = -1; i < 48; i++) {
    const value = initTime.format('HH:mm');
    list[String(i)] = value;
    initTime.add(30, 'minutes');
  }
  list[String(47)] = '24:00';
  return list;
}

const timer = makeTimer();

function getArray(text) {
  const list = text.split('');
  const array = [];
  for(let i = 0; i < 7; i++) {
    array.push(list.slice(i * 48, (i + 1) * 48));
  }
  return array;
}

function format(text) {
  if (!text) {
    return [];
  }
  const array = getArray(text);
  const times = _.map(array, list => {
    const arr = _.map(list, (value, index) => {
      if (value === '1') {
        return {
          start: timer[index - 1],
          end: timer[index]
        };
      }
      return void 0;
    });
    let temp = [];
    let index = 0;
    for(let i = 0, len = arr.length; i < len; i++) {
      if (arr[i]) {
        temp[index] = _.compact([].concat(temp[index]));
        temp[index].push(arr[i]);
      } else {
        index += 1;
      }
    }
    temp = _.map(_.compact(temp), item => {
      const first = _.first([].concat(item));
      const last = _.last([].concat(item));
      const data = {
        start: first.start,
        end: last.end
      };
      return data;
    });
    return temp;
  });
  return times;
}


export default format;