import { useState } from "react";

export const useInput = ()=>{
    const [inputValue, setInputValue] = useState("");

const valueChangeHandler = (event) => {

  setInputValue(event.target.value);
};

return{
    value:inputValue,
    valueChangeHandler,

}

}

