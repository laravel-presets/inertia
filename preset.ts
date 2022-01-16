import { definePreset, deletePath, editFiles, executeCommand, extractTemplates, installPackages } from '@preset/core'

export default definePreset({
	name: 'laravel:inertia',
	postInstall: ({ hl }) => [
		`Run the development server with ${hl('npm run dev')}`,
		`Edit your scripts in ${hl('resources/scripts')}`,
		`Edit your pages and components in ${hl('resources/views')}`,
		`Build for production with ${hl('bpm run build')}`,
	],
	handler: async() => {
		await extractTemplates({
			from: 'default',
			title: 'extract templates',
		})

		await deletePath({
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
					'VITE_DEV_SERVER_URL=http://localhost:3000',
					'VITE_DEV_KEY=',
					'VITE_DEV_CERT=',
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
			title: 'install front-end dependencies',
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
			arguments: ['artisan', 'inertia:middleware'],
			title: 'publish Inertia middleware',
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
	},
})
