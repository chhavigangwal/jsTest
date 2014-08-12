/// tests.js

describe('setRestURL', function(){
    it('should return -1 when the value is not present', function(){
    	Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
        chai.assert.equal("http://localhost:8080/KunderaJSRest", Kundera.getKunderaRestUrl());
     
    });
  });


describe('testPersist', function () {
	  this.timeout(5000);
  	  it('Testing persist', function (done) {
	  		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
	  		  var extProperties = [];
	  		     extProperties["kundera.nodes"]="localhost";
	  		     extProperties["kundera.port"]="27017";
	  		    // extProperties["cql.version"]="3.0.0";
	  		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
	  		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
	  		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
	  		   function(resp){
	  			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
	  			 var geouser = '{"key":{"punchRecordId":"pr1","userId":"u1"},"timeStamp":1351667543333,"password":"123456","recordImage":null,"description":"xyz","mobileNo":"2648726487","location":{"g1":"g2"}}';
	  		     em.persist(geouser, "UserGeoRecords",
	  		  		   function(resp1){
		  			    //  chai.assert.equal(resp1, "Record Persisted");
		  			      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		  			      em.close();
		  			   //   done();
		  		   }, 
		  		   function(err1){
		  			//  chai.assert.equal(err,"Record Persisted");
		  			 // em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	  			      //em.close();
		  			 // done();
		  		    });
	  		   //em.close();
	  		   }, 
	  		   function(err){
	  			 chai.assert.equal("",err);
	  			//em.close();
	  			  //done();
	  		    });
	  		
	  		done(); 
	  		   
	  	  });
	});

describe('testMerge', function () {
	  this.timeout(5000);
	  it('Testing merge', function (done) {
	  		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
	  		  var extProperties = [];
	  		     extProperties["kundera.nodes"]="localhost";
	  		     extProperties["kundera.port"]="27017";
	  		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
	  		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
	  		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
	  		   function(resp){
	  			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
	  			 var geouser = '{"key":{"punchRecordId":"pr1","userId":"u2"},"timeStamp":1351667543333,"password":"123456","recordImage":null,"description":"xyz","mobileNo":"2648726487","location":{"g1":"g2"}}';
	  		     em.persist(geouser, "UserGeoRecords",
	  		  		   function(resp1){
		  			      //chai.assert.equal(resp1, "Record Persisted");
		  			      var ugeouser = '{"key":{"punchRecordId":"pr1","userId":"u2"},"timeStamp":1351667543333,"password":"123456","recordImage":null,"description":"xyz1234","mobileNo":"2648726487","location":{"g1":"g2"}}';
		  			      em.merge(ugeouser, "UserGeoRecords",
		 	  		  		   function(resp2){
		 		  			      //chai.assert.equal(resp2, ugeouser);
		  			    	      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		 		  			      em.close();
		 		  			      done();
		 		  		        }, 
		 		  		        function(err2){
		 		  			      chai.assert.equal("",err2);
		 		  			      done();
		 		  		        });
		  			      done();
		  		   }, 
		  		   function(err1){
		  			// chai.assert.equal(err1,"Response was NOT a valid JSON document");
		  			  done();
		  		    });
	  		     done();
	  		   }, 
	  		   function(err){
	  			 chai.assert.equal(err,"Response was NOT a valid JSON document");
	  			  done();
	  		    });
	  		
	  		     
	  		   
	  	  });
	});
	  
	
	
	 