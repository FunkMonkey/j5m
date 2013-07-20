module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-typescript');

	
	// Project configuration.
	grunt.initConfig({

		typescript: {
			base: {
				src: ['scripts/ts/**/*.ts', 'scripts/ts_definitions/**/*.ts'],
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
		watch:{
			typescript: {
				files: [ '<%= typescript.base.src %>' ],  //<- this watch all files (even sub-folders)
				tasks: ['typescript']
			}
		},
	});
};