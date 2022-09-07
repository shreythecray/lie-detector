# Build a Serverless Lie Detector that uses AI for Facial Recognition (with Node.js, Azure Functions, Azure Face API, and Courier API)

GitHub Repository: https://github.com/shreythecray/lie-detector

Follow along the video tutorial:
{% TBD %}

## Open Source

- [ ] Fork this repository
- [ ] Add a link to your version of this project at the end of the readme.md file
- [ ] Make a pull request to this repository
- [ ] Start building on top of the code

## Introduction

We will be building a serverless application that uses Artificial Intelligence to conduct facial recognition and uses Courier to send alerts based on the results.
We just launched our first hackathon, and are giving away over $1K in prizes! Join us in building a cool project and winning any of the following prizes 🏆
* **Courier Hacks 1st Place:** Top submission for use for notifications and demonstration of proper app-to-user notifications with the Courier API will receive $1000 via Zelle or PayPal.
* **Courier Hacks 2nd Place:** 2nd Place submission for use for notifications and demonstration of proper app-to-user notifications with the Courier API will receive the Apple AirPods Pro.
* **Public Favorite:** Public favorite winner will receive a Keychron Keyboard.
* **Runners-Up:** Runners-up submissions will receive a Hydro Flask.

Additionally, everyone who submits a project successfully integrating the Courier API will receive a $20 Amazon gift card!

Not sure where to start? In this tutorial, we will be building a Serverless lie detector that uses Artificial IntelligenceI for Facial Recognition.

## What’s going on?

Let’s get started. Headquarters is telling us that we have been betrayed and one of our spies has been leaking sensitive, top secret information to our enemies. As secret agents, our goal is to build a lie detector that will alert our spy network when we identify the mole. We will use Azure’s Cognitive Services to conduct facial recognition on everyone within our team and when the Face API recognizes that one of our spies is being deceitful, we will use Courier to broadcast the identity of the mole to our spy network.

Some spies prefer reading emails and others prefer reading texts, so we need to make sure that our app can accommodate all spy preferences.

**Note:** The first 3 Secret Agents to successfully complete this tutorial and task will receive a top secret gift from HQ via Courier.

In Part 1, we will create our serverless application using Azure Functions. In Part 2, we will first integrate the Gmail and Twilio APIs, which Courier will use to send emails and text messages. In Part 3, we will demonstrate how to send single messages and setup routing to send multi-channel notifications from the Azure function. And finally, in Part 4, we will explore Azure Cognitive Services and integrate the Face API to analyze emotions and use the Courier API to send alerts when specific deceiving emotions are detected.

Our hackathon has started and submissions close on September 28th. Register now to submit this project for a chance to win some cool prizes.

