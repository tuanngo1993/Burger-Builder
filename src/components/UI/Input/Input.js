import React from "react";

import classes from "./Input.css";

export const input = props => {
  let inputEl = null;
  let validationError = null;
  let inputClassName = [classes.InputElement];

  if(props.invalid && props.touched) {
    inputClassName.push(classes.Invalid);
    validationError = <p>Please enter a valid value!</p>;
  }

  inputClassName = inputClassName.join(" ");

  switch (props.inputtype) {
    case ("input"):
      inputEl = <input {...props} onChange={props.onChange} className={inputClassName} {...props.elementconfig} value={props.value} />;
      break;
    case ("textarea"):
      inputEl = <textarea {...props} onChange={props.onChange} className={inputClassName} {...props.elementconfig} value={props.value} />;
      break;
    case ("select"):
      inputEl = <select {...props} onChange={props.onChange} className={inputClassName} {...props.elementconfig} value={props.value}>
        {
          props.elementconfig.options.map(
            option => <option key={option.value} value={option.value}>{option.displayValue}</option>
          )
        }
      </select>;
      break;
    default:
      inputEl = <input {...props} onChange={props.onChange} className={inputClassName} {...props.elementconfig} value={props.value} />;
  }

  return <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {inputEl}
    {validationError}
  </div>;
};