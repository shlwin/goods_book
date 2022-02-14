<template>
	<view>
		<navigator class="goods-item" :url="'../../pages/goods/show?id=' + goods.id">
			<u-image class="u-skeleton-fillet" :src="goods.cover_url" width="100%" height="300rpx"></u-image>
			<view class="title u-line-1 u-skeleton-rect">{{goods.title ? goods.title : '商品名称'}}</view>
			<view class="u-flex u-row-between">
				<view class="price u-skeleton-rect">￥ {{goods.price}}</view>
				<view class="sals u-skeleton-rect">销量：{{goods.sales}}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		padding: 40rpx;
		margin-top: 30rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0,0,0,.1);
		.title{
			width: 100%;
			margin: 20rpx 0;
			font-weight: 500;
			font-size: 32rpx;
		}
		.price{
			width: 40%;
			color: #f00;
		}
		.sals{
			width: 40%;
			color: #888;
		}
	}
</style>
