export default definePreset({
	name: 'laravel:inertia',
	options: {
		base: true,
		tailwindcss: true,
		pest: true,
		https: false,
	},
	postInstall: ({ hl }) => [
		`Run the development server with ${hl('npm run dev')}`,
		`Edit your scripts in ${hl('resources/scripts')}`,
		`Edit your pages and components in ${hl('resources/views')}`,
		`Build for production with ${hl('npm run build')}`,
	],
	handler: async(context) => {
		if (context.options.base) {
			await applyNestedPreset({
				title: 'install Vite',
				preset: 'laravel-presets/vite',
				inheritsArguments: true,
			})
		}

		if (context.options.pest) {
			await applyNestedPreset({
				title: 'install Pest',
				preset: 'laravel-presets/pest',
			})
		}

		await installInertia(context.options.tailwindcss)
	},
})

async function installInertia(tailwindcss: boolean) {
	await installPackages({
		title: 'install PHP dependencies',
		for: 'php',
		packages: ['inertiajs/inertia-laravel'],
	})

	await group({
		title: 'install Node dependencies',
		handler: async() => {
			await installPackages({
				for: 'node',
				packages: [
					'vue@next',
					'@vue/compiler-sfc',
					'@vitejs/plugin-vue',
					'@inertiajs/inertia',
					'@inertiajs/inertia-vue3',
				],
				dev: true,
			})

			// This is not actually useful but it cleans up the package.json
			await editFiles({
				files: 'package.json',
				operations: [
					{
						type: 'edit-json',
						replace: (json, omit) => ({
							...json,
							dependencies: {
								...json.dependencies,
								'vue': json.devDependencies.vue,
								'@inertiajs/inertia': json.devDependencies['@inertiajs/inertia'],
								'@inertiajs/inertia-vue3': json.devDependencies['@inertiajs/inertia-vue3'],
							},
							devDependencies: {
								...omit(json.devDependencies, 'vue', '@inertiajs/inertia', '@inertiajs/inertia-vue3'),
							},
						}),
					},
				],
			})
		},
	})

	await group({
		title: 'install Inertia scaffolding',
		handler: async() => {
			await extractTemplates({
				title: 'extract templates',
				from: 'default',
			})

			await deletePaths({
				title: 'remove default view',
				paths: ['resources/views/welcome.blade.php'],
			})

			await editFiles({
				title: 'udpate route file',
				files: 'routes/web.php',
				operations: [{ type: 'update-content', update: (r) => r.replace("view('welcome')", "inertia('welcome')") }],
			})

			await executeCommand({
				title: 'publish Inertia configuration',
				command: 'php',
				arguments: ['artisan', 'vendor:publish', '--provider=Inertia\\ServiceProvider'],
			})

			await executeCommand({
				title: 'publish Inertia middleware',
				command: 'php',
				arguments: ['artisan', 'inertia:middleware'],
			})

			await editFiles({
				title: 'update Inertia middleware',
				files: 'app/Http/Middleware/HandleInertiaRequests.php',
				operations: [
					{
						type: 'add-line',
						position: 'before',
						match: /return parent::version\(\$request\)/,
						lines: [
							'return vite()->getHash();',
						],
					},
					{
						type: 'remove-line',
						match: /return parent::version\(\$request\)/,
					},
					{
						type: 'remove-line',
						match: /array_merge\(parent::share/,
						count: 1,
						start: 1,
					},
					{
						type: 'add-line',
						position: 'after',
						match: /array_merge\(parent::share/,
						indent: '            ',
						lines: [
							"'versions' => [",
							"	'php' => PHP_VERSION,",
							"	'laravel' => \\Illuminate\\Foundation\\Application::VERSION",
							'],',
						],
					},
				],
			})

			await editFiles({
				title: 'register Inertia pages for testing',
				files: 'config/inertia.php',
				operations: [
					{
						type: 'add-line',
						position: 'before',
						match: /resource_path\('js\/Pages'\)/,
						lines: "resource_path('views/pages'),",
					},
					{
						type: 'update-content',
						update: (content) => content // Fixes weird line returns
							.replace(/\n\n/g, '\n')
							.replace(/\/\*/g, '\n    /*'),
					},
				],
			})

			await editFiles({
				title: 'register Inertia middleware',
				files: 'app/Http/Kernel.php',
				operations: [
					{ type: 'add-line', position: 'after', match: /SubstituteBindings::class,/, lines: '\\App\\Http\\Middleware\\HandleInertiaRequests::class,' },
				],
			})

			await editFiles({
				title: 'update Vite config',
				files: 'vite.config.ts',
				operations: [
					{
						type: 'add-line',
						position: 'after',
						match: /vite-plugin-laravel/,
						lines: [
							"import vue from '@vitejs/plugin-vue'",
							"import inertia from './resources/scripts/vite/inertia-layout'",
						],
					},
					{
						type: 'add-line',
						position: 'before',
						match: /laravel\(/,
						lines: [
							'inertia(),',
							'vue(),',
						],
					},
				],
			})

			if (tailwindcss) {
				await editFiles({
					title: 'remove inline CSS',
					files: 'resources/views/layouts/default.vue',
					operations: [
						{ type: 'remove-line', match: /<style>/, start: -1, count: 4 },
					],
				})
			}
		},
	})
}
