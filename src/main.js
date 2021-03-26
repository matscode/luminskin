import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { apolloClientFactory, createProvider } from './vue-apollo';
import helpers from './libs/helpers';

Vue.config.productionTip = false;

// register helpers as instance property
Vue.prototype.$helpers = helpers;

new Vue({
  router,
  store,
  apolloProvider: createProvider(apolloClientFactory()),
  render: (h) => h(App),
}).$mount('#app');
