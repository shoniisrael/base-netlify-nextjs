import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "../common/button";
import ResponsiveImage from "../common/responsiveImage";
import AccordionPanel from "../common/accordionPanel";
import TextUtils from "../../utils/text";
import { linkResolver } from "../../prismic-configuration";

class ImageTopAndText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: -1,
    };
    this.activateTab = this.activateTab.bind(this);
  }

  activateTab(index) {
    this.setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  }

  render() {
    const { primary } = this.props.slice;
    const { top_image: topImage } = primary;
    return (
      <div className="bg-primary-light">
        <div className="container mx-auto pb-12 grid grid-cols-1 md:grid-cols-2">
          <div className={`pb-8 px-10 pt-10 md:pt-24 lg:px-28 md:row-span-2`}>
            {this.renderTextSection()}
          </div>
          <div className="order-first">
            <ResponsiveImage
              image={topImage}
              sizes="(min-width:1536) 648px, (min-width:768) 40vw, 100vw"
            />
          </div>
          <div className="pl-10 pr-3 lg:px-36">{this.renderAccordion()}</div>
        </div>
      </div>
    );
  }

  renderTextSection() {
    const { primary } = this.props.slice;
    const {
      small_image: smallImage,
      title,
      description,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
    } = primary;
    return (
      <div>
        <ResponsiveImage image={smallImage} className="flex-grow-0 pb-4 h-20" sizes="76px" />
        {TextUtils.hasRichText(title) && (
          <div className="text-primary-dark font-bold text-3xl pb-4 md:text-4xl">
            {RichText.render(title, linkResolver)}
          </div>
        )}
        {TextUtils.hasRichText(description) && (
          <div className="text-primary text-base pb-7 pt-2">
            {RichText.render(description, linkResolver)}
          </div>
        )}
        {buttonLabel && (
          <div className="py-5">
            <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
          </div>
        )}
      </div>
    );
  }

  renderAccordion() {
    const { items } = this.props.slice;
    const { activeTab } = this.state;
    return items.map((item, index) => {
      const { title, description } = item;
      return (
        <AccordionPanel
          key={index}
          label={RichText.render(title, linkResolver)}
          labelStyles="text-primary-dark text-base"
          activeTab={activeTab}
          index={index}
          activateTab={this.activateTab.bind(null, index)}
        >
          {TextUtils.hasRichText(description) && (
            <div className="text-primary text-base pb-7 pt-2">
              {RichText.render(description, linkResolver)}
            </div>
          )}
        </AccordionPanel>
      );
    });
  }
}
export default ImageTopAndText;
