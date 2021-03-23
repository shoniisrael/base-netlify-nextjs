import React, { useState } from "react";
import { useGoogleReCaptcha, GoogleReCaptcha } from "react-google-recaptcha-v3";

const SubscribeForm = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const submitData = async (token, data) => {
    const url = `/.netlify/functions/verify-captcha?token=${token}`;
    const fetchUrl = "/";
    try {
      /*global fetch*/
      const response = await fetch(url);
      if (response.ok) {
        let urlEncodedData = "";
        urlEncodedData = data.join("&").replace(/%20/g, "+");
        fetch(fetchUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData,
        });
      } else {
        /*global alert*/
        alert("Error: Please Try Again!");
      }
      setDisableSubmit(false);
    } catch (err) {
      alert("Error: Please Try Again!");
      console.error(err);
      setDisableSubmit(false);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setDisableSubmit(true);
    let urlEncodedDataPairs = [];
    for (const pair of event.target.elements) {
      urlEncodedDataPairs.push(
        encodeURIComponent(pair.name) + "=" + encodeURIComponent(pair.value),
      );
    }
    const result = await executeRecaptcha("subscribe");
    submitData(result, urlEncodedDataPairs);
  };

  const { classes } = props;
  return (
    <form netlify id="subscribe" method="post" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="subscribe" />
      <input type="hidden" name="formType" value="subscribe" />
      <input className={classes} type="email" name="email" placeholder="Your email" />
      <input
        className="g-recaptcha btn cursor-pointer filled md:text-sm lg:text-base whitespace-nowrap"
        disabled={disableSubmit}
        type="submit"
        value="Subscribe"
      />

      <GoogleReCaptcha action={"subscribe"} />
    </form>
  );
};
export default SubscribeForm;
