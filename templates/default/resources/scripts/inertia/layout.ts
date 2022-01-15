import { Plugin } from 'vite'

const PLUGIN_NAME = 'vite:inertia:layout'
const TEMPLATE_LAYOUT_REGEX = /<template +layout(?: *= *['"](?:(?:(\w+):)?(\w+))['"] *)?>/

export default (layouts: string = '@/views/layouts/'): Plugin => ({
	name: PLUGIN_NAME,
	transform: (code: string) => {
		if (!TEMPLATE_LAYOUT_REGEX.test(code)) {
			return
		}

		const isTypeScript = /lang=['"]ts['"]/.test(code)

		return code.replace(TEMPLATE_LAYOUT_REGEX, (_, layoutName) => `
			<script${isTypeScript ? ' lang="ts"' : ''}>
			import layout from '${layouts}${layoutName}.vue'
			export default { layout }
			</script>
			<template>
		`)
	},
})
