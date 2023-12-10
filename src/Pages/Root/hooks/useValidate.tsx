import { useReducer } from "react";

import { VALIDATION_CHECK_VALUE } from "../lib/validationCheckValue";

interface CheckValue {
  value?: string;
  type: "email" | "name" | "userName" | "password" | "password2";
}

interface Validate {
  isEmail: boolean | null;
  isUserName: boolean | null;
  isName: boolean | null;
  isPassword: boolean | null;
  isPassword2: boolean | null;
}

export type ValidationReducerType =
  | { type: "SET_IS_EMAIL"; payload: boolean | null }
  | { type: "SET_IS_USERNAME"; payload: boolean | null }
  | { type: "SET_IS_NAME"; payload: boolean | null }
  | { type: "SET_IS_PASSWORD"; payload: boolean | null }
  | { type: "SET_IS_PASSWORD2"; payload: boolean | null }
  | { type: "RESET" };

const reducer = (state: Validate, action: ValidationReducerType) => {
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
        isEmail: null,
        isUserName: null,
        isName: null,
        isPassword: null,
        isPassword2: null
      };
  }
};
const initValue = {
  isEmail: null,
  isUserName: null,
  isName: null,
  isPassword: null,
  isPassword2: null
};

const useValidate = () => {
  const [{ isEmail, isUserName, isName, isPassword, isPassword2 }, dispatch] =
    useReducer(reducer, initValue);

  const checkChangeValueForValidate = ({ value, type }: CheckValue) => {
    if (!value) {
      return;
    }
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
