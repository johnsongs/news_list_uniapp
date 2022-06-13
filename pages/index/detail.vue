<template>
	<view class="content">
		<view class="text-title-size pa-2" style="text-align: center;justify-content: flex-start;font-weight: bold;">
			{{detail.title}}
		</view>
		<view class="pl-2 text-normal-size">
			<span>{{detail.createdAt}}</span>
			<span class="ml-3">{{detail.createdBy}}</span>
		</view>
		<view class="divider mt-5"></view>
		<!-- <view> -->
		<!-- <rich-text :nodes="detail.htmlNodes"/> -->
		<u-parse class="pa-2" :content="detail.content"></u-parse>
		<!-- </view> -->

	</view>
</template>

<script>
	import {
		getNewsDetail
	} from '@/network/api/api.js'
	import htmlParser from '@/util/html-parser.js'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(option) {
			this.getNewsDetail(option.id)
		},
		methods: {
			getNewsDetail(id) {
				getNewsDetail(id).then(res => {
					if (res.data.success) {
						var tmpDetail = res.data.data
						tmpDetail.htmlNodes = htmlParser(tmpDetail.content);
						this.detail = tmpDetail
					}
				})
				
			},

		}
	}
</script>

<style scoped lang="scss">

</style>
