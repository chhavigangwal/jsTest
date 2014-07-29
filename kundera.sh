$M2_HOME/bin/mvn -f bower_components/kunderaJSRest/pom.xml clean install -U
$M2_HOME/bin/mvn -f bower_components/ServersideObjectGeneration/pom.xml clean compile assembly:single -U
cp -R bower_components/kunderaJSRest/target/KunderaJSRest/ $4/webapps/
cp bower_components/ServersideObjectGeneration/target/ServerSideObjectGen-0.0.1-jar-with-dependencies.jar bower_components/ServersideObjectGeneration/
cd bower_components/ServersideObjectGeneration/
sh object_gen.sh -file $2 -tomcatPath $4 -outputPath $6

