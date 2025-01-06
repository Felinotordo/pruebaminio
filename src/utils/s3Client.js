import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "http://127.0.0.1:9000", 
  region: "us-east-1",
  credentials: {
    accessKeyId: "admin", 
    secretAccessKey: "admin123", 
  },
  forcePathStyle: true, // Necesario para MinIO
});

export default s3Client;
