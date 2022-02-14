<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" :class="{avatarBody: isAndroid}">
			<view class="u-m-r-10 avatar-body">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1" :class="{nameBody: isAndroid}">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱：{{vuex_user.email}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<!-- <u-icon name="scan" color="#969799" size="28"></u-icon> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息"  @click="toBaseInfo"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="所有订单" @click="toOrder"></u-cell-item>
				<u-cell-item icon="star" title="商品收藏" @click="toCollection"></u-cell-item>
				<u-cell-item icon="map" title="收货地址" @click="toAddress"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="退出登录" @click="loginOut"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				isAndroid:false
			}
		},
		onLoad() {
			// 如果没登陆，跳转到登录页面
			if(!this.$u.utils.isLogin()) return 
			if(this.$u.utils.isAndroid()) {
				this.isAndroid = true
			}
		},
		methods: {
			toBaseInfo(){
				this.$u.route({
					url:'pages/center/baseInfo'
				})
			},
			// 跳转到收藏页面
			toCollection(){
				this.$u.route({
					url:'pages/center/collection'
				})
			},
			// 跳转到所有订单页面
			toOrder(){
				this.$u.route({
					url:'pages/center/order'
				})
			},
			// 跳转到收货地址页面
			toAddress(){
				this.$u.route({
					url:'pages/center/address'
				})
			},
			// 退出登录
			async loginOut(){
				// 请求API，退出登录
				await this.$u.api.authLogout()
				
				// 提示信息
				this.$u.toast('退出成功')
				
				setTimeout(()=>{
					// 清除缓存的token和用户信息
					this.$u.vuex("vuex_token", null)
					this.$u.vuex("vuex_user", {})
					
					// 跳转到首页
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/index/index'
					})
				},1500)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}

	.camera{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		background-color: #fff;
	}
	.avatar-body{
		width: 70px;
		height: 70px;
	}
	.avatarBody{
		padding: 30rpx 30rpx 60rpx !important;
	}
	.nameBody{
		margin-left: 50rpx;
		margin-top: 30rpx;
	}
</style>

