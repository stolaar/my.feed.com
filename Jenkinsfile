node {

    stage('Checkout SCM') {
        checkout scm
    }
    if (env.BRANCH_NAME == 'master' ) {
        withEnv(['PORT_NUMBER=5021',
                'EMAIL_ADDRESS=test.nodejs43@gmail.com',
                'EMAIL_PASSWORD=T94rAsQ4dErN3StV',
                'EMAIL_HOST=smtp.gmail.com',
                'GOOGLE_SECRET=LQUVhNMgcCMjwzWHrkSrtRN3',
                'SECRET_OR_KEY=supersecretmaster',
                "DB_USER=astolic",
                'DB_PASSWORD=Qrm095Zeq!Ci',
                "DB_HOST=db",
                'DB_PORT=5439',
                "DB_DIALECT=postgres",
                "DB_POOL_MAX=20",
                "DB_POOL_MIN=0",
                "DB_POOL_ACQUIRE=30000",
                "DB_POOL_IDLE=10000",
                "DB_DATABASE=my-feed-db-${env.BRANCH_NAME}",
                "INIT_ADMIN_EMAIL=astolic@banzae.dev"
                "INIT_ADMIN_PASSWORD=katakomba501!"
                ]) {
            stage('Build Docker Image') {
                sh "echo GENERATE_SOURCEMAP=false >> ./client/.env"
                sh "docker-compose build"
            }
            try {
                stage("Development - deployment - branch: ${env.BRANCH_NAME}"){
                    sh "./jenkins/deploy.sh"
                }
            } finally {
                archiveArtifacts artifacts: 'logs-*.txt'
            }
        }
    }
}
