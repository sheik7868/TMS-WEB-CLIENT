```groovy
pipeline {
    agent any

    environment {
        // Define your container and image names
        IMAGE_NAME     = 'tms-webclient'
        CONTAINER_NAME = 'tms-webclient-container'
        PORT           = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from your repository
                checkout scm
            }
        }

        stage('Clean Old Container & Image') {
            steps {
                script {
                    echo 'Stopping and removing old container if it exists...'

                    // '|| true' ensures the pipeline does not fail
                    // if the container/image doesn't exist yet
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"

                    echo 'Removing old image to free up space...'
                    sh "docker rmi ${IMAGE_NAME}:latest || true"
                }
            }
        }

        stage('Build New Image') {
            steps {
                script {
                    echo 'Building the new Docker image...'

                    // Builds the image from the Dockerfile
                    // in the repository root
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy & Execute Container') {
            steps {
                script {
                    echo 'Starting the new container...'

                    // Runs the container in detached mode (-d)
                    // and maps host port 3000 to container port 3000
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Verify Execution') {
            steps {
                script {
                    echo 'Checking running containers...'

                    sh "docker ps | grep ${CONTAINER_NAME}"

                    echo 'Fetching application execution logs...'

                    // Prints the last 20 lines of application logs
                    sh "docker logs --tail 20 ${CONTAINER_NAME}"
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check the Docker logs or syntax.'
        }

        success {
            echo 'Pipeline finished successfully! New container is up and running.'
            echo 'Open http://localhost:3000'
        }
    }
}
```
