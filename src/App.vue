<template>
  <div id="app">
  	<transition name="slide-fade">
    	<router-view/>
	</transition>
  </div>
</template>



<script>
export default {
  name: 'app'
}
</script>
<style scoped lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity: 0;
}
</style>
