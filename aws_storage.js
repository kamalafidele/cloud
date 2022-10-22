const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const { AWS_ACCESS_KEY, AWS_ACCESS_SECRET_ID, BUCKET_ID } = process.env;

const storage = new AWS.S3({ 
    region: 'GRA',
    apiVersion: 'latest',
    endpoint: 'https://s3.gra.io.cloud.ovh.net/',
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_ACCESS_SECRET_ID
    }
});

(async () => {
    try {
        const objects = await storage.listObjects({ Bucket: BUCKET_ID }).promise();
        console.log(objects);
        
        const object = await storage.getObject({ Bucket: BUCKET_ID, Key: 'City.jpg'}).promise();
        
        const written = fs.writeFileSync('City.jpg', object.Body);
        console.log('finished to download the file');

        const data = fs.readFileSync('./City.jpg');
        const uploaded = await storage.upload({ Body: data,  Bucket: BUCKET_ID, Key: 'City.jpg', ACL: 'public-read' }).promise();
        console.log('finished to upload the file');

    } catch (e) {
        console.log('an error occurred!: ', e);
    }
})();

