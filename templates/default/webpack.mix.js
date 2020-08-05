const mix = require('laravel-mix');
const { plugins } = require('./postcss.config');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
	.js('resources/js/app.js', 'public/build')
	.postCss('resources/css/app.css', 'public/build', plugins)
	.webpackConfig({
		output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
		resolve: {
			alias: {
				vue$: 'vue/dist/vue.runtime.esm.js',
				'@': path.resolve('resources/js'),
			},
		},
	})
	.sourceMaps();

if (mix.inProduction()) {
	mix.version();
}
