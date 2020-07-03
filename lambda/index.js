const AWS = require("aws-sdk");
const Sharp = require("sharp");

const S3 = new AWS.S3({
  region: "ap-northeast-2",
});

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
};
