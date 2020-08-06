<template>
	<main role="main" class="flex flex-col flex-grow h-full text-white bg-gray-900">
		<header class="px-8 sm:px-0">
			<section class="container flex items-center justify-between h-24 mx-auto">
				<h1 class="text-xl italic font-medium tracking-widest text-pink-300 uppercase">
					Inertia
				</h1>
				<nav>
					<ul class="flex space-x-4">
						<li>
							<inertia-link href="/" class="px-5 py-3 transition-colors duration-150 rounded-md hover:bg-gray-800">
								Home
							</inertia-link>
						</li>
						<li v-if="!authenticated">
							<inertia-link
								href="/login"
								class="px-5 py-3 transition-colors duration-150 bg-pink-600 rounded-md hover:bg-pink-800"
							>
								Login
							</inertia-link>
						</li>
						<li v-else>
							<inertia-link
								href="/logout"
								method="post"
								class="px-5 py-3 transition-colors duration-150 rounded-md hover:bg-gray-800"
							>
								Logout
							</inertia-link>
						</li>
					</ul>
				</nav>
			</section>
		</header>
		<slot />
	</main>
</template>

<script>
export default {
	computed: {
		user() {
			return this.$page.auth?.user;
		},
		authenticated() {
			return Boolean(this.user);
		},
	},
};
</script>
