console.log("Loading function");
import { EC2 } from "@aws-sdk/client-ec2";
import { Lambda } from "@aws-sdk/client-lambda";
const ec2_client = new EC2({ region: "us-west-2" });
const lambda_client = new Lambda({ region: "us-west-2" });
export const handler = async (event, context) => {
  try {
    const data = await ec2_client.describeVolumes({});
    for (let i = 0; i < data.Volumes.length; i++) {
      const params = {
        FunctionName: "TakeEbsSnapshot",
        Payload: JSON.stringify({ volume: data.Volumes[i].VolumeId }),
        LogType: "Tail",
      };
      const lambdaResult = await lambda_client.invoke(params);
      console.log(lambdaResult);
    }
    return "All snapshots taken successfully!";
  } catch (err) {
    console.log(err, err.stack);
    throw err;
  }
};
