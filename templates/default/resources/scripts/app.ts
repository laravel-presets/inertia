import { createApp, h } from 'vue';
import { app, plugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init({
	delay: 250,
	color: '#29d',
	includeCSS: true,
	showSpinner: false,
});

const root = document.getElementById('app')!;

createApp({
	render: () =>
		h(app, {
			initialPage: JSON.parse(root.dataset.page!),
			resolveComponent: (name: string) => require(`../views/pages/${name}`).default,
		}),
})
	.use(plugin)
	.mount(root);
