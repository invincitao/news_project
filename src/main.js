import Vue from 'vue'
import App from './App.vue'
// 引入样式
import './styles/reset.css'
// 引入路由
import router from './router/index';

import { Toast, Dialog, Icon, Uploader, Field, ActionSheet, Tab, Tabs, List, PullRefresh, SwipeCell, Button } from 'vant';
// 挂载到全局
Vue.use(Toast).use(Dialog).use(Icon)
  .use(Uploader).use(Field).use(ActionSheet).use(Tab).use(Tabs).
  use(List).use(PullRefresh).use(SwipeCell).use(Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
