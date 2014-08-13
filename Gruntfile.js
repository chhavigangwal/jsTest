var M2_COMMAND = process.env.M2_HOME + "/bin/mvn";
var JAVA_HOME = process.env.JAVA_HOME;
var TOMCAT_PATH = "/home/impadmin/Softwares/apache-tomcat-7.0.26/apache-tomcat-7.0.26";
var SERVER_SIDE_DATA_CONFIG = "/home/impadmin/KunderaWork/Final-js/testGrunt/node_properties_new.json";
var OUTPUT_PATH = "/home/impadmin/testnode";
var JS_DEPLOY_PATH = "/home/impadmin/testnode";

module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		// Mocha
		mocha : {
			all : {
				src : [ 'tests/testrunner.html' ],
			},
			options : {
				run : true,
				debug : true
			}
		},
		// Install Rest for Kundera
		installRest : {
			options : {
				cmd : M2_COMMAND,
				grunt : false,
				args : [ '-f', 'bower_components/kunderaJSRest/pom.xml',
						'clean', 'install','-Pconf','-Ddir='+TOMCAT_PATH+'/webapps/' , '-U' ]
			}
		},
		//Server side object model generation
		installServerSide : {
			options : {
				cmd : M2_COMMAND,
				grunt : false,
				args : [ '-f',
						'bower_components/ServersideObjectGeneration/pom.xml',
						'clean', 'compile', 'assembly:single', '-U' ]

			}
		},
		
		//Deploying server side object model
		deployServerSideObject : {
			options : {
				cmd : 'cp',
				grunt : false,
				args : [ 'bower_components/ServersideObjectGeneration/target/ServerSideObjectGen-0.0.1-jar-with-dependencies.jar',
						 'bower_components/ServersideObjectGeneration' ]

			},
			create_jar_options : {
				cmd : JAVA_HOME + "/bin/java",
				grunt : false,
				args : [ '-jar','bower_components/ServersideObjectGeneration/ServerSideObjectGen-0.0.1-jar-with-dependencies.jar',
				         SERVER_SIDE_DATA_CONFIG,OUTPUT_PATH]

			},
			deploy_pu_options : {
				cmd : 'cp',
				grunt : false,
				args : [ '-r', OUTPUT_PATH+'/META-INF', TOMCAT_PATH+'/webapps/KunderaJSRest/WEB-INF/classes/']

			},
			deploy_cass_options : {
				cmd : 'cp',
				grunt : false,
				args : [ OUTPUT_PATH+'/dynamic-cassandra-entity.jar', TOMCAT_PATH + '/webapps/KunderaJSRest/WEB-INF/lib']

			},
			deploy_mongo_options : {
				cmd : 'cp',
				grunt : false,
				args : [ OUTPUT_PATH+'/dynamic-mongodb-entity.jar', TOMCAT_PATH + '/webapps/KunderaJSRest/WEB-INF/lib']

			}
		
		},
		uglify: {
			all: {
				files: {
					"dist/kundera.min.js": [ "kundera.js" ]
				},
				options: {
//					preserveComments: false,
//					sourceMap: true,
//					sourceMapName: "dist/jquery.min.map",
//					report: "min",
//					beautify: {
//						"ascii_only": true
//					},
//					banner: "/*! jQuery v<%= pkg.version %> | " +
//						"(c) 2005, <%= grunt.template.today('yyyy') %> jQuery Foundation, Inc. | " +
//						"jquery.org/license */",
					compress: {
						"hoist_funs": false,
						loops: false,
						unused: false
					}
				}
			}
		}
	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');
	
	grunt.registerTask('test', [ 'mocha' ]);
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify', 'installRest','installServerSide']);

	grunt.registerTask('installRest','Log some stuff.',	function() {
						var done = this.async();
						grunt.log.write('Installing rest dependency...').ok();
						grunt.util.spawn(grunt.config.get([ 'installRest' ]).options,
								function(err, result, code){
											if (code == 127) {
												return grunt.warn('The attempt to install rest for kundera failed. ');
											}
											grunt.log.write('Response...' + result).ok();
											done();
										});

					});

	
	grunt.registerTask('installServerSide','Log some stuff.', function() {
		var done = this.async();
		grunt.log.write('Installing server side object model...').ok();
	    grunt.util.spawn(grunt.config.get(['installServerSide']).options,
				function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to install server side object model generator for kundera failed. ');
							}
							grunt.log.write('Response...' + result).ok();
							grunt.task.run('deployServerSideObject');
							done();

						});

	});

	grunt.registerTask('deployServerSideObject','Log some stuff.',function() {
						var done = this.async();
						grunt.log.write('deploying Server side...').ok();
						grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).options,
										function(err, result, code){
											if (code == 127) {
												return grunt.warn('The attempt to deploy server side object model generator for kundera failed. ');
											}
											grunt.log.write('Response...' + result).ok();
											grunt.task.run('createServerSideObject');
											grunt.task.run('DeployPU');
											grunt.task.run('DeployCassObjects');
											grunt.task.run('DeployMongoObjects');
											done();

										});

					});
	
	grunt.registerTask('createServerSideObject','Log some stuff.',function() {
		var done = this.async();
		grunt.log.write('Creating Server side objects...').ok();
		
		grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).create_jar_options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to create server side objects for kundera failed. ');
							}
							grunt.log.write('Response...' + result).ok();
							done();

						});

	});
	
	grunt.registerTask('DeployPU','Log some stuff.',function() {
		var done = this.async();
		grunt.log.write('deploying persistence unt...').ok();
		grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).deploy_pu_options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to deploy persistence unit for kundera failed. ');
							}
							grunt.log.write('Response...' + result).ok();
							done();
						});

	});
	
	grunt.registerTask('DeployCassObjects','Log some stuff.',function() {
		var done = this.async();
		grunt.log.write('deploying cassandra objects...').ok();
		grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).deploy_cass_options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to deploy cassandra entities for kundera failed. ');
							}
							grunt.log.write('Response...' + result).ok();
							done();
						});

	});
	
	grunt.registerTask('DeployMongoObjects','Log some stuff.',function() {
		var done = this.async();
		grunt.log.write('deploying mongo objects...').ok();
		grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).deploy_mongo_options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to deploy mongo entities for kundera failed.');
							}
							grunt.log.write('Response...' + result).ok();
							done();
						});

	});
	
};