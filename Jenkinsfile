pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'tms-webclient'
        CONTAINER_NAME = 'tms-webclient-container'
        PORT           = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Clean Old Container & Image') {
            steps {
                script {
                    echo 'Removing old container if it exists...'

                    sh "docker rm -f ${CONTAINER_NAME} || true"

                    echo 'Removing old image if it exists...'

                    sh "docker rmi ${IMAGE_NAME}:latest || true"
                }
            }
        }

        stage('Build New Image') {
            steps {
                script {
                    echo 'Building the new Docker image...'

                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy & Execute Container') {
            steps {
                script {
                    echo 'Starting the new container...'

                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Verify Execution') {
            steps {
                script {
                    echo 'Checking running container...'

                    sh "docker ps | grep ${CONTAINER_NAME}"

                    echo 'Fetching application logs...'

                    sh "docker logs --tail 20 ${CONTAINER_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            echo 'TMS Web Client is running.'
            echo 'Open: http://localhost:3000'
        }

        failure {
            echo 'Pipeline failed!'
            echo 'Please check the Jenkins console output.'
        }
    }
}

