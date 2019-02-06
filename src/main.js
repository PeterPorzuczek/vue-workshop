import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'

import App from '/src/App.vue'
import asCurrency from "/src/filters/asCurrency";
import styleWhenBroken from "/src/directives/styleWhenBroken";
import notifyMixin from "/src/mixins/notifyMixin";

Vue.config.productionTip = false

Vue.filter("asCurrency", asCurrency)

Vue.directive('style-when-broken', styleWhenBroken)

Vue.mixin(notifyMixin)

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Vuex)

sync(store, router)

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app')
