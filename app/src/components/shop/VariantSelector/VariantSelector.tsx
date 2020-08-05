/* eslint-disable jsx-a11y/no-onchange */
import * as React from "react";
import { Option } from "shopify-buy";
import classes from "./VariantSelector.module.scss";

interface PropTypes {
  option: Option;
  value: string;
  setOption: (key: string, value: string) => void;
}

const VariantSelector = ({ option, value, setOption }: PropTypes) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    return setOption(option.name, value);
  };

  return (
    <label className={classes.root}>
      {option.name}
      <select name={option.name} value={value} onChange={handleOptionChange}>
        {option.values.map(({ value }: any) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default VariantSelector;
