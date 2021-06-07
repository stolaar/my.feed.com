const AWS = require('aws-sdk');
const parseS3Key = require('./parseS3Key')

const { S3_ACCESS_KEY = "", S3_SECRET_KEY = "", S3_BUCKET } = process.env
let s3Bucket = S3_BUCKET || ""
const spacesEndpoint = new AWS.Endpoint(s3Bucket);

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    s3BucketEndpoint: true
  });

const deleteS3 = async (path) => {
    try{
        return await s3.deleteObject({Bucket: s3Bucket.replace("https://", "").split(".")[0], Key: parseS3Key(path)}).promise()
    }catch(err){
        console.log(err);// error
    }
}

module.exports = deleteS3;