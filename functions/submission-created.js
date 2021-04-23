const client = require("@sendgrid/mail");
const fetch = require("fetch-base64");
const EMAIL_TEMPLATES = {
  CONTACT_US: "d-84174712f23740a7b14366782649a604",
  CASE_STUDY: "d-99d1c273d3c347e3ab9df25e43a310de",
  SUBSCRIBE: "d-ec6c1cadf4424fe4b69ad2b4acb40ca2",
  EBOOK: "d-675adaf5924840319f54c379e461b96b",
};
const FORM_TYPES = {
  CONTACT_US: "contact-us",
  CASE_STUDY: "case-study",
  SUBSCRIBE: "subscribe",
  EBOOK: "ebook",
};
const {
  SENDGRID_API_KEY,
  SENDGRID_SENDER_EMAIL,
  SENDGRID_SENDER_NAME,
  NEXT_PUBLIC_SECRET_KEY,
} = process.env;
async function getAttatchments(file, name) {
  if (!file) {
    return [];
  }
  const filename = `${name}.pdf`;
  const base64File = await fetch.remote(file);
  return [
    {
      content: base64File[0],
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
function getTemplate(formType) {
  switch (formType) {
    case FORM_TYPES.CASE_STUDY:
      return EMAIL_TEMPLATES.CASE_STUDY;
    case FORM_TYPES.SUBSCRIBE:
      return EMAIL_TEMPLATES.SUBSCRIBE;
    case FORM_TYPES.EBOOK:
      return EMAIL_TEMPLATES.EBOOK;
    default:
      return EMAIL_TEMPLATES.CONTACT_US;
  }
}
exports.handler = function (event, _, callback) {
  const body = JSON.parse(event.body);
  const { payload } = body;
  const { data } = payload;
  const { downloadName, email, file, formType, "first-name": name } = data;
  console.info("Data received from form: ", data);
  const templateId = getTemplate(formType);
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
