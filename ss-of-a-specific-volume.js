# simple-lambda-function-to-take-EBS-Snapshots
simple lambda function to take EBS Snapshots in Node 18.x


console.log("Loading function");
import { EC2 } from "@aws-sdk/client-ec2";
const client = new EC2({ region: "us-west-2" });
export const handler = async (event, context) => {
  const params = {
    VolumeId: "vol-09fe4f9de282c3dfb",
  };
  try {
    const data = await client.createSnapshot(params);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err, err.stack);
    throw err;
  }
};
