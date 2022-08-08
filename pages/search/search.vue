<template>
	<view class="search">
		<musichead title="搜索" :icon='true' :iconBlack="iconBlack"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch" @input="handleToSuggest">
					<text v-show="searchType !== 1"  style="transform: scale(1.5);" class="iconfont icon-guanbi" @tap="handleToClose" ></text>
				</view>
				
				<block v-if="searchType === 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont icon-icon" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchWordList" :key="index" @tap="handleToWord(item)">{{item}}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToHot(item.searchWord)" >
							<view class="search-hot-top">{{index+1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}<image :src="item.iconUrl"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<view class="search-hot-count">{{item.score}}</view>
						</view>
					</view>
				</block>
				<block v-else-if="searchType === 2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in songSearchList" :key="index" @tap="handleToDeatil(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.ar[0].name}} - {{item.al.name}}</view>
							</view>
							<text class="iconfont icon-bofang_o"></text>
						</view>
				
					</view>
				</block>
				<block v-else-if="searchType === 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索"<text>{{searchWord}}</text>"</view>
						<view class="search-suggest-item" v-for="(item,index) in suggestList" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont icon-fangdajing"></text>{{item.keyword}}
						</view>
						
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {searchHot,searchWord,searchSuggest} from "@/common/api.js"
	export default {
		data() {
			return {
				iconBlack:true,
				searchHot:[],
				searchWord:'',
				searchWordList:[],
				searchType:1,
				songSearchList:[],
				suggestList:[]
			}
		},
		onLoad(){
			searchHot().then(res=>{
				// console.log(res);
				if(res[1].statusCode === 200){
					this.searchHot = res[1].data.data;
					// console.log(this.searchHot);
				}
			})
			uni.getStorage({
				key:'searchHistory',
				success: (res) => {
					this.searchWordList = res.data;
					
				}
			})
		},
		methods: {
			handleToHot(key){
				this.searchWord = key;
			},
			handleToSearch(){
				this.searchType = 2;
				this.searchWordList.unshift(this.searchWord);
				this.searchWordList = [...new Set(this.searchWordList)];
				if(this.searchWordList.length > 10){
					this.searchWordList.length = 10
				}
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchWordList,
				});
				searchWord(this.searchWord).then(res=>{
					if(res[1].statusCode === 200){
						this.songSearchList = res[1].data.result.songs
						// console.log(this.songSearchList);
					}
					
				})
			},
			handleToWord(val){
				this.searchWord = val;
				this.handleToSearch(val);
			},
			handleToClear(){
				uni.removeStorage({
					key: 'searchHistory',
					success: (res)=> {
						this.searchWordList = []
					}
				});
			},
			handleToClose(){
				this.searchWord = "";
				this.searchType = 1;
			},
			handleToDeatil(songId){
				uni.navigateTo({
					url:`/pages/detail/detail?songId=${songId}`
				})
			},
			handleToSuggest(e){
				this.searchType = 3;
				let result = e.detail.value;
				if(!result){
					this.searchType = 1;
					return;
				}
				searchSuggest(result).then(res=>{
						this.suggestList = res[1].data.result.allMatch || [];
				})
			}
		}
	}
</script>

<style scoped>
	.search-search{
		display: flex;align-items: center;height: 70rpx;margin: 70rpx 30rpx 50rpx 30rpx;
		background: #f7f7f7;border-radius: 50rpx;
	}
	.search-search text{font-size: 26rpx;margin-right: 26rpx;margin-left: 28rpx;}
	.search-search input{font-size: 28rpx;flex: 1;padding-right: 20rpx;}
	.search-history{margin: 0 30rpx 50rpx 30rpx;font-size: 26rpx;}
	.search-history-head{display: flex;justify-content: space-between;margin-bottom: 36rpx;}
	.search-history-list{display: flex;flex-wrap: wrap;}
	.search-history-list view{padding: 16rpx 28rpx; border-radius:40rpx;margin-right: 30rpx;margin-bottom: 30rpx;background: #f7f7f7;}
	.search-hot{margin: 0 30rpx;font-size: 26rpx;}
	.search-hot-head{margin-bottom: 36rpx;}
	.search-hot-item{display: flex;align-items: center;margin-bottom: 58rpx;}
	.search-hot-top{color: #fb2222;width: 60rpx;margin-left: 8rpx;}
	.search-hot-word{flex: 1;}
	.search-hot-word view:nth-child(1){font-size: 30rpx;color: black;}
	.search-hot-word view:nth-child(2){font-size: 24rpx;width: 70vw;color: #878787;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
	.search-hot-word image{width: 48rpx;height: 22rpx;}
	.search-hot-count{color: #878787;}
	
	.search-result{border-top: 2rpx solid #e4e4e4;padding: 30rpx;}
	.search-result-item{display: flex;justify-content: space-between;align-items: center;padding-bottom: 30rpx;margin-bottom: 30rpx;border-bottom:2rpx solid #e4e4e4;}
	.search-result-word{}
	.search-result-word view:nth-child(1){font-size: 28rpx;color: #235790;margin-bottom: 12rpx;}
	.search-result-word view:nth-child(2){font-size: 22rpx;color: #898989;}
	.search-result-item text{font-size: 50rpx;}
	.search-suggest{border-top: 2rpx solid #e4e4e4;padding: 30rpx;}
	.search-suggest-head{color:#4574a5;margin-bottom: 74rpx;}
	.search-suggest-item{color:#5d5d5d;margin-bottom: 74rpx;}
	.search-suggest-item text{color: #bdbdbd;margin-right: 28rpx;position: relative;top: 2rpx;}
</style>
