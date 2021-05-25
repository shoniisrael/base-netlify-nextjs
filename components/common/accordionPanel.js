import React, { Component } from "react";

class AccordionPanel extends Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const node = this.innerRef.current;
    const height = node.scrollHeight;
    this.setState({
      height,
    });
  }

  render() {
    const { label, labelStyles, children, activeTab, index, activateTab } = this.props;
    if (!label) {
      return;
    }
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: `${isActive ? height : 0}px`,
    };
    const bulletStyle = isActive ? "custom-minus-list" : "custom-plus-list";

    return (
      <div>
        <button
          className={`accordion-panel-label pb-3 ${labelStyles} ${bulletStyle}`}
          onClick={activateTab}
        >
          {label}
        </button>
        <div className="accordion-panel-inner pl-8" ref={this.innerRef} style={innerStyle}>
          {children}
        </div>
      </div>
    );
  }
}

export default AccordionPanel;
