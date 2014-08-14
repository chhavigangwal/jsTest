module.exports = function(grunt) {
	//configurations for kundera.js
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		kconfig : grunt.file.readJSON('config.json'),
		env: process.env,
		// Mocha
		mocha : {
			all : {
				src : [ 'tests/testrunner.html' ],
			},
			options : {
				run : true,
				debug : true,
				timeout : 10000,
				options: {
				      log: true,
				      logErrors: true
				    }
			}
		},
		// Install Rest for Kundera
		installRest : {
			options : {
				cmd : "mvn",
				grunt : false,
				args : [ '-f', 'bower_components/kunderaJSRest/pom.xml',
						'clean', 'install','-Pconf','-Ddir=<%= kconfig.tomcat_path %>/webapps/' , '-U' ]
			}
		},
		//Server side object model generation
		installServerSide : {
			options : {
				cmd : "mvn",
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
				cmd : "java",
				grunt : false,
				args : [ '-jar','bower_components/ServersideObjectGeneration/ServerSideObjectGen-0.0.1-jar-with-dependencies.jar',
                           '<%= kconfig.object_generator_data_config %>','<%= kconfig.object_output_path %>']

			},
			deploy_pu_options : {
				cmd : 'cp',
				grunt : false,
				args : [ '-r','<%= kconfig.object_output_path %>/META-INF', '<%= kconfig.tomcat_path %>/webapps/KunderaJSRest/WEB-INF/classes/']

			},
			deploy_cass_options : {
				cmd : 'cp',
				grunt : false,
				args : [ '<%= kconfig.object_output_path %>/dynamic-cassandra-entity.jar', '<%= kconfig.tomcat_path %>/webapps/KunderaJSRest/WEB-INF/lib']

			},
			deploy_mongo_options : {
				cmd : 'cp',
				grunt : false,
				args : [ '<%= kconfig.object_output_path %>/dynamic-mongodb-entity.jar', '<%= kconfig.tomcat_path %>/webapps/KunderaJSRest/WEB-INF/lib']

			}
		
		},
		// Deploy kundera.js
		deployKunderaJS : {
			options : {
				cmd : "cp",
				grunt : false,
				args : [ 'kundera.min.js',
						'<%= kconfig.js_deploy_path %>/kundera.js' ]
			}
		}
	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');
	
	grunt.registerTask('test', [ 'mocha' ]);
	
	grunt.registerTask('default', ['installRest','installServerSide', 'deployKunderaJS']);

	grunt.registerTask('installRest','Install js rest package',	function() {
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

	
	grunt.registerTask('installServerSide','Run server side object assembly', function() {
		var done = this.async();
		grunt.log.write('Running server side object assembly...').ok();
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

	grunt.registerTask('deployServerSideObject','Install object generator',function() {
						var done = this.async();
						grunt.log.write('Installing object generator...').ok();
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
	
	grunt.registerTask('createServerSideObject','Deploy object generator',function() {
		var done = this.async();
		grunt.log.write('Deploying object generator...').ok();
		
		grunt.util.spawn(grunt.config.get([ 'deployServerSideObject' ]).create_jar_options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to create server side objects for kundera failed. ');
							}
							grunt.log.write('Response...' + result).ok();
							done();

						});

	});
	
	grunt.registerTask('DeployPU','Deploy persistence unit',function() {
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
	
	grunt.registerTask('DeployCassObjects','Deploy Cassandra objects',function() {
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
	
	grunt.registerTask('DeployMongoObjects','Deploy Mongo objects',function() {
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
	
	grunt.registerTask('deployKunderaJS','Deploy kundera.js',function() {
		var done = this.async();
		grunt.log.write('Deploying kundera.js...').ok();
		grunt.util.spawn(grunt.config.get([ 'deployKunderaJS' ]).options,
						function(err, result, code){
							if (code == 127) {
								return grunt.warn('The attempt to deploy mongo entities for kundera failed.');
							}
							grunt.log.write('Response...' + result).ok();
							done();
						});

	});
	
};