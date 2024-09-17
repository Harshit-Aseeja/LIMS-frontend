import { useState } from "react";

const useInput = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const onChangeHandler = (event) => {
    setValue(event.target.value);
  };
  return { value, setValue, onChangeHandler };
};

export default useInput;
