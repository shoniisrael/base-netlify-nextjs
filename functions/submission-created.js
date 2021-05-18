const client = require("@sendgrid/mail");
const https = require("https");
const url = require("url");

const remote = (fileUrl) =>
  new Promise((resolve) => {
    https.get(url.parse(fileUrl), function (res) {
      var data = [];

      res
        .on("data", function (chunk) {
          data.push(chunk);
        })
        .on("end", function () {
          var buffer = Buffer.concat(data);
          resolve(buffer.toString("base64"));
        });
    });
  });

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, SENDGRID_SENDER_NAME } = process.env;

async function getAttatchments(file, name) {
  if (!file) {
    return [];
  }
  const filename = `${name}.pdf`;
  const base64File = await remote(file);
  return [
    {
      content: base64File,
      filename,
      type: "application/pdf",
      disposition: "attachment",
    },
  ];
}
async function sendEmail({
  client,
  downloadName = "",
  file = "",
  receiverEmail,
  name = "",
  templateId,
}) {
  const attachments = await getAttatchments(file, downloadName);
  return new Promise((fulfill, reject) => {
    const data = {
      personalizations: [
        {
          to: [{ email: receiverEmail }],
          dynamicTemplateData: { downloadName, name },
        },
      ],
      from: { email: SENDGRID_SENDER_EMAIL, name: SENDGRID_SENDER_NAME },
      attachments,
      templateId,
    };
    client
      .send(data)
      .then(([response]) => {
        fulfill(response);
      })
      .catch((error) => reject(error));
  });
}

exports.handler = function (event, _, callback) {
  const body = JSON.parse(event.body);
  const { payload } = body;
  const { data } = payload;
  const { downloadName, email, file, "first-name": name, idTemplate } = data;
  console.info("Data received from form: ", data);
  const templateId = idTemplate;
  client.setApiKey(SENDGRID_API_KEY);
  sendEmail({
    client,
    downloadName,
    receiverEmail: email,
    file,
    name,
    templateId,
  })
    .then((response) => callback(null, { statusCode: response.statusCode }))
    .catch((err) => callback(err, null));
};
