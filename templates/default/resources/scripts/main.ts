import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { withVite } from '@/scripts/inertia/with-vite'

createInertiaApp({
	resolve: (name) => withVite(import.meta.glob('../views/pages/**/*.vue'), name),
	setup({ el, app, props, plugin }) {
		createApp({ render: () => h(app, props) })
			.use(plugin)
			.mount(el)
	},
})
