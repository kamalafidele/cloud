const AWS = require('aws-sdk');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const { AWS_ACCESS_KEY, AWS_ACCESS_SECRET_ID } = process.env;

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
        const objects = await storage.listObjects({ Bucket: 'happierleadsstorage'}).promise();
        console.log(objects);
        
        const file = "C:\\Users\\lo\\Videos\\SONGS\\Hall.mp4";
        const object = await storage.getObject({ Bucket: 'happierleadsstorage', Key: 'Hall_song.mp4'}).promise();
        

        const written = fs.writeFileSync('Hall_song.mp4',object.Body);
        console.log('finished to write the file');

        const data = fs.readFileSync(file);
        const uploaded = await storage.upload({ Body: data,  Bucket: 'happierleadsstorage', Key: 'Hall_song.mp4' }).promise();
        console.log('finished to upload the file');

    } catch (e) {
        console.log('an error occurred!: ', e);
    }
})();

