<template>
	<view class="music-head" :style="{color:color}">
		<view class="music-head-icon" :class="{'music-head-icon-black' : iconBlack}" v-if="icon">
			<text @click="handleToBack" class="iconfont icon icon-xiangzuojiantou"></text>|<text @click="handleToHome" class="iconfont icon icon-shouye"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		props:['title','icon','color','iconBlack'],
		data() {
			return {
				
			};
		},
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
		
	}
</script>

<style scoped>
.music-head{
	width: 100%;height: 75px;font-size: 16px;line-height: 80px;text-align: center;color: black;
	position: relative;
}
.music-head-icon{
	position: absolute;left: 8px; top: 25px;width: 90px;height: 31px;background: rgba(0,0,0,0.4);color: white;
	line-height: 31px;border-radius: 15px;display: flex;justify-content: space-evenly;
	
}
.music-head-icon-black{color: black;border: 1px solid #eaeaea;background: white;}
</style>