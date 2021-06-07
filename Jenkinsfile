node {

    stage('Checkout SCM') {
        checkout scm
    }
    if (env.BRANCH_NAME == 'master' ) {
        withEnv(['PORT_NUMBER=5014',
                'EMAIL_ADDRESS=test.nodejs43@gmail.com',
                'EMAIL_PASSWORD=T94rAsQ4dErN3StV',
                'EMAIL_HOST=smtp.gmail.com',
                'GOOGLE_CLIENT_ID=332266677336-opio6pa88u8dt6is5sko4u1sgtp6edvn.apps.googleusercontent.com',
                'GOOGLE_SECRET=LQUVhNMgcCMjwzWHrkSrtRN3',
                'SECRET_OR_KEY=supersecretmaster',
                "DB_USER=astolic",
                'DB_PASSWORD=123321321',
                "DB_HOST=db",
                'DB_PORT=5432',
                "DB_DATABASE=zipistream_db_${env.BRANCH_NAME}",
                "DB_PERSISTENT_VOLUME=/opt/postgres-${env.BRANCH_NAME}",
                "LISTEN_NOTES_BASE_URL=https://listen-api.listennotes.com/api/v2",
                "X_LISTEN_API_KEY=c95d61a5410c4a31bbb822a8ce340264",
                "STRIPE_BASE_URL=https://api.stripe.com/v1",
                "STRIPE_WEBHOOK_SECRET=whsec_7WUY5BEaJhrfXCA9CveZjqqiB3aQE5BW",
                "PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb",
                "SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73",
                "MONGO_DB_USERNAME=admin",
                "MONGO_DB_PASSWORD=q1RMDkVsjOrOs2W1",
                "MONGO_DB_CLUSTER_URL=cluster0.t0yna.mongodb.net",
                "MONGO_DB_DATABASE_NAME=zipistream",
                "REACT_APP_BASIC_PLAN=prod_J6nacLN9dY0Th4",
                "REACT_APP_PRO_PLAN=prod_J6nbNMQfBCZAkV",
                "REACT_APP_PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb",
                "REACT_APP_SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73",
                "ZIPISTREAM_API_KEY=2F423F4528482B4D6251655468576D59",
                "MAX_UPLOAD_SIZE=100",
                "REACT_APP_GOOGLE_CLIENT_ID=332266677336-opio6pa88u8dt6is5sko4u1sgtp6edvn.apps.googleusercontent.com",
                "S3_ACCESS_KEY=AKIA36LY5WPOJ6SRLS4D",
                "S3_SECRET_KEY=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",
                "REACT_APP_VIP_PLAN=prod_JTt3ul6orCsfHx",
                "REACT_APP_HIDE_FEATURES=true",
                "REACT_APP_BASE_URL_STREAMING_APP=player-test.zipstream.com/",
                ]) {
            stage('Build Docker Image') {
                sh "echo GENERATE_SOURCEMAP=false >> ./client/.env"
                sh "echo REACT_APP_BASIC_PLAN=prod_J6nacLN9dY0Th4 >> ./client/.env"
                sh "echo REACT_APP_PRO_PLAN=prod_J6nbNMQfBCZAkV >> ./client/.env"
                sh "echo REACT_APP_PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb >> ./client/.env"
                sh "echo REACT_APP_SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73 >> ./client/.env"
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

    if (env.BRANCH_NAME == 'staging-banzae' ) {
        withEnv(['PORT_NUMBER=5019',
                'EMAIL_ADDRESS=test.nodejs43@gmail.com',
                'EMAIL_PASSWORD=T94rAsQ4dErN3StV',
                'EMAIL_HOST=smtp.gmail.com',
                'GOOGLE_CLIENT_ID=332266677336-opio6pa88u8dt6is5sko4u1sgtp6edvn.apps.googleusercontent.com',
                'GOOGLE_SECRET=LQUVhNMgcCMjwzWHrkSrtRN3',
                "SECRET_OR_KEY=supersecretstaging",
                "DB_USER=astolic",
                'DB_PASSWORD=123321321',
                "DB_HOST=db",
                'DB_PORT=5436',
                "DB_DATABASE=zipistream-${env.BRANCH_NAME}-db",
                "DB_PERSISTENT_VOLUME=/opt/postgres-${env.BRANCH_NAME}",
                "LISTEN_NOTES_BASE_URL=https://listen-api.listennotes.com/api/v2",
                "X_LISTEN_API_KEY=c95d61a5410c4a31bbb822a8ce340264",
                "STRIPE_BASE_URL=https://api.stripe.com/v1",
                "STRIPE_WEBHOOK_SECRET=whsec_7WUY5BEaJhrfXCA9CveZjqqiB3aQE5BW",
                "PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb",
                "SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73",
                "MONGO_DB_USERNAME=edem",
                "MONGO_DB_PASSWORD=3d3m",
                "MONGO_DB_CLUSTER_URL=zipistream-qa.rzpvg.mongodb.net",
                "MONGO_DB_DATABASE_NAME=zipistreamDB",
                "REACT_APP_BASIC_PLAN=prod_J6nacLN9dY0Th4",
                "REACT_APP_PRO_PLAN=prod_J6nbNMQfBCZAkV",
                "REACT_APP_PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb",
                "REACT_APP_SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73",
                "ZIPISTREAM_API_KEY=2F423F4528482B4D6251655468576D59",
                "MAX_UPLOAD_SIZE=100",
                "REACT_APP_GOOGLE_CLIENT_ID=332266677336-opio6pa88u8dt6is5sko4u1sgtp6edvn.apps.googleusercontent.com",
                "NODE_ENV=development",
                "S3_ACCESS_KEY=AKIA36LY5WPOJ6SRLS4D",
                "S3_SECRET_KEY=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",
                "S3_BUCKET=https://zipistream-content.s3.eu-west-2.amazonaws.com",
                "REACT_APP_VIP_PLAN=prod_JTt3ul6orCsfHx",
                "REACT_APP_HIDE_FEATURES=true",
                "REACT_APP_BASE_URL_STREAMING_APP=player-test.zipstream.com/",
                ]) {
            stage('Build Docker Image') {
                sh "echo GENERATE_SOURCEMAP=false >> ./client/.env"
                sh "echo REACT_APP_BASIC_PLAN=prod_J6nacLN9dY0Th4 >> ./client/.env"
                sh "echo REACT_APP_PRO_PLAN=prod_J6nbNMQfBCZAkV >> ./client/.env"
                sh "echo REACT_APP_PUBLISHABLE_STRIPE_API_KEY=pk_test_51IU7lTDobz6nPCYoxSQVWWmWnj1DweLM2e3ycjX4o1oQlEdyXCnYZZLGbcVAjvhT6VP5zVpzWAOymJs1MsyvqnU400pdGbI2cb >> ./client/.env"
                sh "echo REACT_APP_SECRET_STRIPE_API_KEY=sk_test_51IU7lTDobz6nPCYoGlUpIKQCoLDrKBkVtjlLwhlOnBDIVhLzBdMoCOFmJ32A29wKpRKqrwE5OQ42hrmLehDQ8oki00El3iUe73 >> ./client/.env"

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
