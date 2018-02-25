<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <select v-model="year" @change="go">
        <option v-for="item in yearList" :value="item">{{item}}年</option>
      </select>
      <select v-model="month" @change="go">
        <option value="01">一月</option>
        <option value="02">二月</option>
        <option value="03">三月</option>
        <option value="04">四月</option>
        <option value="05">五月</option>
        <option value="06">六月</option>
        <option value="07">七月</option>
        <option value="08">八月</option>
        <option value="09">九月</option>
        <option value="10">十月</option>
        <option value="11">十一月</option>
        <option value="12">十二月</option>
      </select>
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
let dateFunc = {
  getMonthViewStartDate (date, firstDay) {
    firstDay = parseInt(firstDay)
    let start = moment(date)
    let startOfMonth = moment(start.startOf('month'))

    start.subtract(startOfMonth.day(), 'days')

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days')
    }

    start.add(firstDay, 'days')

    return start
  },
  getMonthViewEndDate (date) {
    return this.getMonthViewStartDate().add(6, 'weeks')
  }
}
export default {
  props: {
    currentMonth: {},
    titleFormat: {},
    firstDay: {},
    monthNames: {},
    locale: {}
  },
  data () {
    return {
      year:"",
      month:"",
    }
  },
  created(){
    this.year = this.years
    this.month = this.months
  },
  computed: {
    yearList(){
      let year = [];
      for(let i = 2000; i < 2030; i++){
        year.push(i)
      }
      return year
    },
    years() {
      if (!this.currentMonth) return
      return this.currentMonth.locale(this.locale).format('YYYY')
    },
    months(){
      if (!this.currentMonth) return
      return this.currentMonth.locale(this.locale).format('MM')
    }
  },
  methods: {
    go(){
      this.$emit('change', moment(this.year + '-' +this.month))
    }
  }
}
</script>
<style lang="less">
.full-calendar-header{
  display: flex;
  align-items: center;
  .header-left,.header-right{
    flex:1;
  }
  .header-center{
    flex:3;
    text-align:center;
    .title{
      margin: 0 10px;
    }
    .prev-month,.next-month{
      cursor: pointer;
    }
  }
}
</style>
