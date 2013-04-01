module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-typescript');
	
	// Project configuration.
	grunt.initConfig({
		typescript: {
			base: {
				src: ['scripts/ts/**/*.ts'],
				dest: 'scripts/js',
				options: {
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'scripts/ts',
					sourcemap: true,
					declaration: false
				}
			}
		},
	});
};