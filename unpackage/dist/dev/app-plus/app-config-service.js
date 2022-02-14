
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/center/index","pages/cart/cart","pages/goods/goods","pages/auth/login","pages/auth/register","pages/center/baseInfo","pages/goods/show","pages/center/order","pages/center/collection","pages/center/address","pages/center/addAddress"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"图书商城","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#909399","selectedColor":"#d81e06","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/icon/home.png","selectedIconPath":"static/icon/home-h.png","text":"首页"},{"pagePath":"pages/goods/goods","iconPath":"static/icon/goods.png","selectedIconPath":"static/icon/goods-h.png","text":"商品"},{"pagePath":"pages/cart/cart","iconPath":"static/icon/shop.png","selectedIconPath":"static/icon/shop-h.png","text":"购物车"},{"pagePath":"pages/center/index","iconPath":"static/icon/center.png","selectedIconPath":"static/icon/center-h.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"图书商城","compilerVersion":"3.3.10","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/center/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","enablePullDownRefresh":false}},{"path":"/pages/goods/goods","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商品分类","enablePullDownRefresh":false}},{"path":"/pages/auth/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/auth/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/center/baseInfo","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/goods/show","meta":{},"window":{"navigationBarTitleText":"订单详情","enablePullDownRefresh":false}},{"path":"/pages/center/order","meta":{},"window":{"navigationBarTitleText":"订单列表","enablePullDownRefresh":false}},{"path":"/pages/center/collection","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":false}},{"path":"/pages/center/address","meta":{},"window":{"navigationBarTitleText":"地址列表","enablePullDownRefresh":false}},{"path":"/pages/center/addAddress","meta":{},"window":{"navigationBarTitleText":"添加地址","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
