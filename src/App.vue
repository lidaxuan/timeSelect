<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-29 14:49:44
 * @FilePath: /timeSelect/src/App.vue
-->
<template>
  <div id="app">
    {{ aaaaa }}
    <Timer v-model="aaaaa" :date.sync="week" color="#79BBFF"></Timer>

    <template v-for="(list, index) in timeList('aaaaa')">
      <div class="flex flex-aic" :key="index">
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
      <div class="flex flex-aic" :key="index">
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
import Timer from '@/components/timer';
import format from '@/components/timer/format';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: { Timer },
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

  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    timeList(val) {
      return format(this[val]);
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
