const { Preset } = require('use-preset');

// prettier-ignore
module.exports = Preset.make('Laravel Inertia')
	.apply('use-preset/laravel-tailwindcss')
		.title('Install Tailwind CSS from its preset')
		.with('--no-interaction')
		.chain();
