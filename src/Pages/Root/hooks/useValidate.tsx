import { useReducer } from "react";

import { VALIDATION_CHECK_VALUE } from "../lib/validationCheckValue";

interface CheckValue {
  value: string;
  type: "email" | "name" | "userName" | "password" | "password2";
}

interface Validate {
  isEmail: boolean;
  isUserName: boolean;
  isName: boolean;
  isPassword: boolean;
  isPassword2: boolean;
}

type Reducer =
  | { type: "SET_IS_EMAIL"; payload: boolean }
  | { type: "SET_IS_USERNAME"; payload: boolean }
  | { type: "SET_IS_NAME"; payload: boolean }
  | { type: "SET_IS_PASSWORD"; payload: boolean }
  | { type: "SET_IS_PASSWORD2"; payload: boolean }
  | { type: "RESET" };

const reducer = (state: Validate, action: Reducer) => {
  switch (action.type) {
    case "SET_IS_EMAIL":
      return { ...state, isEmail: action.payload };
    case "SET_IS_USERNAME":
      return { ...state, isUserName: action.payload };
    case "SET_IS_NAME":
      return { ...state, isName: action.payload };
    case "SET_IS_PASSWORD":
      return { ...state, isPassword: action.payload };
    case "SET_IS_PASSWORD2":
      return { ...state, isPassword2: action.payload };
    case "RESET":
      return {
        isEmail: false,
        isUserName: false,
        isName: false,
        isPassword: false,
        isPassword2: false
      };
  }
};
const initValue = {
  isEmail: false,
  isUserName: false,
  isName: false,
  isPassword: false,
  isPassword2: false
};

const useValidate = () => {
  const [{ isEmail, isUserName, isName, isPassword, isPassword2 }, dispatch] =
    useReducer(reducer, initValue);

  const checkChangeValueForValidate = ({ value, type }: CheckValue) => {
    const checkValue = VALIDATION_CHECK_VALUE[`${type}`].regex.test(value);
    return checkValue;
  };

  return {
    validate: {
      isEmail,
      isUserName,
      isName,
      isPassword,
      isPassword2
    },
    dispatch,
    checkChangeValueForValidate
  };
};

export default useValidate;
