import React, { Component } from "react";
import CustomLink from "./customLink";

class Button extends Component {
  render() {
    const { link, label, style } = this.props;
    const classes = `${style} btn`;
    return (
      <CustomLink classes={classes} link={link}>
        {label}
      </CustomLink>
    );
  }
}

export default Button;
