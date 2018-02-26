<template>
	
	<div class="sign">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
		  <el-breadcrumb-item>我的记录</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="sign-body">
			
			<div class="data-layout">
        <table class="data-table-layout bordered">
          <thead>
            <tr>
              <th>应出勤工时</th>
              <th>出勤工时</th>
              <th>打卡时长</th>
              <th>请假（次）</th>
              <th>外出（次）</th>
              <th>迟到（次）</th>
              <th>早退（次）</th>
              <th>消异常次数</th>
              <th>消异常时长</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
              <td><strong>200</strong><small>小时</small></td>
            </tr>
          </tbody>
        </table>
				<fullCalendar :events="fcEvents"
				  first-day='1' locale="zh-cn"
				  @changeMonth="changeMonth"
				  @eventClick="eventClick"
				  @dayClick="dayClick"
				  @moreClick="moreClick">
				    <template slot="fc-event-card" scope="p">
				        {{ p.event.title }}
				    </template>
				</fullCalendar>
			</div>

		</div>

		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>{{date}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>


	</div>
</template>





<script>
import fullCalendar from '../../../components/calendar/fullcalendar'
let dateTime = [
  {
    title: '8:00~12:00',
    start: '2018-02-07',
  },
  {
    title: '8:00~12:00',
    start: '2018-02-08',
  },
  {
    title: '8:00~缺卡',
    start: '2018-02-09',
    cssClass : 'red'
  }
]
export default {
  data () {
    return {
      name: 'Sunny!',
      fcEvents: dateTime,
      dialogVisible: false,
      date:"",
    }
  },
  methods: {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start, end, current)
    },
    'eventClick' (event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
      this.dialogVisible = true
      this.date = day
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components: {
    fullCalendar
  }
}
</script>

<style lang="less">
	

</style>