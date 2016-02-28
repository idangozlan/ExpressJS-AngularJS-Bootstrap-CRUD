module.exports = function(grunt) {
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfiles.js', 'public/js/app.js', 'routes/**/*.js']
        },
        jsbeautifier: {
            all: ['Gruntfiles.js', 'public/js/app.js', 'routes/**/*.js']
        },
        htmlangular: {
            options: {
                tmplext: '.html',
                customtags: [
                ],
                customattrs: [
                ],
                relaxerror: [
                ]
            },
          files: {
            src: ['public/pages/**/*.html']
          }
        },
        prettify: {
            pages: {
                expand: true,
                src: ['public/pages/**/*.html'],
                dest: ''
            }
        },
        sass: {
            options: {
                sourcemap: 'none'
            },
            theme: {
                files: {
                    'public/css/theme.css': 'scss/theme.scss'
                }
            }
        },
        watch: {
            styles: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:theme'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-html-angular-validate');

    // Default task(s).
    grunt.registerTask('default', [
        //JS
        'jshint', 'jsbeautifier',
        //CSS
        'sass',
        //HTML
        'htmlangular', 'prettify'
    ]);
};