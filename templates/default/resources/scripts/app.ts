import '@scripts/bootstrap';
import { createApp, h } from 'vue';
import type { Inertia, Page } from '@inertiajs/inertia';
import { app, plugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$route: typeof route;
		$inertia: Inertia;
		$page: Page<CustomPageProps<unknown>>;
	}
}

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
			resolveComponent: (name: string) =>
				import(`../views/pages/${name}`).then((module) => module.default),
		}),
})
	.mixin({ methods: { $route: route } })
	.use(plugin)
	.mount(root);
