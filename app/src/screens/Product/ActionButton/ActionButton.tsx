import * as React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import IosRefresh from "react-ionicons/lib/IosRefresh";
import IosCheckmark from "react-ionicons/lib/IosCheckmarkCircleOutline";
import IosAlert from "react-ionicons/lib/IosAlertOutline";
import { selectActionStatus } from "../../../utils/store/cart/selectors";
import classes from "./ActionButton.module.scss";

interface PropTypes extends React.HTMLProps<HTMLButtonElement> {
  onClick: () => any;
  children: React.ReactNode;
}

const ActionButton = ({ className, children, onClick, ...rest }: PropTypes) => {
  const actionStatus = useSelector(selectActionStatus);
  const [clicked, setClicked] = React.useState<boolean>(false);

  const handleClick = (): any => {
    setClicked(true);

    return onClick();
  };

  const isLoading = actionStatus.actionLoading;
  const wasSuccess =
    !actionStatus.actionLoading && actionStatus.actionError == null && clicked;
  const wasError =
    !actionStatus.actionLoading && actionStatus.actionError != null && clicked;

  const text = wasSuccess ? "Success!" : wasError ? "Error :(" : children;

  return (
    <button
      className={clsx(
        classes.root,
        wasSuccess && classes.success,
        wasError && classes.error,
        className
      )}
      onClick={handleClick}
      disabled={actionStatus.actionLoading || wasSuccess || wasError}
      type={"button" as any}
      {...rest}
    >
      {isLoading && <IosRefresh fontSize="32px" color="#347eff" rotate />}
      {wasSuccess && <IosCheckmark fontSize="32px" color="#347eff" />}
      {wasError && <IosAlert fontSize="32px" color="#347eff" />}
      {text}
    </button>
  );
};

export default ActionButton;
