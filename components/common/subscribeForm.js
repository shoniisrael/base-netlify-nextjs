import React, { useState } from "react";
import { useGoogleReCaptcha, GoogleReCaptcha } from "react-google-recaptcha-v3";

const SubscribeForm = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setDisableSubmit(false);
    setEmail(e.target.value);
  };
  const submitData = async (token, data) => {
    const url = `/.netlify/functions/verify-captcha?token=${token}`;
    const fetchUrl = "/";
    try {
      /*global fetch*/
      const response = await fetch(url);
      if (response.ok) {
        let urlEncodedData = "";
        setEmail;
        urlEncodedData = data.join("&").replace(/%20/g, "+");
        fetch(fetchUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedData,
        }).then(() => {
          setSubmitted(true);
          setEmail("");
          setDisableSubmit(false);
        });
      } else {
        /*global alert*/
        alert("Error: Please Try Again!");
      }
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
    setEmail("");
    submitData(result, urlEncodedDataPairs);
  };

  const { classes, identifier = "" } = props;
  return (
    <div>
      <form netlify id={`subscribe-${identifier}`} method="post" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="subscribe" />
        <input type="hidden" name="formType" value="subscribe" />
        <input
          className={classes}
          type="email"
          value={email}
          onChange={handleInputChange}
          name="email"
          placeholder="Your email"
          required
        />
        <input
          className="g-recaptcha btn cursor-pointer filled md:text-sm lg:text-base whitespace-nowrap"
          disabled={disableSubmit}
          type="submit"
          value="Subscribe"
        />
        <GoogleReCaptcha action="subscribe" />
      </form>
      <div className={submitted ? "p-2 mt-4 border-2 border-secondary" : "hidden"}>
        THANK YOU FOR SUBSCRIBING
      </div>
    </div>
  );
};
export default SubscribeForm;
