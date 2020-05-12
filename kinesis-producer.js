const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const kinesis = new AWS.Kinesis({ apiVersion: '2013-12-02' });
  const s3 = new AWS.S3();
  const Bucket = event.Records[0].s3.bucket.name;
  const Key    = event.Records[0].s3.object.key;
  const data = await s3.getObject({ Bucket, Key }).promise();

  var myParams = {
    Data: data.Body /* Strings will be Base-64 encoded on your behalf */, /* required */
    PartitionKey: 'key1', /* required */
    StreamName: 'my-stream'
  };

  const res = await kinesis.putRecord(myParams).promise();
  console.log(res);
};