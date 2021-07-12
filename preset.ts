import { color, Preset } from 'apply';

Preset.setName('Inertia for Laravel');

// Installs the Tailwind preset
Preset.apply('laravel-presets/tailwindcss')
	.with(['--no-interaction', '--no-install'])
	.withTitle(`Installing ${color.magenta('Tailwind CSS')}...`);
	
// Installs the Vite preset
Preset.apply('laravel-presets/vite')
	.with(['--no-interaction', '--no-install'])
	.withTitle(`Installing ${color.magenta('Vite')}...`);

// Deletes unused resources
Preset.delete('resources/css').withoutTitle();

// Extracts templates
Preset.extract('default').withTitle(`Extracting default scaffolding...`);

// Updates routes
Preset.edit('routes/web.php')
	.update((content) => content.replace('view', 'inertia'))
	.withTitle('Updating routes...');

// Adds dependencies
Preset.group((preset) => {
	preset
		.editNodePackages()
		.add('@inertiajs/inertia', '^0.9.2')
		.add('@inertiajs/progress', '^0.2.2')
		.add('@inertiajs/inertia-vue3', '^0.4.7')
		.add('vue', '^3.1.4')
		.addDev('@vue/compiler-sfc', '^3.1.4')
		.addDev('typescript', '^4.3.5')
		.addDev('@vitejs/plugin-vue', '^1.2.4');

	// Adds PHP dependencies
	preset
		.editPhpPackages() //
		.add('inertiajs/inertia-laravel', '^0.4.2');
}).withTitle('Updating dependencies...');

// Installs dependencies
Preset.installDependencies('node').ifUserApproves().withoutTitle();
Preset.installDependencies('php').ifUserApproves().withoutTitle();

// Displays instructions
Preset.instruct([`Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`]);
