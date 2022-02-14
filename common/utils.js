const install = (Vue, vm) => {
	// 是否登录
	const isLogin = () => {
		// 获取token
		const token = vm.vuex_token
		// 如果没有token
		if(!token){
			// 来自哪个页面
			const currentPage = getCurrentPages().pop()
			// 获取页面路径和请求参数
			const {options, route} = currentPage
			// 参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if(optionsKeys.length !== 0){
				params = optionsKeys.reduce((prev,current) => {
					console.log(prev,current,options[current])
					return `${prev}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}
			
			// 缓存当前页，用于登录或注册后的跳转
			uni.setStorageSync('back_url', route + params)
			
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type:'redirect',
					url:'/pages/auth/login'
				})
			}, 2000)
			return false
		}
		return true
	}
	
	// 其他工具。。。
	// 更新用户信息，更新vuex_user
	const updateUser = async () =>{
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		// 缓存用户信息
		vm.$u.vuex('vuex_user', userInfo)
	}
	
	// 判断是否是安卓
	const isAndroid = () => {
		try {
		    const res = uni.getSystemInfoSync();
			if(res.platform === 'android') return true
			return false
		} catch (e) {
		    // error
		}
	}
	
	vm.$u.utils = {
		isLogin,
		updateUser,
		isAndroid
	}
}
export default {
	install
}