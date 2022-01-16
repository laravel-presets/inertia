import { defineConfig } from 'laravel-vite'
import vue from '@vitejs/plugin-vue'
import inertiaLayout from './resources/scripts/inertia/layout'

export default defineConfig()
	.withPlugin(inertiaLayout)
	.withPlugin(vue)
	// .withCertificates()
