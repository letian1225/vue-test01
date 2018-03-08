<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      
      <el-select v-model="year" @change="go">
         <el-option
           v-for="item in yearList"
           :key="item"
           :label="item"
           :value="item">
         </el-option>
       </el-select>

       <el-select v-model="month" @change="go">
          <el-option label="一月" value="01"></el-option>
          <el-option label="二月" value="02"></el-option>
          <el-option label="三月" value="03"></el-option>
          <el-option label="四月" value="04"></el-option>
          <el-option label="五月" value="05"></el-option>
          <el-option label="六月" value="06"></el-option>
          <el-option label="七月" value="07"></el-option>
          <el-option label="八月" value="08"></el-option>
          <el-option label="九月" value="09"></el-option>
          <el-option label="十月" value="10"></el-option>
          <el-option label="十一月" value="11"></el-option>
          <el-option label="十二月" value="12"></el-option>
       </el-select>

      
        
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
      for(let i = 2018; i <= 2030; i++){
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
