pipeline {
    agent any

    environment {
        IMAGE_NAME = 'tms-webclient'
        CONTAINER_NAME = 'tms-webclient-container'
        HOST_PORT = '3000'
        CONTAINER_PORT = '3000'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                sh '''
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container...'

                sh '''
                    docker rm -f $CONTAINER_NAME || true
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Starting new container...'

                sh '''
                    docker run -d \
                    --name $CONTAINER_NAME \
                    -p $HOST_PORT:$CONTAINER_PORT \
                    $IMAGE_NAME
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking container...'

                sh '''
                    docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
            echo 'Open http://localhost:3000'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}