pipeline {
    agent{
        label 'master'
    }

    stages {

        stage('Checkout'){

            checkout scm
        }

        stage('Build'){
	    steps {

           	echo "Environment will be : ${env.NODE_ENV}"

           	sh 'node -v'
	   	sh 'npm prune'
           	sh 'npm install'
           	sh 'npm run ng build -- --prod'
	    }
    	}
         
         stage('Cleanup'){
	    steps {
           	echo 'prune and cleanup'
           	sh 'npm prune'
           	sh 'rm node_modules -rf'
            }
	 }


        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
