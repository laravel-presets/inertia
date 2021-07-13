import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import 'tailwindcss/tailwind.css'

function withVite(pages: Record<string, any>, name: string) {
	for (const path in pages) {
		if (path.endsWith(`${name.replace('.', '/')}.vue`)) {
			return typeof pages[path] === 'function' 
				? pages[path]()
				: pages[path]
		}
	}

	throw new Error('Page not found: ' + name)
}

createInertiaApp({
	resolve: (name) => withVite(import.meta.glob('../views/pages/**/*.vue'), name),
	setup({ el, app, props, plugin }) {
		createApp({ render: () => h(app, props) })
			.use(plugin)
			.mount(el)
	},
})
