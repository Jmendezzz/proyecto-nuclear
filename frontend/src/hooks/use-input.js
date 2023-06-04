import { useState } from "react";

export const useInput = (validator) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const blurChangeHandler = () => {
    setIsTouched(true);
  };

  const isInvalid = validator(inputValue) && isTouched;

  return {
    value: inputValue,
    isInvalid,
    valueChangeHandler,
    blurChangeHandler,
  };
};
