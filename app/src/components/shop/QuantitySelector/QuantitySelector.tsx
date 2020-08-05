import * as React from "react";
import classes from "./QuantitySelector.module.scss";

interface PropTypes {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
}

const QuantitySelector = ({ quantity, setQuantity }: PropTypes) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    return setQuantity(parseInt(value, 10));
  };

  return (
    <label className={classes.root}>
      Quantity
      <input
        type="number"
        min={1}
        defaultValue={quantity}
        onChange={handleQuantityChange}
      />
    </label>
  );
};

export default QuantitySelector;
