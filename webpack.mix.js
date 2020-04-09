let mix = require('laravel-mix');

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
//Bot Scheme Editor
mix.js('js/app.js', '0.js');

mix.styles([
			'./css/component_theme.css',
			'./css/layout.css',
			'./css/property_editor.css',
			'./css/utils.css'
		], './css/app.css');

