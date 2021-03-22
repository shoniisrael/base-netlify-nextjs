const fetch = require("node-fetch");
const SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
async function verifyCaptcha(token) {
  const response = await fetch(
    `${SITE_VERIFY_URL}?secret=${process.env.G_RECAPTCHA_KEY}&response=${token}`,
  );
  const data = await response.json();
  return data.success && data.score > 0.5;
}
exports.handler = async function (event) {
  const query = event.queryStringParameters || {};
  const { token } = query;
  const verified = await verifyCaptcha(token);
  return verified ? { statusCode: 200 } : { statusCode: 406 };
};
