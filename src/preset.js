const { Preset } = require('use-preset');

// prettier-ignore
module.exports = Preset.make('Laravel Inertia')
	.apply('use-preset/laravel-tailwindcss')
		.title('Install Tailwind CSS from its preset')
		.with('--no-interaction')
		.chain()

	.editJson('package.json')
		.title('Add Node dependencies')
		.merge({
			'@babel/plugin-syntax-dynamic-import': '^7.2.0',
			'@inertiajs/inertia': '^0.1',
			'@inertiajs/inertia-vue': '^0.1',
			'vue-template-compiler': '^2.6.10',
			'vue-meta': '^2.3.1',
			vue: '^2.5.17',
		})
		.chain()

	.editJson('composer.json')
		.merge({
			require: {
				'inertiajs/inertia-laravel': '^0.2'
			}
		})
		.chain()

	.edit('config/app.php')
		.search(/App\\Providers\\RouteServiceProvider::class,/)
			.addAfter('App\\Providers\\InertiaServiceProvider::class,')
			.end()
		.chain()
