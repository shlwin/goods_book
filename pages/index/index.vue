<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="slides" name="img_url" border-radius="20" height="330" class="u-p-l-10 u-p-r-10"></u-swiper>
		<!-- tabs栏 -->
		<view class="u-text-center u-m-t-30">
			<u-tabs :list="sortList" bar-width="100" item-width="160" @change="changeSort" :current="currentSort"></u-tabs>
		</view>
		<!-- 宫格 -->
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="goods in goodsList">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList:[
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'},
				],
				currentSort:0,
				slides:[],
				goodsList:[{},{},{},{}],
				page:1,
				loading:false
			}
		},
		onLoad() {
			// this.$u.utils.isLogin()
			this.getData()
		},
		methods: {
			// 改变tabs
			changeSort(index){
				this.currentSort = index 
				// 重置商品数据和分页
				this.goodsList = [{},{},{},{}]
				this.page = 1
				this.getData()
			},
			async getData(){
				// 显示骨架屏
				this.loading = true
				// 接口参数
				const params = {
					page:this.page,
				}
				// 热销tabs选项
				if(this.currentSort == 1) params.sales = 1
				// 推荐tabs选项
				if(this.currentSort == 2) params.recommend = 1
				// 最新tabs选项
				if(this.currentSort == 3) params.new = 1
				// 请求首页数据接口
				const res = await this.$u.api.index(params)
				// 隐藏骨架屏
				this.loading = false
				// 轮播图数据
				this.slides = res.slides
				// 首页商品数据
				this.goodsList = this.goodsList.pop().title ? [...this.goodsList, ...res.goods.data] : res.goods.data
				console.log(this.goodsList)
			}
		},
		// 触底事件
		onReachBottom() {
			// 重新请求数据，带上分页数据
			this.page = this.page + 1
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
