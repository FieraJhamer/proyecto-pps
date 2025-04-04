import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import crypto from "crypto";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

/* S3 */
export const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

/* MULTER */
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const key = `${file.fieldname}-${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
      cb(null, key);
    },
  }),
  preservePath: true,
});

export { DeleteObjectCommand };