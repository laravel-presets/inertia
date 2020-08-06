<template>
	<div class="flex flex-col items-center justify-center h-full px-8 sm:px-0">
		<form
			class="flex flex-col w-full max-w-md overflow-hidden text-black bg-white rounded-md shadow-md"
			@submit.prevent="submit"
		>
			<div class="px-8 py-10">
				<h1 class="text-3xl font-bold text-center text-gray-700">
					Welcome back
				</h1>
			</div>

			<div class="flex flex-col px-8 mb-6">
				<label for="email" class="mb-2 font-medium text-gray-600">Email</label>
				<input
					type="email"
					id="email"
					v-model="form.email"
					autocomplete="email"
					class="px-2 py-2 border border-gray-200 rounded-md focus:shadow-outline focus:outline-none"
				/>
				<small class="mt-2 text-red-600" v-if="emailError" v-html="emailError" />
			</div>

			<div class="flex flex-col px-8 mb-8">
				<label for="password" class="mb-2 font-medium text-gray-600">Password</label>
				<input
					type="password"
					id="password"
					v-model="form.password"
					autocomplete="current-password"
					class="px-2 py-2 border border-gray-200 rounded-md focus:shadow-outline focus:outline-none"
				/>
				<small class="mt-2 text-red-600" v-if="passwordError" v-html="passwordError" />
			</div>

			<div class="flex items-center justify-between px-8 py-4 bg-gray-100 border border-gray-200 border-t-1">
				<label for="remember" class="flex items-center select-none">
					<input id="remember" v-model="form.remember" type="checkbox" class="mr-1" />
					<span class="text-sm">Remember Me</span>
				</label>

				<button
					class="px-6 py-2 text-white transition-colors duration-150 rounded-md focus:shadow-outline focus:outline-none"
					:class="{
						'cursor-not-allowed bg-pink-400': sending,
						'bg-pink-500': !sending,
					}"
					:disabled="sending"
					type="submit"
				>
					Login
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import Layout from '@/layouts/Default.vue';

export default {
	layout: Layout,

	metaInfo: {
		title: 'Login',
	},

	props: {
		errors: Object,
	},

	data: () => ({
		sending: false,
		form: {
			email: '',
			password: '',
			remember: null,
		},
	}),

	computed: {
		emailError() {
			return this.$page.errors?.email?.shift();
		},
		passwordError() {
			return this.$page.errors?.password?.shift();
		},
	},

	methods: {
		submit() {
			this.sending = true;
			this.$inertia
				.post('/login', {
					email: this.form.email,
					password: this.form.password,
					remember: this.form.remember,
				})
				.then(() => (this.sending = false));
		},
	},
};
</script>
