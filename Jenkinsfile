pipeline {
  agent {
    node {
      label 'nodejs'
    }

  }
  stages {
    stage('拉取代码') {
      agent none
      steps {
        container('nodejs') {
          git(url: 'http://10.10.200.78/developeg-q/oak.git', credentialsId: 'gitlab', branch: 'test', changelog: true, poll: false)
          sh '''ls -al
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo \'Asia/Shanghai\' >/etc/timezone'''
        }

      }
    }

    stage('编译') {
      agent none
      steps {
        container('nodejs') {
          sh 'ls -al'
          sh '''npm install
npm run build:$HARBOR_NAMESPACE'''
        }

      }
    }

    stage('编译 推送镜像 部署web-oak') {
      agent none
      steps {
        withCredentials([usernamePassword(credentialsId : 'harbor' ,usernameVariable : 'HARBOR_USER' ,passwordVariable : 'HARBOR_PASSWD' ,)]) {
          container('nodejs') {
            withCredentials([
                                                            kubeconfigFile(
                                                                  credentialsId: 'demo-kubeconfig',
                                                                  variable: 'KUBECONFIG')
                                                                  ]) {
                  sh '''export CURRENT_TIME=$(date \'+%Y%m%d%H%M%S\')
echo $CURRENT_TIME
cd dist
docker build --no-cache \
--build-arg DNS1=$DNS1 \
-t $REGISTRY/$HARBOR_NAMESPACE/$PROJECTNAME:latest \
-t $REGISTRY/$HARBOR_NAMESPACE/$PROJECTNAME:$CURRENT_TIME  -f ../Dockerfile .


echo "$HARBOR_PASSWD" | docker login $REGISTRY -u "$HARBOR_USER" --password-stdin
docker push $REGISTRY/$HARBOR_NAMESPACE/$PROJECTNAME:latest
docker push $REGISTRY/$HARBOR_NAMESPACE/$PROJECTNAME:$CURRENT_TIME

echo $CURRENT_TIME
envsubst < ../$PROJECTNAME.yaml | kubectl apply -f -'''
                }

              }

            }

          }
        }

      }
      environment {
        PROJECTNAME = 'web-oak'
        REGISTRY = '10.10.200.79:9192'
        HARBOR_NAMESPACE = 'test'
        DNS1 = '114.114.114.114'
      }
    }
