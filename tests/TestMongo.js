/// tests.js

describe('setRestURL', function(){
    it('should return -1 when the value is not present', function(){
    	Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
        chai.assert.equal("http://localhost:8080/KunderaJSRest", Kundera.getKunderaRestUrl());
     
    });
  });


describe('testPersist', function () {
	//  this.timeout(5000);
  	  it('Testing persist', function (done) {
	  		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
	  		  var extProperties = [];
	  		     extProperties["kundera.nodes"]="localhost";
	  		     extProperties["kundera.port"]="27017";
	  		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
	  		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
	  		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
	  		   function(resp){
	  			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
	  			var mongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my first tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
	  		     em.persist(mongUser, "MongoPrimeUser",
	  		  		   function(resp1){
	  			      chai.assert.equal("Record Persisted",resp1);
		  			      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		  			      //em.close();
		  			    done();
		  		   }, 
		  		   function(err1){
		  			 chai.assert.equal(err1,"Record Persisted");
		  			 em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	  			     //em.close();
		  			 done();
		  		    });
	  		   // em.close();
	  		   }, 
	  		   function(err){
	  			 chai.assert.equal("",err);
	  			// em.close();
	  			  // done();
	  		    });
	  		
	  		done(); 
	  		   
	  	  });
	});

describe('testMerge', function () {
	//  this.timeout(5000);
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
	  			var mongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my first tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
	  			em.persist(mongUser, "MongoPrimeUser",
	  		  		   function(resp1){
		  			     // chai.assert.equal("Record Persisted",resp1);
		  			      var umongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my updated tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
		  			      em.merge(umongUser, "MongoPrimeUser",
		 	  		  		   function(resp2){
		 		  			     // chai.assert.equal(resp2, umongUser);
		  			    	      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		 		  			    //  em.close();
		 		  			      done();
		 		  		        }, 
		 		  		        function(err2){
		 		  		        	em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		 		  			      //chai.assert.equal("",err2);
		 		  			      done();
		 		  		        });
		  			    //  done();
		  		   }, 
		  		   function(err1){
		  			 em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
		  			// chai.assert.equal(err1,"Response was NOT a valid JSON
					// document");
		  			  done();
		  		    });
	  		     //done();
	  		   }, 
	  		   function(err){
	  			 em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	  			 //chai.assert.equal(err,"Response was NOT a valid JSON document");
	  			  done();
	  		    });
	  		
	  		     
	  		   
	  	  });
	});
	  
describe('testDelete', function () {
//this.timeout(5000);
it('Testing delete', function (done) {
		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
		  var extProperties = [];
		     extProperties["kundera.nodes"]="localhost";
		     extProperties["kundera.port"]="27017";
		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
		   function(resp){
			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
			 var mongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my first tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
	  			em.persist(mongUser, "MongoPrimeUser",
		  		   function(resp1){
	  			      //chai.assert.equal("Record Persisted",resp1);
	  			      em.deleteEntity('{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"}', "MongoPrimeUser",
	 	  		  		   function(resp2){
	 		  			      //chai.assert.equal("Deleted Successfully",resp2);
	  			    	      em.find('{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"}', "MongoPrimeUser",
	  			    	      function(resp3) {
	  			    	    	em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	  			    	    	done();
	  			    	      },
	  			    	      function(err3){
	  			    	    	//chai.assert.equal(resp1, "");
	  			    	    	em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	  			    	    	done();
	  			    	      });
	 		  			      //em.close();
	 		  			      //done();
	 		  		        }, 
	 		  		        function(err2){
	 		  			     // chai.assert.equal("",err2);
	 		  			      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	 		  			      done();
	 		  		        });
	  			     // done();
	  		   }, 
	  		   function(err1){
	  			 // chai.assert.equal(err1,'Internal Server Error');
	  			  done();
	  		    });
		     //done();
		   }, 
		   function(err){
			 //chai.assert.equal(err,'Internal Server Error');
			  done();
		    });
		
		     
		   
	  });
});	
describe('testFind', function () {
//this.timeout(5000);
it('Find', function (done) {
		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
		  var extProperties = [];
		     extProperties["kundera.nodes"]="localhost";
		     extProperties["kundera.port"]="27017";
		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
		   function(resp){
			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
			 var mongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my first tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
	  			em.persist(mongUser, "MongoPrimeUser",
		  		   function(resp1){
	  			      chai.assert.equal("Record Persisted",resp1);
	  			      em.find('{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"}', "MongoPrimeUser",
	 	  		  		   function(resp2){
	 		  			     // chai.assert.equal(resp2, mongUser);
	  			    	      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	 		  			     // em.close();
	 		  			      done();
	 		  		        }, 
	 		  		        function(err2){
	 		  			      chai.assert.equal("",err2);
	 		  			      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	 		  			      done();
	 		  		        });
	  			     // done();
	  		   }, 
	  		   function(err1){
	  			  chai.assert.equal(err1,"Response was NOT a valid JSON document");
	  			  done();
	  		    });
		    // done();
		   }, 
		   function(err){
			  chai.assert.equal(err,"Response was NOT a valid JSON document");
			  done();
		    });
		
		     
		   
	  });
});

describe('testFindAll', function () {
//this.timeout(5000);
it('Find all records', function (done) {
		 Kundera.setKunderaRestUrl("http://localhost:8080/KunderaJSRest");
		  var extProperties = [];
		     extProperties["kundera.nodes"]="localhost";
		     extProperties["kundera.port"]="27017";
		     extProperties["kundera.keyspace"]="KunderaTestGrunt";
		     extProperties["kundera.ddl.auto.prepare"]="create-drop";
		     Persistence.createEntityManagerFactory("mongodatabasePU", Kundera.createJSONObject(extProperties),
		   function(resp){
			 chai.assert.isTrue(resp.substring(0, 2) === "ST");
			 var mongUser = '{"key":{"timeLineId":"0aad762b-b0d8-40c4-b005-0422d8187e15","tweetId":"1","userId":"mevivs"},"tweetBody":"my first tweet","tweetDate":"2014-07-19T23:37:23.008+05:30"}';
	  		 em.persist(mongUser, "MongoPrimeUser",
		  		   function(resp1){
 			      chai.assert.equal("Record Persisted",resp1);
	  			     em.createQuery("Select p from MongoPrimeUser p ", null,
	 	  		  		   function(resp2){
	 		  			      // chai.assert.equal(resp2, ugeouser);
	  			    	      em.createNativeScript("mongodatabasePU","db.getMongo().getDB('KunderaTestGrunt').dropDatabase()");
	 		  			   //   em.close();
	 		  			      done();
	 		  		        }, 
	 		  		        function(err2){
	 		  			      chai.assert.equal("",err2);
	 		  			      done();
	 		  		        });
	  			      done();
	  		   }, 
	  		   function(err1){
	  			// chai.assert.equal(err1,"Response was NOT a valid JSON
				// document");
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
	
	 