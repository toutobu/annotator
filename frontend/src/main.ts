import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import the Auth0 configuration
import { domain, clientId } from '../auth_config.json';

// Import the plugin here
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Auth0Plugin } = require('./auth');

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRedirectCallback: (appState: any) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
