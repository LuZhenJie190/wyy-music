<template>
	<view class="index">
		<musichead title="网易云音乐" :icon='true'></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				    <view class="skeleton" v-show="isLoading">
				        <m-for-skeleton
				        :avatarSize="200"
				        :row="3"
				        :loading="isLoading"
				        isarc="square"
				        v-for="(item,key) in topList"
				        :key="key"
						:titleStyle={}
						:title="false">
				        </m-for-skeleton>
				        
				    </view>
				<view class="index-list" v-show="!isLoading">
					<view class="index-list-item" @tap="handleToList(item.id)" v-for="item in topList" :key="item.id">
						<view class="index-list-img">
							<image :src="item.coverImgUrl"></image>
							<text>每天更新</text>
						</view>
						<view class="index-list-text">
							<view v-for="(val,index) in item.tracks" :key="item.first">
							{{index+1}}.{{val.first}} - {{val.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {topList} from "@/common/api.js"
	export default {
		data() {
			return {
				topList:[],
				isLoading:true,
			}
		},
		onLoad() {
			topList().then((res)=>{
				this.topList = res.data.list.slice(0,4);
				setTimeout(()=>{
					this.isLoading = false;
				},500)
				
			})
		},
		methods: {
			handleToList(listId){
				uni.navigateTo({
					url:`/pages/list/list?listId=${listId}`
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		}
	}
</script>

<style scoped>
	.index{}
	.index-search{
		display: flex;align-items: center;height: 70rpx;margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;border-radius: 50rpx;
	}
	.index-search text{font-size: 26rpx;margin-right: 26rpx;margin-left: 28rpx;}
	.index-search input{font-size: 28rpx;flex: 1;padding-right: 20rpx;}
	.index-list{margin: 0 30rpx;}
	.index-list-item{display: flex; margin-bottom:34rpx}
	.index-list-img{width: 212rpx; height: 212rpx; position: relative;border-radius: 30rpx;overflow: hidden;
	margin-right: 22rpx;}
	.index-list-img image{width: 100%; height:100%}
	.index-list-img text{position: absolute;left: 12rpx;bottom: 16rpx;color: white;font-size: 20rpx;}
	.index-list-text{font-size: 24rpx;line-height: 66rpx;flex:1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;
	display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;word-break: break-all;}
	
</style>