Register for the Hackathon: [https://courier-hacks.devpost.com/](https://courier-hacks.devpost.com/)

## Instructions

### Part 1: Create serverless application using Azure Functions

We first need to set up our local development environment to enable using Azure and testing our code.
* Install the following VS Code Extensions:
  * Azure Tools to create Azure Functions,
  * REST Client to test our Azure Function calls (this is an alternative to Postman or Insomnia).

Once the two Extensions have been successfully installed, check the left menu for Azure’s A symbol. Completely close and reopen VS Code if the symbol does not automatically appear.

To build an HTTP Trigger Function:
* Click on the Azure symbol to open Azure locally. Here we are prompted to sign into our Azure account.
* After signing in, we need to open an Azure Subscription or create a new one.
  * [Note that students can get free credits for Azure.](https://azure.microsoft.com/en-us/free/students/)

If the subscription is not showing up locally, follow instructions from the [documentation on how to set up our account](https://github.com/microsoft/vscode-azure-account/wiki/Troubleshooting#setup-your-azure-account), which tells us to sign out of Azure on VS Code and sign back in.

* Once the subscription appears, click on “Workspace” and create a new project.
* Determine where we need to save the files within this project and how we want to name it, locally.

Once the location has been selected, we are prompted to make a few decisions about the type of function we want to create.

* Select JavaScript for the language
* Select HTTP Trigger for template
* Rename the function to LieDetector (or any unique name)
* Select Function for the Authorization Level.
* Open the project to start coding.

The settings can be edited later within the function.json file. Let’s open the index.js file and take a moment to understand the boilerplate function.

```javascript
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
```

Line #4 demonstrates how we can get data from the function query or request body. Line #5 contains a string assigned to a variable named `responseMessage`, which uses the data from line #4. On lines #9-12, this variable is then passed into the response object, `context.res`.

### Part 2: Authorize Courier to send messages using Gmail and Twilio APIs

Courier sends messages by consolidating multiple API calls into one. In this second Part, we will need to authorize our API to send messages via the Gmail and Twilio APIs.

* [Log in to your Courier account](https://bit.ly/3QPiFg3) and create a new secret workspace.
* For onboarding, select the email channel and let Courier build with Node.js. Start with the Gmail API since it only takes seconds to set up. All we need to do to authorize is log in via Gmail. Now the API is ready to send messages.
* Copy the starter code, a basic API call using cURL, and paste it in a new terminal. It already has saved your API key and  knows which email address you want to send to, and has a message already built in.

Once you can see Agent Pigeon dancing, we are ready to use Courier to communicate with our spies. Before we build out our application, we need to set up the Twilio provider to enable text messages.

* Head over to “Channels" in the left menu and search for Twilio. You will need an Account SID, Auth Token, and a Messaging Service SID to authorize Twilio.
* Open [twilio.com](http://twilio.com), login and open the Console, and find the first two tokens on that page. Save the Account SID and Auth Token in Courier.

Lasty, you need to locate the Messaging Service SID, which you create in the Messaging tab on the left menu. Checkout Twilio’s docs on [how to create a Messaging Service SID](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services), linked in the description.

* Once we have all three pieces of information, install the provider. Now your Courier account is authorized to send any email or SMS within one API call.

### Part 3: Send single and multi-channel notifications from the Azure function

We can use Courier to send single messages or setup routing to send multi-channel notifications from within the Azure function. In this third Part, we will start sending messages and will be referring to the Courier Node.js quick start, which outlines how to get started with the SDK, and can be found within the Docs page on [courier.com](http://courier.com).

If you would rather use the Courier API, check out the [Secret Message tutorial](https://www.courier.com/blog/hackathon-courier-api-nodejs/) for instructions or [Courier’s API Reference](https://www.courier.com/docs/reference/) for documentation.

The [SDK documentation](https://www.courier.com/docs/guides/getting-started/nodejs/) walks us through getting access to the API key.
* Find the API key on [https://app.courier.com/settings/api-keys](https://app.courier.com/settings/api-keys).
* Save the API key in the local.settings.json file and bring it into the index.js file as `const apiKey = process.env["API_KEY"]`. This application can now be authorized to use our Courier account.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "API_KEY": "replace-with-your-key"
  }
}
```

* Install the Courier SDK by running the following command in the terminal: `npm install @trycourier/courier`
* Use the require function to import the SDK into the index.js file.

```javascript
const { CourierClient } = require("@trycourier/courier");
```

The last step is to walk through the API call within the API docs and integrate it into our codebase.

```javascript
import { CourierClient } from "@trycourier/courier";
// alternatively:
// const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient({ authorizationToken: "YOUR_AUTH_TOKEN_HERE" });

const { requestId } = await courier.send({
  message: {
    to: {
      email: "email@example.com",
    },
    content: {
      title: "Welcome!",
      body: "Thanks for signing up, {{name}}",
    },
    data: {
      name: "Peter Parker",
    },
    routing: {
      method: "single",
      channels: ["email"],
    },
  },
});
```

* Copy line #5 and paste it above and outside the async function (Azure function).
* Everything within lines #7-24 is related to the actual message sending, and needs to be placed inside the async function.

The code on lines #8-23 defines the message object, which provides data to Courier about the messages - the `to` object about the user receiving the notification, the `content` object about what the message contains, the `data` object about any variables that impact the `content` object or conditions for the outgoing notifications, and the `routing` object about the types of notifications being sent.

* Update the email that this message is being sent to. To protect the identities of our spies, we will use fake contact information here. 
* Update the message here, for example we can change the `title` or email subject to `Mule Identified` and the `body` to `Beware! The mule is {{name}}.` In this case, we can either hardcode the name or get it from the HTTP trigger function body.
* Update the `responseMessage` and log it to the console. This new `responseMessage` will indicate to us that this HTTP triggered function runs successfully by outputting the `requestId` response from the Courier API call.
* To run this function locally, first run the `func start` command in the terminal, which will enable the trigger for this function (and all functions within this project, if there were others). This command will also return to us the corresponding local endpoint that we can use to trigger this function.

```javascript
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
```

We can use Postman or Insomnia to test this function. Here we will use the REST Client VS Code extension, which we installed earlier
* Create a request.http file.
* To create a new test call, type `###` at the top of the request.http file.
* Below, define the type of request, in this case `POST`, and paste the endpoint next to it.
* The body of this function call still needs to be defined under the endpoint. Create an object that contains a `name` parameter and define it as `Secret Agent Pigeon.`

```
###
POST http://localhost:7071/api/LieDetector

{
    "name": "Secret Agent Pigeon"
}

```

### Part 4: Analyze emotions with the Face API send alerts with Courier

Azure Cognitive Services enables us to add cognitive capabilities to apps through APIs and AI services. [Check out all of the services provided.](https://azure.microsoft.com/en-us/services/cognitive-services/#overview) In this final part, we will explore Azure Cognitive Services and integrate the Face API to analyze emotions and use the Courier API to send alerts when specific deceiving emotions are detected.

* In order to access the Face API, navigate to the [Azure portal](https://portal.azure.com/).
* “Create a Resource” and locate “AI + Machine Learning” in the list of categories on the left. 
* Select “Face” from the list of services that appear and update the settings based on our preferences and account. 
* Hit “Review + Create” and then “Create” to begin the deployment process (this takes a few minutes to complete).
* Once deployment is complete, head over to the resource, navigate to “Keys and Endpoints” on the left menu under “Resource Management”, copy one of the keys and the endpoint, and save them within our project in the local.settings.json file.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "API_KEY": "replace-with-your-key",
    "FACE_API_KEY": "replace-with-your-azure-key",
    "FACE_ENDPOINT": "replace-with-your-azure-endpoint"
  }
}
```

These values are treated as secret keys and this file is included in the .gitignore.

Just as we used the Courier SDK, we will use the Face service with Azure’s SDK, which can be found on the [Azure Cognitive Services npm page](https://www.npmjs.com/package/@azure/cognitiveservices-face). We will need to use both commands on this page.
* Run `npm install @azure/cognitiveservices-face` in the terminal to install the Face service SDK.
* Run `npm install @azure/ms-rest-azure-js` in the terminal to install the REST Azure Client.
* Copy the sample Face API call from the sample code and place it into our codebase.
* Move the import statements to the top, above the Azure Function.

```javascript
const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const faceKey = process.env["faceKey"] || "<faceKey>";
  const faceEndPoint = process.env["faceEndPoint"] || "<faceEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  const url =
    "https://pbs.twimg.com/profile_images/3354326900/3a5168f2b45c07d0965098be1a4e3007.jpeg";
  const options = {
    returnFaceLandmarks: true
  };
  client.face
    .detectWithUrl(url, options)
    .then(result => {
      console.log("The result is: ");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

Now, we can update the variables within the code snippet.

* Update the name of the function on line #43 and the associated function call on line #65 to `analyze_face()`.
* Fix the key names on lines #44 and #45 to match the names we created in the local.settings.json file.
* Line #49 contains the image this API will analyze. Find a link to an image of our own - to protect the identities of our spies, we will use IU’s image.
* Change the `options` object between lines #50 to #52 to `returnFaceAttributes` and add an array with `emotion` as the value.

```javascript
async function analyze_face() {
  const faceKey = process.env["FACE_API_KEY"];
  const faceEndPoint = process.env["FACE_ENDPOINT"];
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
  const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
  const url =
    "https://www.allkpop.com/upload/2021/12/content/231225/web_data/allkpop_1640280755_untitled-1.jpg";
  const options = {
    returnFaceAttributes: ["emotions"]
  };
  client.face
    .detectWithUrl(url, options)
    .then(result => {
      console.log("The result is: ");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

analyze_face();
```

Finally, we need to be able to manipulate the response from this API call.
* Save the response in a variable called `result`.
* Convert the response into a JSON string using the `stringify` method.

```javascript
const result = await client.face.detectWithUrl(url, options);
const resultJSON = JSON.stringify(result, null, 2);
```

When we use the REST Client to test our function, we run into an error. The result is not being displayed, which means that for some reason, `analyze_face()` is not returning the correct response. We can check the Face API reference to determine the cause of the error. We can first attempt to resolve the issue by removing a specific `emotion` from the result object.

```javascript
const result = await client.face.detectWithUrl(url, options);
const anger = result[0].faceAttributes.emotion.anger;
const angerJSON = JSON.stringify(anger, null, 2);
```

The actual error stems from a typo on line #51 where the object being returned is not plural and should be called `emotion`. When we test the code, we can see that the anger emotion has a value of 0, which matches the image we selected.

```javascript
const options = {
      returnFaceAttributes: ["emotion"]
  };
```

* Finally, instead of returning the value of a single emotion, update the `analyze_face()` function to return the entire `emotion` object. This will enable us to compare values of multiple emotions and determine whether or not the face being analyzed is deceitful.

```javascript
const result = await client.face.detectWithUrl(url, options);
return result[0].faceAttributes.emotion;
```

Following instructions from Headquarters, we know that our questions should only invoke specific reactions. If a face shows any hint of anger, neutral, or contempt emotions, we will have to assume that the person being questioned is the mule.

* Extract these emotions.

```javascript
const emotions = await analyze_face();
const anger = emotions.anger;
const angerJSON = JSON.stringify(anger, null, 2);
const neutral = emotions.neutral;
const neutralJSON = JSON.stringify(neutral, null, 2);
const contempt = emotions.contempt;
const contemptJSON = JSON.stringify(contempt, null, 2);
```

* With a simple condition, compare them to 0.

```javascript
if((angerJSON > 0)||(neutralJSON > 0)||(contemptJSON > 0)) {
        deceptive = true;
    }
```


* Send out alerts to our entire spy network if and when these values are larger than 0.

```javascript
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
```

## Conclusion

Our lie detector is ready and will alert our spies anytime a captive tries to mess with us. Try building a lie detector of your own and alerting courier.demos+liedetector@gmail.com and we will send the first 3 Secret Agents to complete this task a gift! Head over to [courier.com/hack-now](http://courier.com/hack-now) to get started. Don’t forget to submit your project to our [Hackathon](https://courier-hacks.devpost.com/) for a chance to win over $1000 in cash and prizes!

# Quick Links

🔗 GitHub Repository: https://github.com/shreythecray/lie-detector

🔗 Video tutorial: TBD

🔗 Courier: [app.courier.com](https://bit.ly/3QPiFg3)

🔗 Register for the Hackathon: [https://courier-hacks.devpost.com/](https://courier-hacks.devpost.com/)

🔗 Courier's Get Started with Node.js: [https://www.courier.com/docs/guides/getting-started/nodejs/](https://www.courier.com/docs/guides/getting-started/nodejs/)

🔗 Courier Send API Docs: [https://www.courier.com/docs/reference/send/message/](https://www.courier.com/docs/reference/send/message/)

🔗 Twilio Messaging Service SID Docs: [https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services)

🔗 Courier API Reference: [https://www.courier.com/docs/reference/](https://www.courier.com/docs/reference/)

🔗 Azure for Students: [https://azure.microsoft.com/en-us/free/students/](https://azure.microsoft.com/en-us/free/students/)

🔗 Troubleshooting Azure Account Setup: [https://github.com/microsoft/vscode-azure-account/wiki/Troubleshooting#setup-your-azure-account](https://github.com/microsoft/vscode-azure-account/wiki/Troubleshooting#setup-your-azure-account)

🔗 Azure Cognitive Services: [https://azure.microsoft.com/en-us/services/cognitive-services/#overview](https://azure.microsoft.com/en-us/services/cognitive-services/#overview)

🔗 Azure Portal: [https://portal.azure.com/](https://portal.azure.com/)

🔗 Azure Cognitive Services SDK: [https://www.npmjs.com/package/@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face)


{% embed TBD %}

# Your projects

* Your Name/linked social media: link to project
* [@shreythecray](https://twitter.com/shreythecray): https://github.com/shreythecray/lie-detector