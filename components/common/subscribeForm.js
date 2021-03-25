import React, { useState } from "react";

const SubscribeForm = (props) => {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setDisableSubmit(false);
    setEmail(e.target.value);
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
    const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
    try {
      /*global fetch*/
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncodedData,
      }).then(() => {
        setSubmitted(true);
        setEmail("");
        setDisableSubmit(false);
      });
    } catch (err) {
      /*global alert*/
      alert("Error: Please Try Again!");
      console.error(err);
      setDisableSubmit(false);
    }
  };

  const { classes, identifier = "" } = props;
  return (
    <div>
      <form
        netlify
        id={`subscribe-${identifier}`}
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row"
      >
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
          className="btn cursor-pointer filled md:text-sm lg:text-base whitespace-nowrap"
          disabled={disableSubmit}
          type="submit"
          value="Subscribe"
        />
      </form>
      <div className={submitted ? "p-2 mt-4 border-2 border-secondary text-center" : "hidden"}>
        THANK YOU FOR SUBSCRIBING
      </div>
    </div>
  );
};
export default SubscribeForm;
