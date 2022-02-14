<template>
	<view>
		<view style="text-align: center;">
			<img :src="goodsInfo.cover_url" height="220" alt="">
		</view>
		<view class="top2" style="margin-top: -10px;">
			<view class="title u-line-2">
				{{goodsInfo.title}}
			</view>
			<view class="des">
				<view class="price">￥{{goodsInfo.price}}</view>
				<view class="sales">销量 {{goodsInfo.sales}}</view>
			</view>
		</view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		
		<view v-if="current == 0">
			<view class="info u-p-b-80">
				<u-parse :html="goodsInfo.details"></u-parse>
			</view>
		</view>
		
		<view v-if="current == 1">
			<view class="comment" v-for="(res,index) in commentList" :key="res.id">
				<view class="left">
					<image :src="res.user.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{res.user.name}}</view>
					</view>
					<view class="content">{{res.content}}</view>
					<view class="bottom">
						{{res.created_at}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="u-p-b-80" v-if="current == 2">
			<u-row gutter="16">
				<u-col v-for="goods in goodsList" span="6">
					<goods-card :goods="goods"></goods-card>
				</u-col>
			</u-row>
		</view>
		
		<view class="navigation" style="position: fixed;bottom: 0;width: 100%;display: flex;justify-content: space-between;align-items: center;">
			<view class="left">
				<view class="item" @click="collect">
					<template v-if="isCollect == 0">
						<u-icon name="star" :size="40" color="black"></u-icon>
						<view class="text u-line-1">收藏</view>
					</template>
					<template v-else>
						<u-icon name="star" :size="40" color="red"></u-icon>
						<view class="text u-line-1" style="color: red;">已收藏</view>
					</template>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					name:'商品详情'
				},{
					name:'商品评论',
					count:0
				},{
					name:'推荐商品'
				}],
				goodsInfo: {
					title:'',
					sales: 0,
					price: 0
				},
				goodsId: null,
				goodsList: [],
				commentList: [],
				current: 0,
				isCollect:0,
				cartCount: 0
			}
		},
		onLoad(options) {
			this.goodsId = options.id
			this.getData()
			this.getCartCount()
		},
		methods: {
			async getData(){
				const res = await this.$u.api.goodsInfo(this.goodsId)
				this.commentList = res.goods.comments
				this.goodsInfo = res.goods
				this.goodsList = res.like_goods
				this.list[1].count = res.goods.comments.length
				this.isCollect = res.goods.is_collect
			},
			change(index){
				this.current = index
			},
			// 点赞
			getLike(index){
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if(this.commentList[index].isLike == true){
					this.commentList[index].likeNum++
				}else{
					this.commentList[index].likeNum--
				}
			},
			// 搜藏商品
			async collect(){
				// 请求收藏api
				await this.$u.api.goodsCollect(this.goodsId)
				
				// 收藏成功之后，提示消息，并改变按钮状态
				if(this.isCollect === 0){
					this.$u.toast('收藏成功')
					this.isCollect = 1
				}else{
					this.$u.toast('取消收藏')
					this.isCollect = 0
				}
				
			},
			//加入购物车
			async addCart(){
				const params = {goods_id: this.goodsId}
				await this.$u.api.cartAdd(params)
				// 提示消息
				this.$u.toast('添加成功')
				// 重新获取购物车数量
				this.getCartCount()
			},
			// 获取购物车数量
			async getCartCount(){
				const token = this.vuex_token
				if(token){
					const res = await this.$u.api.cartList()
					this.cartCount = res.data.length
				}
			},
			// 跳转到购物车
			toCart(){
				this.$u.route({
					type:'switchTab',
					url:'/pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top2{
		margin: 40rpx 0;
		padding: 30rpx 40rpx;
		background: white;
		margin-bottom: 0;
	}
	.navigation {
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		.left {
			display: flex;
			font-size: 20rpx;
			.item {
				margin: 0 30rpx;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
