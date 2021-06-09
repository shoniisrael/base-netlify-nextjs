import React, { Component } from "react";

class AccordionPanel extends Component {
  render() {
    const { label, labelStyles, children, activeTab, index, activateTab } = this.props;
    if (!label) {
      return;
    }
    const isActive = activeTab === index;
    const bulletStyle = isActive ? "custom-minus-list" : "custom-plus-list";

    return (
      <div>
        <button
          className={`accordion-panel-label pb-3 ${labelStyles} ${bulletStyle}`}
          onClick={activateTab}
        >
          {label}
        </button>
        <div className="accordion-panel-inner pl-8">{isActive && children}</div>
      </div>
    );
  }
}

export default AccordionPanel;
