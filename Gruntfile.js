/* 
* @Author: rsadow
*/

var p = {
	css: 'src/scss/style.scss'
}

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: 'app',
      assets: '<%= project.app %>/assets',
      css: [
        '<%= project.src %>/sass/style.scss'
      ],
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dist: [
        '<%= project.assets %>/css/style.css'
      ]
    },

    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files
     */
    concat: {
      dev: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
        }
      },
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      dist: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * Compiles all Sass/SCSS files
     */
    sass: {
      dev: {
      	options:{
      		 includePaths: require('node-bourbon').includePaths
      	},
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
      	options:{
      		 includePaths: require('node-bourbon').includePaths
      	},
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
          //'css/style.css': p.css + ''
        }
      }
    },

    /**
     * CSSMin
     * CSS minification
     * https://github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      dev: {
        files: {
          '<%= project.assets %>/css/style.min.css': [
            '<%= project.assets %>/css/style.css'
          ]
        }
      },
      dist: {
        files: {
          '<%= project.assets %>/css/style.min.css': [
            '<%= project.assets %>/css/style.css'
          ]
        }
      }
    },


    /**
     * Runs tasks against changed watched files
     */
    watch: {
      concat: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['concat:dev']
      },
      sass: {
        files: '<%= project.src %>/sass/{,*/}*.{scss,sass}',
        tasks: ['sass:dev', 'cssmin:dev']
      },
      // livereload: {
      //   options: {
      //     livereload: LIVERELOAD_PORT
      //   },
      //   files: [
      //     '<%= project.app %>/{,*/}*.html',
      //     '<%= project.assets %>/css/*.css',
      //     '<%= project.assets %>/js/{,*/}*.js',
      //     '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      //   ]
      // }
    }
  });

	/**
   * Load task
   *
   */
  //grunt.loadNpmTasks('grunt-contrib-sass'); // Ruby version of sass 
	grunt.loadNpmTasks('grunt-sass'); 					// C version of sass, much faster, but still under developmnet
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'cssmin:dev',
    'concat:dev',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'cssmin:dist',
    'clean:dist',
    'uglify'
  ]);
  

}