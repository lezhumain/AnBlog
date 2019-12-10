pipeline {
    agent{
        label 'master'
    }

    stages {

        stage('Checkout'){

            checkout scm
        }

        stage('Build'){

           env.NODE_ENV = "test"

           print "Environment will be : ${env.NODE_ENV}"

           sh 'node -v'
	   sh 'npm prune'
           sh 'npm install'
           sh 'npm run ng build -- --prod'

         }
         
         stage('Cleanup'){

           echo 'prune and cleanup'
           sh 'npm prune'
           sh 'rm node_modules -rf'
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
