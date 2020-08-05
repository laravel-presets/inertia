import Vue from 'vue';
import VueMeta from 'vue-meta';
import { InertiaApp } from '@inertiajs/inertia-vue';

Vue.config.productionTip = false;
Vue.use(InertiaApp);
Vue.use(VueMeta);

const app = document.getElementById('app');

new Vue({
	metaInfo: {
		titleTemplate: (title) => (title ? `${title} - Inertia` : 'Inertia'),
	},
	render: (h) =>
		h(InertiaApp, {
			props: {
				initialPage: JSON.parse(app.dataset.page),
				resolveComponent: (name) => require(`@/pages/${name}`).default,
				// resolveComponent: (name) => import(`@/pages/${name}`).then((module) => module.default),
			},
		}),
}).$mount(app);
