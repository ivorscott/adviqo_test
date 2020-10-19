import React from "react";
import "./styles.css";

const Loading = () => (
  <div role="alert" aria-busy="true" className="lds-dual-ring">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export { Loading };
