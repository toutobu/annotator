import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import the plugin here
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Auth0Plugin } = require('./auth');

// Auth0 configuration
const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
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
