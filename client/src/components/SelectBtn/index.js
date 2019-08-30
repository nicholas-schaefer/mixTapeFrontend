import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SelectBtn(props) {
  return (
    <span className="select-btn" {...props} role="button" tabIndex="0">
      Select
    </span>
  );
}

export default SelectBtn;
