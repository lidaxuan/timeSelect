<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-29 14:50:07
 * @FilePath: /timeSelect/README.md
-->

`npm i @lijixuan/timer`

`export { Timer, format };`导出了组件,还有格式化日期函数

`import { Timer, format } from '@lijixuan/timer';`

# timer

| 参数     | 类型    | 默认值  | 说明                        |
| -------- | ------- | ------- | --------------------------- |
| value    | String  | ''      | 回显的数据                  |
| disabled | Boolean | false   | 是否禁用                    |
| color    | String  | #50aad8 | 选择颜色                    |
| type     | String  | week    | 类型  星期:week  日期: date |
| days     | Number  String  | 7 | 往后天数 只有type=date 时生效 |

demo

```html

<template>
  <div class="">
    {{ aaaaa }}-
    <Timer v-model="aaaaa" :date.sync="week" color="pink"></Timer>

    <template v-for="(list, index) in timeList('aaaaa')">
      <div class="flex flex-aic">
        <span class="mr10">
          <span>{{ week[index] }}</span>
        </span>
        <div class="item-text p10 flex" v-for="(item, key) in list" :key="`${index}-${key}`">
          <span>
            <span>{{ item.start }}</span>
            <span>-</span>
            <span>{{ item.end }}</span>
          </span>
        </div>
      </div>
    </template>

    <hr />

    <Timer v-model="bbbbb" type="date" :date.sync="date" :days="7" color="green"></Timer>
    <template v-for="(list, index) in timeList('bbbbb')">
      <div class="flex flex-aic">
        <span class="mr10">
          <span>{{ date[index] }}</span>
        </span>
        <div class="item-text p10 flex" v-for="(item, key) in list" :key="`${index}-${key}`">
          <span>
            <span>{{ item.start }}</span>
            <span>-</span>
            <span>{{ item.end }}</span>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
// import Timer from '@/components/timer';
import {Timer. format} from '@lijixuan/timer';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: { Timer:Timer },
  props: {},
  data() {
    return {
      aaaaa:
        '000000000000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000011111111111000000000000000000000000000000000000011111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      bbbbb: '',
      week: [], // 星期
      date: [] // 天数
    };
  },
  methods: {
    timeList(val) {
      return format(this[val]);
    }
  },
};
</script>
```