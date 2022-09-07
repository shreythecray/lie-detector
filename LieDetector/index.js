const { CourierClient } = require("@trycourier/courier");
const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const apikey = process.env["API_KEY"];
const courier = CourierClient({ authorizationToken: apikey });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));

    const emotions = await analyze_face();
    const anger = emotions.anger;
    const angerJSON = JSON.stringify(anger, null, 2);
    const neutral = emotions.neutral;
    const neutralJSON = JSON.stringify(neutral, null, 2);
    const contempt = emotions.contempt;
    const contemptJSON = JSON.stringify(contempt, null, 2);

    let deceptive = false;

    if((angerJSON > 0)||(neutralJSON > 0)||(contemptJSON > 0)) {
        deceptive = true;
    }

    if(deceptive) {
        const { requestId } = await courier.send({
            message: {
              to: {
                email: "courier.demos+liedetector@gmail.com",
              },
              content: {
                title: "Mule Identified!",
                body: "Beware! The mule's name is {{name}}.",
              },
              data: {
                name: name,
              },
              routing: {
                method: "single",
                channels: ["email"],
              },
            },
          });
    }

    
    const responseMessage = "The HTTP trigger function ran successfully.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            responseMessage,
            "anger": angerJSON,
            "neutral": neutralJSON,
            "contempt": contemptJSON

        }
    };
}

async function analyze_face() {
  const faceKey = process.env["FACE_API_KEY"];
  const faceEndPoint = process.env["FACE_ENDPOINT"];
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  const url =
    "https://www.allkpop.com/upload/2021/12/content/231225/web_data/allkpop_1640280755_untitled-1.jpg";
  const options = {
      returnFaceAttributes: ["emotion"]
  };
  const result = await client.face.detectWithUrl(url, options)
  return result[0].faceAttributes.emotion;
}

