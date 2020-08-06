<template>
	<div class="flex flex-col items-center justify-center h-full">
		<h1 class="mb-0 text-6xl font-thin text-gray-200">Inertia</h1>
		<div class="flex items-center text-xl font-medium italic uppercase tracking-widest text-pink-300">
			<span>The Modern Monolith</span>
			<svg class="w-8 h-8 ml-2" viewBox="0 0 24 24">
				<path
					class="uim-primary"
					d="M7.75 16a1 1 0 0 1-.707-1.707L9.336 12L7.043 9.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3A.997.997 0 0 1 7.75 16zm5.5 0a1 1 0 0 1-.707-1.707L14.836 12l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a.997.997 0 0 1-.707.293z"
					fill="currentColor"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import Layout from '@/layouts/Default.vue';

export default {
	layout: Layout,

	metaInfo: {
		title: 'Home',
	},
};
</script>
