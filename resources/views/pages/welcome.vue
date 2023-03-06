<script setup lang="ts">
import LaravelLogo from '@/views/components/laravel-logo.vue'
import InertiaLogo from '@/views/components/inertia-logo.vue'
import ResourceBlock from '@/views/components/resource-block.vue'

defineProps<{
	versions: {
		php: string
		laravel: string
	}
}>()
</script>

<template layout>
	<div class="relative flex items-top justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900 sm:items-center py-4 sm:pt-0">
		<div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
			<div class="flex justify-center items-center pt-8 space-x-12 sm:pt-0">
				<LaravelLogo class="h-20 w-auto text-[#EF3B2D]" />
				<InertiaLogo class="h-11 w-auto text-[#826ded]" />
			</div>

			<div class="mt-8 bg-white dark:bg-zinc-800 overflow-hidden shadow sm:rounded-lg">
				<div class="grid grid-cols-1 md:grid-cols-2">
					<ResourceBlock
						name="Documentation"
						description="Laravel has wonderful, thorough documentation covering every aspect of the framework. Whether you are new to the framework or have previous experience with Laravel, we recommend reading all of the documentation from beginning to end."
					/>

					<ResourceBlock
						class="p-6 border-t border-zinc-200 dark:border-zinc-700 md:border-t-0 md:border-l"
						name="Laracasts"
						description="Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process."
					/>

					<ResourceBlock
						class="p-6 border-t border-zinc-200 dark:border-zinc-700"
						name="Laravel News"
						description="Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials."
					/>

					<ResourceBlock
						class="p-6 border-t border-zinc-200 dark:border-zinc-700 md:border-l"
						name="Vibrant Ecosystem"
					>
						Laravel's robust library of first-party tools and libraries, such as <a href="https://forge.laravel.com" class="underline">Forge</a>, <a href="https://vapor.laravel.com" class="underline">Vapor</a>, <a href="https://nova.laravel.com" class="underline">Nova</a>, and <a href="https://envoyer.io" class="underline">Envoyer</a> help you take your projects to the next level. Pair them with powerful open source libraries like <a href="https://laravel.com/docs/billing" class="underline">Cashier</a>, <a href="https://laravel.com/docs/dusk" class="underline">Dusk</a>, <a href="https://laravel.com/docs/broadcasting" class="underline">Echo</a>, <a href="https://laravel.com/docs/horizon" class="underline">Horizon</a>, <a href="https://laravel.com/docs/sanctum" class="underline">Sanctum</a>, <a href="https://laravel.com/docs/telescope" class="underline">Telescope</a>, and more.
					</ResourceBlock>
				</div>
			</div>

			<div class="flex justify-center mt-4 sm:items-center sm:justify-between">
				<div class="text-center text-sm text-zinc-500 sm:text-left">
					<div class="flex items-center">
						<svg
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="-mt-px w-5 h-5 text-zinc-400"
						>
							<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>

						<a href="https://laravel.bigcartel.com" class="ml-1 underline">
							Shop
						</a>

						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							class="ml-4 -mt-px w-5 h-5 text-zinc-400"
						>
							<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>

						<a href="https://github.com/sponsors/taylorotwell" class="ml-1 underline">
							Sponsor
						</a>
					</div>
				</div>

				<div class="text-center text-sm text-zinc-500 sm:text-left space-x-2">
					<span>Laravel v{{ versions.laravel }}</span>
					<span>(PHP {{ versions.php }})</span>
				</div>
			</div>
		</div>
	</div>
</template>
