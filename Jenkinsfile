
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    environment {
        // GitHub
        GIT_REPO = 'https://github.com/sheik7868/TMS-WEB-CLIENT.git'
        GIT_BRANCH = 'feature_fc_sushma'

        // Harbor
        HARBOR_REGISTRY = '172.28.63.77:8081'
        HARBOR_API = 'http://localhost:8081/api/v2.0'
        HARBOR_PROJECT = 'tms-project'
        IMAGE_NAME = 'tms-web'
        KEEP_IMAGES = '5'

        // Local application
        CONTAINER_NAME = 'tms-container'
        APP_PORT = '3000'
    }

    stages {

        stage('1. Clone Code from GitHub') {
            steps {
                git branch: "${GIT_BRANCH}",
                    url: "${GIT_REPO}"

                sh '''
                    set -e
                    echo "Latest Git commit:"
                    git log -1 --oneline
                    test -f Dockerfile
                '''
            }
        }

        stage('2. Remove Old Container and Image') {
            steps {
                sh '''
                    set -e

                    echo "Removing old container if it exists..."
                    docker rm -f "$CONTAINER_NAME" || true

                    echo "Removing old local images if they exist..."
                    docker image rm \
                      "$HARBOR_REGISTRY/$HARBOR_PROJECT/$IMAGE_NAME:latest" \
                      || true
                '''
            }
        }

        stage('3. Build New Docker Image') {
            steps {
                sh '''
                    set -e

                    IMAGE="$HARBOR_REGISTRY/$HARBOR_PROJECT/$IMAGE_NAME"

                    echo "Building image with this Jenkins build number..."

                    docker build \
                      -t "$IMAGE:build-$BUILD_NUMBER" \
                      -t "$IMAGE:latest" .

                    docker images "$IMAGE"
                '''
            }
        }

        stage('4. Login to Harbor') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'harbor-credentials',
                        usernameVariable: 'HARBOR_USERNAME',
                        passwordVariable: 'HARBOR_PASSWORD'
                    )
                ]) {
                    sh '''
                        set -e

                        printf '%s' "$HARBOR_PASSWORD" |
                          docker login "$HARBOR_REGISTRY" \
                            --username "$HARBOR_USERNAME" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('5. Push New Image to Harbor') {
            steps {
                sh '''
                    set -e

                    IMAGE="$HARBOR_REGISTRY/$HARBOR_PROJECT/$IMAGE_NAME"

                    echo "Pushing versioned image..."
                    docker push "$IMAGE:build-$BUILD_NUMBER"

                    echo "Pushing latest tag..."
                    docker push "$IMAGE:latest"
                '''
            }
        }

        stage('6. Keep Only 5 Harbor Build Versions') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'harbor-credentials',
                        usernameVariable: 'HARBOR_USERNAME',
                        passwordVariable: 'HARBOR_PASSWORD'
                    )
                ]) {
                    sh '''
                        set -eu

                        command -v curl >/dev/null
                        command -v jq >/dev/null

                        REPO="$HARBOR_API/projects/$HARBOR_PROJECT/repositories/$IMAGE_NAME"
                        ARTIFACTS="$REPO/artifacts"

                        echo "Getting Harbor artifacts..."

                        curl -fsS \
                          --user "$HARBOR_USERNAME:$HARBOR_PASSWORD" \
                          "$ARTIFACTS?with_tag=true&page=1&page_size=100" \
                          -o /tmp/harbor-artifacts.json

                        # Find versioned build tags, sort newest first,
                        # and select artifacts beyond the newest five.
                        jq -r --argjson keep "$KEEP_IMAGES" '
                          [
                            .[] |
                            select(
                              any(.tags[]?;
                                .name | test("^build-[0-9]+$")
                              )
                            ) |
                            {
                              digest: .digest,
                              build: (
                                [
                                  .tags[]?.name |
                                  select(test("^build-[0-9]+$")) |
                                  ltrimstr("build-") |
                                  tonumber
                                ] | max
                              )
                            }
                          ]
                          | unique_by(.digest)
                          | sort_by(.build)
                          | reverse
                          | .[$keep:][]
                          | .digest
                        ' /tmp/harbor-artifacts.json |
                        while IFS= read -r DIGEST; do
                            [ -n "$DIGEST" ] || continue

                            ENCODED_DIGEST=$(printf '%s' "$DIGEST" |
                              sed 's/:/%3A/g')

                            echo "Deleting old artifact: $DIGEST"

                            curl -fsS -X DELETE \
                              --user "$HARBOR_USERNAME:$HARBOR_PASSWORD" \
                              "$ARTIFACTS/$ENCODED_DIGEST"
                        done

                        echo "Harbor retention cleanup finished."
                    '''
                }
            }
        }

        stage('7. Pull Image from Harbor') {
            steps {
                sh '''
                    set -e

                    IMAGE="$HARBOR_REGISTRY/$HARBOR_PROJECT/$IMAGE_NAME:build-$BUILD_NUMBER"

                    echo "Pulling the published image..."
                    docker pull "$IMAGE"
                '''
            }
        }

        stage('8. Run Container Locally') {
            steps {
                sh '''
                    set -e

                    IMAGE="$HARBOR_REGISTRY/$HARBOR_PROJECT/$IMAGE_NAME:build-$BUILD_NUMBER"

                    echo "Removing previous container..."
                    docker rm -f "$CONTAINER_NAME" || true

                    echo "Starting the container from the Harbor image..."

                    docker run -d \
                      --name "$CONTAINER_NAME" \
                      --restart unless-stopped \
                      -p "$APP_PORT:3000" \
                      "$IMAGE"

                    sleep 5

                    if [ "$(docker inspect -f '{{.State.Running}}' "$CONTAINER_NAME")" != "true" ]; then
                        docker logs "$CONTAINER_NAME" || true
                        echo "ERROR: Application container failed."
                        exit 1
                    fi

                    echo "Container is running:"
                    docker ps --filter "name=$CONTAINER_NAME"

                    echo "Recent container logs:"
                    docker logs --tail 30 "$CONTAINER_NAME"
                '''
            }
        }

        stage('9. Logout from Harbor') {
            steps {
                sh '''
                    docker logout "$HARBOR_REGISTRY" || true
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: GitHub -> Build -> Push -> Retention -> Pull -> Run'
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output.'
        }
    }
}
