import React, { Component } from "react";
import CookieConsent from "react-cookie-consent";

class CookieDisclaimer extends Component {
  render() {
    return (
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="dwsCookie"
        contentStyle={{
          flex: "",
        }}
        style={{
          background: "#0C3248",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11.5px",
        }}
        buttonStyle={{
          background: "#65800E",
          color: "#FFFFFF",
          fontSize: "13px",
          borderRadius: "0.25rem",
        }}
        expires={180}
      >
        We use cookies to ensure that we give you the best experience on our website. If you
        continue to use this site we will assume that you are happy with it.
      </CookieConsent>
    );
  }
}

export default CookieDisclaimer;
