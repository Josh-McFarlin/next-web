import * as React from "react";
import Portal from "../Portal";
import classes from "./MobileModal.module.scss";

interface PropTypes {
  open: boolean;
  title?: string;
  closable?: boolean;
  closeModal?: () => void;
  actions: {
    title: string;
    action?: () => any;
    component?: React.ReactNode;
  }[];
}

const MobileModal = ({
  open,
  title = "Edit",
  closeModal,
  closable = closeModal != null,
  actions,
}: PropTypes) => {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <Portal>
      <div className={classes.root}>
        <div className={classes.paper}>
          <h1 className={classes.title}>{title}</h1>
          <div className={classes.actionsContainer}>
            {actions.map(({ title, action, component }) => (
              <div key={title} className={classes.actionWrapper}>
                {component != null ? (
                  component
                ) : (
                  <button className={classes.action} onClick={action}>
                    {title}
                  </button>
                )}
              </div>
            ))}
          </div>
          {closable && closeModal != null && (
            <button className={classes.closeButton} onClick={closeModal}>
              Close
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default MobileModal;
