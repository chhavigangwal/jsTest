$M2_HOME/bin/mvn -f ../kunderaJSRest/pom.xml clean install -U
$M2_HOME/bin/mvn -f ../ServersideObjectGeneration/pom.xml clean compile assembly:single -U
cp -R ../kunderaJSRest/target/KunderaJSRest/ $4/webapps/
cp ../ServersideObjectGeneration/target/ServerSideObjectGen-0.0.1-jar-with-dependencies.jar bower_components/ServersideObjectGeneration/
cp kundera.js $8
cd ../ServersideObjectGeneration/
sh object_gen.sh -file $2 -tomcatPath $4 -outputPath $6

