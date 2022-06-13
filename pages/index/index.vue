<template>
	<view class="content">
		<view class="row" style="height: 44px;justify-content: flex-start;border-bottom: 1px solid #888;">
			<view :class="newsType=='news.center.domestic'?'mainColor-Blue':'black'"
				style="width: 50%;text-align: center;border-right: 1px solid #888888;" @click="()=>{
				newsType='news.center.domestic'
			}">
				国内新闻
			</view>
			<view :class="newsType=='news.center.world'?'mainColor-Blue':'black'" style="width: 50%;text-align: center;"
				@click="()=>{
				newsType='news.center.world'
			}">
				国际新闻
			</view>
		</view>
		<uni-list style="background-color: transparent;">
			<uni-list-item v-for="(item,index) in listData" :key="index"
			 :showArrow="false" clickable @click="didSelectCell(item)">
				<template slot="header">
					<div :style="'background-image: url('+item.imageUrl+');'" class="newImage"></div>
				</template>
				<template slot="body">
					<!-- <view class="row mt-2" style="justify-content: flex-start;"> -->
						<view class="column ml-2 cellContent" style="align-items: flex-start;">
							<text class="text-normal-size">{{item.title}}</text>
							<text class="text-small-size" style="color: #838D94;">{{item.summary}}</text>
						</view>
					<!-- </view> -->
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		getNewsList
	} from '@/network/api/api.js'
	export default {
		data() {
			return {
				title: 'Hello',
				newsType: 'news.center.domestic',
				page: 1,
				total:0,
				listData:[],
			}
		},
		onLoad() {
			this.getNewsList()
		},
		watch: {
			newsType() {
				this.getNewsList();
			}
		},
		onReachBottom() {
			if (this.listData.length < this.total) {
				this.page++
				this.getWarnningList()
			}
		},
		methods: {
			getNewsList() {
				getNewsList({
					cateCode: this.newsType,
					pageNo: this.page,
					pageSize: 10
				}).then(res => {
					if (res.data.success == true) {
						if (this.page == 1) {
							this.total = res.data.data.total
							this.listData = res.data.data.records
						}else {
							this.listData.push(...res.data.data.records)
						}
						
					}
				})
			},
			changeListType(value) {
				if (value["currentIndex"] == 1) {
					this.newsType = 'news.center.world'
				} else {
					this.newsType = 'news.center.domestic'
				}
			},
			didSelectCell(item) {
				uni.navigateTo({
					url:'./detail?id='+item.id,
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.newImage {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-clip: content-box;
		width: 80px;
		height: 80px;
		line-height: 90px;
	}
	.cellContent {
		width: calc(100%);
	}
</style>
