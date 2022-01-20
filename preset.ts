import { applyNestedPreset, definePreset, deletePaths, editFiles, executeCommand, extractTemplates, group, installPackages } from '@preset/core'

export default definePreset({
	name: 'laravel:inertia',
	options: {
		base: true,
		tailwindcss: true,
		pest: true,
	},
	postInstall: ({ hl }) => [
		`Run the development server with ${hl('npm run dev')}`,
		`Edit your scripts in ${hl('resources/scripts')}`,
		`Edit your pages and components in ${hl('resources/views')}`,
		`Build for production with ${hl('npm run build')}`,
	],
	handler: async(context) => {
		if (context.options.base) {
			await installBase()
		}

		if (context.options.tailwindcss) {
			await installTailwind()
		}

		if (context.options.pest) {
			await installPest()
		}
	},
})

async function installBase() {
	await extractTemplates({
		from: 'default',
		title: 'extract templates',
	})

	await deletePaths({
		paths: ['resources/js', 'resources/css', 'resources/views/welcome.blade.php', 'webpack.mix.js'],
		title: 'remove some default files',
	})

	await editFiles({
		files: '.gitignore',
		operations: [{ type: 'add-line', position: 'prepend', lines: '/public/build' }],
		title: 'update .gitignore',
	})

	await editFiles({
		files: ['.env', '.env.example'],
		operations: [{
			type: 'add-line',
			position: 'append',
			lines: [
				'DEV_SERVER_URL=http://localhost:3000',
				'DEV_SERVER_KEY=',
				'DEV_SERVER_CERT=',
			],
		}],
		title: 'update environment files',
	})

	await editFiles({
		files: 'package.json',
		operations: [
			{ type: 'edit-json', delete: ['scripts', 'devDependencies'] },
			{ type: 'edit-json', merge: { scripts: { dev: 'vite', build: 'vite build' } } },
		],
		title: 'update package.json',
	})

	await editFiles({
		files: 'routes/web.php',
		operations: [{ type: 'update-content', update: (r) => r.replace("view('welcome')", "inertia('welcome')") }],
		title: 'udpate route file',
	})

	await group({
		title: 'install front-end dependencies',
		handler: async() => {
			await installPackages({
				for: 'node',
				install: [
					'vue@next',
					'@vue/compiler-sfc',
					'@vitejs/plugin-vue',
					'@inertiajs/inertia',
					'@inertiajs/inertia-vue3',
					'laravel-vite',
					'vite',
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

	await installPackages({
		for: 'php',
		install: ['innocenzi/laravel-vite', 'inertiajs/inertia-laravel'],
		title: 'install php dependencies',
	})

	await executeCommand({
		command: 'php',
		arguments: ['artisan', 'vendor:publish', '--tag=vite-config'],
		title: 'publish Laravel Vite configuration',
	})

	await executeCommand({
		command: 'php',
		arguments: ['artisan', 'vendor:publish', '--provider=Inertia\\ServiceProvider'],
		title: 'publish Inertia configuration',
	})

	await executeCommand({
		command: 'php',
		arguments: ['artisan', 'inertia:middleware'],
		title: 'publish Inertia middleware',
	})

	await editFiles({
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
		title: 'register Inertia pages for testing',
	})

	await editFiles({
		files: 'app/Http/Middleware/HandleInertiaRequests.php',
		operations: [
			{
				type: 'add-line',
				position: 'before',
				match: /return parent::version\(\$request\)/,
				lines: [
					"if (file_exists($manifest = public_path(config('vite.build_path') . '/manifest.json'))) {",
					'    return md5_file($manifest);',
					'}',
					'',
				],
			},
		],
		title: 'register Vite manifest in Inertia version check',
	})

	await executeCommand({
		command: 'php',
		arguments: ['artisan', 'vite:aliases'],
		title: 'generate Vite aliases',
	})

	await editFiles({
		files: 'app/Http/Kernel.php',
		operations: [
			{ type: 'add-line', position: 'after', match: /SubstituteBindings::class,/, lines: '\\App\\Http\\Middleware\\HandleInertiaRequests::class,' },
		],
		title: 'register Inertia middleware',
	})
}

async function installTailwind() {
	await installPackages({
		for: 'node',
		install: ['tailwindcss', 'autoprefixer', 'postcss'],
		dev: true,
		title: 'install Tailwind CSS',
	})

	await extractTemplates({
		from: 'tailwind',
		title: 'extract Tailwind CSS config',
	})

	await editFiles({
		files: 'resources/scripts/main.ts',
		operations: [
			{ type: 'add-line', lines: ["import 'tailwindcss/tailwind.css'"], position: 'prepend' },
		],
		title: 'add Tailwind CSS imports',
	})

	await editFiles({
		files: 'vite.config.ts',
		operations: [
			{ type: 'add-line', lines: ["import tailwindcss from 'tailwindcss'", "import autoprefixer from 'autoprefixer'"], position: 'prepend' },
			{ type: 'add-line', lines: '.withPostCSS([tailwindcss(), autoprefixer()])', match: /withPlugin/, position: 'before' },
		],
		title: 'register PostCSS plugins',
	})

	await editFiles({
		files: 'resources/views/layouts/default.vue',
		operations: [
			{ type: 'remove-line', match: /<style>/, start: -1, count: 4 },
		],
		title: 'remove inline CSS',
	})
}

async function installPest() {
	await applyNestedPreset({
		preset: 'laravel-presets/pest',
		title: 'install Pest PHP',
	})

	await editFiles({
		title: 'disable Vite manifest while testing',
		files: 'tests/CreatesApplication.php',
		operations: [
			{
				type: 'add-line',
				match: /use Illuminate\\Contracts\\Console\\Kernel/,
				lines: 'use Innocenzi\\Vite\\Vite;',
				position: 'after',
			},
			{
				type: 'add-line',
				match: /\$app = require/,
				lines: 'Vite::withoutManifest();\n',
				position: 'before',
			},
		],
	})
}
