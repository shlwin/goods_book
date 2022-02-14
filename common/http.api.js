// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let hotSearchUrl = '/ebapi/store_api/hot_search';
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 首页
	let index = (params = {}) => vm.$u.get('/api/index', params);
	
	// 登录
	// 认证相关的
	const authLogin = (params = {}) => vm.$u.post('/api/auth/login',params) //登录
	const authRegister = (params = {}) => vm.$u.post('/api/auth/register',params) //注册
	const authLogout = () => vm.$u.post('/api/auth/logout') //退出登录
	const authOssToken = () => vm.$u.get('/api/auth/oss/token') //获取osstoken
	
	// 用户相关的
	const userInfo = () => vm.$u.get('/api/user') //用户详情
	const userInfoUpdate = (params = {}) => vm.$u.put('/api/user',params) //修改用户信息
	const userAvatar = (params = {}) => vm.$u.patch('/api/user/avatar',params) //修改用户头像
	
	// 订单相关的
	
	// 商品相关的
	const goodsInfo = (id = '') => vm.$u.get(`/api/goods/${id}`) //商品详情
	const goodsCollect = (id = '') => vm.$u.post(`/api/collects/goods/${id}`) //收藏和取消
	const goodsList = (params = {}) => vm.$u.get(`/api/goods`,params) //商品列表
	
	// 收藏相关的
	const collectsCollectionAndCancel = goodsId => vm.$u.post(`/api/collects/goods/${goodsId}`);// 收藏取消
	const collects = (params = {}) => vm.$u.get(`/api/collects`,params);// 我的收藏
	
	// 购物车相关的
	const cartAdd = (params = {}) => vm.$u.post(`/api/carts`,params) //收藏和取消
	const cartList = () => vm.$u.get(`/api/carts`) //购物车数量
	const isCheck = (cart_ids = []) => vm.$u.patch(`/api/carts/checked`,{cart_ids}) //购物车改变选中
	const cartGoods = () => vm.$u.get(`/api/carts?include=goods`) // 购物车列表
	const delCartGoods = cart => vm.$u.delete(`/api/carts/${cart}`) // 删除购物车商品
	const numChange = (cart,num) => vm.$u.put(`/api/carts/${cart}`,{num}) //购物车数量改变
	
	// 地址相关的
	const addressList = () => vm.$u.get(`/api/address`) // 地址列表
	const addressAdd = (params = {}) => vm.$u.post(`/api/address`,params) // 新增地址
	const addressDetail = id => vm.$u.get(`/api/address/${id}`) // 地址详情
	const addressEdit = (id,params) => vm.$u.put(`/api/address/${id}`,params) // 修改地址
	const addressDefault = id => vm.$u.patch(`/api/address/${id}/default`);// 设置默认地址
	const addressDel = id => vm.$u.delete(`/api/address/${id}`);// 删除地址
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		index,
		authLogin,
		authRegister,
		userInfo,
		userInfoUpdate,
		authLogout,
		authOssToken,
		userAvatar,
		goodsInfo,
		goodsCollect,
		goodsList,
		cartAdd,
		cartList,
		isCheck,
		cartGoods,
		delCartGoods,
		numChange,
		addressList,
		addressAdd,
		addressDetail,
		addressEdit,
		addressDefault,
		addressDel,
		collectsCollectionAndCancel,
		collects
	};
}

export default {
	install
}