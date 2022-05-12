<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-06 09:47:12
 * @FilePath: /timeSelect/src/components/timer/index.vue
-->
<template>
  <div class="duration" v-cloak ref="duration">
    <div v-show="disabled" class="mark"></div>
    <table class="time-table" @mousedown="onMousedown" @mouseup="onMouseup" @mouseover="onMouseover">
      <colgroup>
        <col class="day" />
        <col class="hour" v-for="i in 48" :key="i" />
      </colgroup>
      <thead>
        <tr>
          <th class="day" rowspan="2">
            <span>{{ text[type] }}\时间</span>
          </th>
          <th colspan="24">00:00-12:00</th>
          <th colspan="24">12:00-24:00</th>
        </tr>
        <tr>
          <th colspan="2" v-for="i in 24" :key="i">
            <span>{{ i - 1 }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, x) in time" :key="x">
          <td class="day">
            <span>{{ timeObj[type][x] }}</span>
          </td>
          <template v-for="(value, y) in item">
            <td class="hour" :class="value | classNmae" :style="getbgColor(value)" :data-x="x" :data-y="y" :key="`${x}-${y}`" @click="checkendItem"></td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class="duration-tipline">
      <div style="display: flex">
        <span class="sample off" font="h5"></span>
        <label font="h5">未选</label>
        <span class="sample on" :style="`background-color: ${color};`" font="h5"></span>
        <label font="h5">已选</label>
        <label class="ml20 tip" font="h5">
          <img src="../../assets/F5.png" width="12" height="12" alt="" />
          可拖动鼠标选择时间
        </label>
      </div>
      <div class="empty-button" @click="empty">
        <span :style="`color: ${color};`">清空</span>
      </div>
    </div>
  </div>
</template>
<script>
const On = '1';
const Off = '0';

function create_data() {
  let arr = [];
  for (let i = 0; i < 48; i++) {
    arr.push({ value: Off, state: false });
  }
  return arr;
}

function getday(days = 1) {
  let daysArr = [];
  var currentDate = new Date();
  for (let i = 0; i <= 24 * days; i += 24) {
    //今天加上前6天
    let dateItem = new Date(currentDate.getTime() + i * 60 * 60 * 1000); //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    // let y = dateItem.getFullYear(); //获取年份
    let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate(); //获取日期
    m = addZero(m); //给为单数的月份补零
    d = addZero(d); //给为单数的日期补零
    // let valueItem = y + '/' + m + '/' + d; //组合
    let valueItem = m + '月' + d + '日'; //组合
    daysArr.push(valueItem); //添加至数组
  }
  return daysArr;
}

//给日期加0
function addZero(time) {
  if (time.toString().length == 1) {
    time = '0' + time.toString();
  }
  return time;
}
export default {
  data: function () {
    return {
      time: [],
      // text: '',
      timeObj: {
        week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        date: []
      },
      text: {
        week: '星期',
        date: '日期'
      }
    };
  },
  props: {
    value: {
      type: String,
      default: function () {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => '#50aad8'
    },
    // 类型 是星期还是日期
    type: {
      type: String,
      default: () => 'week'
    },
    // 天数
    days: {
      type: Number || String,
      default: () => 7
    }
  },
  filters: {
    classNmae: function (item) {
      if (item.value === On) {
        return { on: true };
      }
      return { off: true };
    }
  },
  created() {
    this.autoSelect();
    this.timeObj.date = getday(this.days - 0);
  },
  mounted() {
    this.$emit('update:date', this.timeObj[this.type]);
  },
  methods: {
    getbgColor(item) {
      if (item.value === On) {
        return `background-color: ${this.color};`;
      }
      return '';
    },
    getDom(e) {
      const { target } = e || {};
      if (target) {
        const className = target.getAttribute('class');
        if (className && className.includes('hour')) {
          return target;
        }
      }
    },
    getCoordinate(e) {
      const dom = this.getDom(e);
      if (dom) {
        let x = dom.getAttribute('data-x');
        let y = dom.getAttribute('data-y');
        return {
          x: parseInt(x),
          y: parseInt(y)
        };
      }
    },
    onMousedown(e) {
      const dom = this.getDom(e);
      if (dom) {
        const start = this.getCoordinate(e);
        if (start) {
          this.start = start;
          this.mousedown = true;
        }
      }
    },
    onMouseup() {
      if (this.mousedown) {
        this.mousedown = false;
        this.success();
      }
    },
    onMouseover(e) {
      if (this.mousedown) {
        let end = this.getCoordinate(e);
        if (end) {
          this.SelectTD(this.start, end);
        }
      }
    },
    SelectTD: function (start, end) {
      const y1 = Math.min(parseInt(start.y), parseInt(end.y));
      const y2 = Math.max(parseInt(start.y), parseInt(end.y));
      const x1 = Math.min(parseInt(end.x), parseInt(end.x));
      const x2 = Math.max(parseInt(start.x), parseInt(end.x));
      let array = this.time.map((item) => [].concat(item));
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          let item = Object.assign({}, array[i][j]);
          //在同一次鼠标按下的过程中，选中过的表格不进行选中或取消操作
          if (item.state) {
            continue;
          }
          item.state = true;
          item.value = item.value === On ? Off : On;
          array[i][j] = item;
        }
      }
      this.time = array;
    },
    success() {
      const text = [];
      this.time = this.time.map((arr) => {
        return arr.map((item) => {
          item.state = false;
          text.push(String(item.value));
          return item;
        });
      });
      const value = text.join('');
      this.$emit('input', value);
    },
    checkendItem(e) {
      let coordinate = this.getCoordinate(e);
      // const key = `[${coordinate.x}][${coordinate.y}].value`;
      const value = this.time[coordinate.x][coordinate.y].value === On ? Off : On;
      this.time[coordinate.x][coordinate.y].value = value;
      this.success();
    },
    // 清空数据
    empty() {
      this.mousedown = false;
      this.time = this.time.map(() => {
        return create_data();
      });
      this.success();
    },
    autoSelect() {
      let time = [];
      for (let j = 0; j < 7; j++) {
        let text = this.value.slice(j * 48, (j + 1) * 48);
        let dayArr = [];
        if (text) {
          text = text.split('');
          for (let i = 0; i < 48; i++) {
            text[i] = parseInt(text[i]);
            if (!text[i]) {
              dayArr[i] = { value: Off, state: false };
            } else {
              dayArr[i] = { value: String(text[i]), state: false };
            }
          }
        } else {
          dayArr = create_data();
        }
        time.push(dayArr);
      }
      Object.assign(this.$data, {
        time: time
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/*
  高级时间
*/

.duration {
  position: relative;
  $width: 752px;
  $day: 85px;
  width: $width;
  .mark {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }

  thead {
    th {
      height: 24px;
    }
  }
  .time-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #d1d1d1;
    }

    .day,
    .hour {
      height: 35px;
      outline: none;
      user-select: none;
    }

    .day {
      width: $day;
      text-align: center;
    }
    .hour {
      cursor: pointer;
    }
    span {
      font-weight: 400;
    }
  }

  .on {
    background-color: #50aad8;
  }
  .off {
    background-color: none;
  }

  .duration-tipline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    .sample {
      width: 15px;
      height: 15px;
      border: 1px solid #d1d1d1;
      border-radius: 4px;
    }
    span,
    label {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      margin-right: 5px;
    }
    label {
      margin-right: 24px;
      color: #999999;
      font-size: 12px;
    }
    .tip {
      display: flex;
      align-items: center;
    }
    .empty-button {
      cursor: pointer;
    }
    img {
      margin-right: 4px;
    }
  }
}
</style>
