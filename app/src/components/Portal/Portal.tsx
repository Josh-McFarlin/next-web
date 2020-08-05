import * as React from "react";
import { createPortal } from "react-dom";

interface PropTypes {
  children: React.ReactNode;
  className?: string;
}

const Portal = ({ children, className }: PropTypes) => {
  const portalRoot = document.getElementById("portalRoot") as HTMLElement;
  const newPortal = document.createElement("div");

  React.useEffect(() => {
    newPortal.className = className ?? "";
    portalRoot.appendChild(newPortal);

    return () => {
      portalRoot.removeChild(newPortal);
    };
  }, [newPortal, portalRoot]);

  React.useEffect(() => {
    newPortal.className = className ?? "";
  }, [className]);

  return createPortal(children, newPortal);
};

export default Portal;
