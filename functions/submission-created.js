const client = require("@sendgrid/mail");
const CryptoJS = require("crypto-js");
const fetch = require("fetch-base64");
const EMAIL_TEMPLATES = {
  CONTACT_US: "d-84174712f23740a7b14366782649a604",
  CASE_STUDY: "d-99d1c273d3c347e3ab9df25e43a310de",
  SUBSCRIBE: "d-ec6c1cadf4424fe4b69ad2b4acb40ca2",
};
const FORM_TYPES = {
  CONTACT_US: "contact-us",
  CASE_STUDY: "case-study",
  SUBSCRIBE: "subscribe",
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
  const decryptedFile = CryptoJS.AES.decrypt(file, NEXT_PUBLIC_SECRET_KEY);
  const fileUrl = decryptedFile.toString(CryptoJS.enc.Utf8);
  const filename = `${name}.pdf`;
  const base64File = await fetch.remote(fileUrl);
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
  caseStudy = "",
  ebook = "",
  file = "",
  receiverEmail,
  templateId,
}) {
  const attachments = await getAttatchments(file, caseStudy || ebook);
  return new Promise((fulfill, reject) => {
    const data = {
      personalizations: [
        {
          to: [{ email: receiverEmail }],
          dynamicTemplateData: { caseStudy, ebook },
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
    default:
      return EMAIL_TEMPLATES.CONTACT_US;
  }
}
exports.handler = function (event, _, callback) {
  const body = JSON.parse(event.body);
  const { payload } = body;
  const { data } = payload;
  const { caseStudy, email, file, formType } = data;
  console.log("🚀 ~ file: submission-created.js ~ line 81 ~ data", data);
  const templateId = getTemplate(formType);
  client.setApiKey(SENDGRID_API_KEY);
  sendEmail({
    client,
    caseStudy,
    receiverEmail: email,
    file,
    templateId,
  })
    .then((response) => callback(null, { statusCode: response.statusCode }))
    .catch((err) => callback(err, null));
};
