"use server";

import {
  _Object,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3Config = {
  region: process.env.AWS_REGION_NEW || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_NEW || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_NEW || "",
  },
};

const client = new S3Client(S3Config);

export const getSignedUrlForUpload = async (fileName: string, fileType: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_NEW,
    Key: `public/${fileName}`,
    ContentType: fileType,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command);

  return url;
};

export const listPublicFiles = async () => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_NEW,
    Prefix: "public/",
  };
  const data = await client.send(new ListObjectsV2Command(params));
  const contents: _Object[] = data.Contents ?? [];
  return contents;
};

export const signedUrlForPutUserFile = async (
  fileName: string,
  fileType: string,
  userId: string
) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_NEW,
    Key: `${userId}/${fileName}`,
    ContentType: fileType,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command);

  return url;
};

export const listUserFiles = async (userId: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_NEW,
    Prefix: `${userId}/`,
  };
  const data = await client.send(new ListObjectsV2Command(params));
  const contents: _Object[] = data.Contents ?? [];
  return contents;
};

export const getSignedUrlForDownload = async (fileName: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME_NEW,
    Key: `${fileName}`,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(client, command, { expiresIn: 20 });

  return url;
};
