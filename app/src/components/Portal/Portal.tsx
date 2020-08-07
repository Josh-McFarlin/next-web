import * as React from "react";
import { createPortal } from "react-dom";

interface PropTypes {
  children: React.ReactNode;
}

const Portal = ({ children }: PropTypes) => {
  const portalRoot = document.getElementById("portalRoot") as HTMLElement;

  return createPortal(children, portalRoot);
};

export default Portal;
