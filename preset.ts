import { color, Preset } from 'use-preset';

Preset.setName('Inertia for Laravel');
Preset.option('auth', true);

// Installs the Tailwind preset
Preset.apply('laravel-presets/tailwindcss')
	.with(['--no-interaction', '--no-install'])
	.withTitle(`Installing ${color.magenta('Tailwind CSS')}...`);

// Deletes unused resources
Preset.delete(['resources/js', 'resources/views']).withoutTitle();

// Extracts templates
Preset.extract('default').withTitle(`Extracting default scaffolding...`);
// Preset.extract('auth').ifHasOption('auth').withTitle(`Extracting authentication scaffolding...`);

// Updates the Mix file to use TypeScript
Preset.group((preset) => {
	// Updates Mix
	preset
		.edit('webpack.mix.js')
		.update((content) => content.replace(/\.js/g, '.ts').replace('/js', '/scripts'))
		.addAfter('postCss', [
			'.vue()',
			'.alias({',
			'  vue$: `${__dirname}/node_modules/vue/dist/vue.esm-bundler.js`,',
			"  '@': `${__dirname}/resources/views`,",
			"  '@scripts': `${__dirname}/resources/scripts`",
			`})`,
			'.webpackConfig(({ DefinePlugin }) => ({',
			'		plugins: [',
			'				new DefinePlugin({',
			"						__VUE_OPTIONS_API__: 'true',",
			"						__VUE_PROD_DEVTOOLS__: 'false',",
			'				}),',
			'		],',
			'}))',
		]);

	// Updates routes
	preset
		.edit('routes/web.php')
		.update((content) => content.replace('view', 'inertia').replace('welcome', 'Welcome'))
		.withTitle('Updating routes...');
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
		.add('inertiajs/inertia-laravel', '^0.3.3');
}).withTitle('Updating dependencies...');

// Installs dependencies
Preset.installDependencies('node').ifUserApproves().withoutTitle();
Preset.installDependencies('php').ifUserApproves().withoutTitle();

// Displays instructions
Preset.instruct([`Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`]);
