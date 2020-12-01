import { color, Preset } from 'use-preset';

Preset.setName('Inertia for Laravel');
Preset.option('auth', true);

// Installs the Tailwind preset
// Preset.apply('laravel-presets/tailwindcss')
// 	.with(['--no-interaction'])
// 	.withTitle(`Installing ${color.magenta('Tailwind CSS')}...`);

// Deletes unused resources
Preset.delete(['resources/js', 'resources/views']).withoutTitle();

// Extracts templates
Preset.extract('default').withTitle(`Extracting default scaffolding...`);
// Preset.extract('auth').ifHasOption('auth').withTitle(`Extracting authentication scaffolding...`);

// Updates the Mix file to use TypeScript
Preset.group((preset) => {
	// Updates .gitignore
	preset
		.edit('.gitignore')
		.addAfter('yarn-error.log', [
			'public/js',
			'public/css',
			'resources/scripts/generated',
			'temp/',
		]);

	// Updates Mix
	const mixConfig = preset.edit('webpack.mix.js');

	mixConfig.addAfter('laravel-mix', "const { exec } = require('child_process');");

	mixConfig.addBefore('mix.ts', [
		"mix.extend('ziggy', {",
		'	boot() {',
		"		const command = () => exec('php artisan ziggy:generate resources/scripts/generated/ziggy.js');",
		'',
		'		command();',
		'',
		'		if(Mix.isWatching()) {',
		"			require('chokidar').watch('routes/**/*.php')",
		"				.on('change', command);",
		'		}',
		'	}',
		'});',
		'',
	]);

	mixConfig
		.update((content) => content.replace(/\.js/g, '.ts').replace('/js', '/scripts'))
		.addAfter('mix.ts', [
			'.vue()',
			'.alias({',
			'  vue$: `${__dirname}/node_modules/vue/dist/vue.esm-bundler.js`,',
			'  ziggy: `${__dirname}/vendor/tightenco/ziggy/dist`,',
			"  '@': `${__dirname}/resources/views`,",
			"  '@scripts': `${__dirname}/resources/scripts`",
			`})`,
			'.webpackConfig(({ DefinePlugin }) => ({',
			'		output: {',
			'				chunkFilename: `js/chunks/[name].js?id=[chunkhash]`',
			'		},',
			'		plugins: [',
			'				new DefinePlugin({',
			"						__VUE_OPTIONS_API__: 'true',",
			"						__VUE_PROD_DEVTOOLS__: 'false',",
			'				}),',
			'		],',
			'}))',
			'.version()',
			'.sourceMaps(false)',
			'.ziggy()',
		])
		.withIndent(4);

	// Updates routes
	preset
		.edit('routes/web.php')
		.update((content) => content.replace('view', 'inertia').replace('welcome', 'Welcome'))
		.withTitle('Updating routes...');

	// Add the inertia middleware to the Laravel Kernel
	preset
		.edit('app/Http/Kernel.php')
		.addBefore("'api' =>", '	\\App\\Http\\Middleware\\HandleInertiaRequests::class,')
		.skipLines(2)
		.withIndent(9);
}).withTitle(`Updating the ${color.magenta('Mix')} and ${color.magenta('routes')}...`);

// Adds dependencies
Preset.group((preset) => {
	preset
		.editNodePackages()
		.add('@inertiajs/inertia', '^0.5')
		.add('@inertiajs/progress', '^0.2.2')
		.add('@inertiajs/inertia-vue3', '^0.2.2')
		.add('vue', '^3.0.2')
		.addDev('@vue/compiler-sfc', '^3.0.2')
		.addDev('vue-loader', '^16.0.0-beta.9')
		.addDev('ts-loader', '^8.0')
		.addDev('typescript', '^4.1')
		.addDev('@types/webpack-env', '^1.16.0');

	// Adds PHP dependencies
	preset
		.editPhpPackages() //
		.add('inertiajs/inertia-laravel', '^0.3.3')
		.add('tightenco/ziggy', '^1.0.3');
}).withTitle('Updating dependencies...');

// Installs dependencies
Preset.installDependencies('node').ifUserApproves().withoutTitle();
Preset.installDependencies('php').ifUserApproves().withoutTitle();

// Displays instructions
Preset.instruct([`Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`]);
