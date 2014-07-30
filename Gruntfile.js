//var pkgjson = require('./package.json');

/*var config = {
 pkg: pkgjson,
 app: 'bower_components',
 dist: 'dist'
 }*/

module.exports = function(grunt) {
	var options = {
		// The command to execute. It should be in the system path.
		// cmd: 'mvn',
		cmd : 'sh',
		// If specified, the same grunt bin that is currently running will be
		// spawned as the child command, instead of the "cmd" option. Defaults
		// to false.
		grunt : false,
		// An array of arguments to pass to the command.
		//args: ['-f','/home/impadmin/KunderaWork/KunderaJSRest/pom.xml','clean','install','-U'],
		args : [
				'kundera.sh',
				'-file',
				'/home/impadmin/KunderaWork/Final-js/testGrunt/node_properties_new.json',
				'-tomcatPath',
				'/home/impadmin/Softwares/apache-tomcat-7.0.26/apache-tomcat-7.0.26',
				'-outputPath',
				'/tmp/data','-jsPath','../../js/' ]
	// Additional options for the Node.js child_process spawn method.
	//opts: nodeSpawnOptions,
	// If this value is set and an error occurs, it will be used as the value
	// and null will be passed as the error value.
	//fallback: fallbackValue
	};

	function doneFunction(error, result, code) {

		if (code == 127) {
			return grunt.warn('The attempt to do whatever failed. ');
		}
		done(error);
		// If the exit code was non-zero and a fallback wasn't specified, an Error
		// object, otherwise null.
		//error : {grunt.log.write('Logging some stuff...').ok();}
		// The result object is an object with the properties .stdout, .stderr, and
		// .code (exit code).
		//result: {grunt.log.write('Logging some stuff...').ok();}
		// When result is coerced to a string, the value is stdout if the exit code
		// was zero, the fallback if the exit code was non-zero and a fallback was
		// specified, or stderr if the exit code was non-zero and a fallback was
		// not specified.
		//String(result) 
		// The numeric exit code.
		//	  /code
	}
	// A very basic default task.
	grunt.registerTask('default', 'Log some stuff.', function() {
		var done = this.async();
		grunt.log.write('Installing kundera.js...').ok();
		grunt.util.spawn(options, function(response) {
			grunt.log.write('Response...' + response).ok();
			
			
		});

	});
	/*grunt.registerMultiTask('executetagger', 'something er other', function(outDir) {
	    var done = this.async();
	    console.log(arguments);
	    executetagger = grunt.util.spawn({
	          cmd: "node",
	          args: ["doe/ray/me",
	                      "--foo=bar",
	                      "--baz=qux"]
	    }, function(error, result, code) {
	          if(code == 127) {
	                return grunt.warn(
	                   'The attempt to do whatever failed. '
	                );
	          }
	          done(error);
	    });
	    executetagger.stdout.pipe(process.stdout);
	    executetagger.stderr.pipe(process.stderr);
	});
	grunt.registerTask('tagger', 'executetagger');
	grunt.registerTask('hudson-ci', ['tagger', 'somethingelse', 'athirdthing']);
	};*/
};
