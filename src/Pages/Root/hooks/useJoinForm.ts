import { useCallback, useEffect, useReducer } from "react";
import { useForm, useWatch } from "react-hook-form";

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

export interface FormValues {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}

const useJoinForm = () => {
  const [{ isEmail, isUserName, isName, isPassword, isPassword2 }, dispatch] =
    useReducer(reducer, initValue);
  const { control, ...rest } = useForm<FormValues>();

  const { email, name, password2, password, userName } = useWatch({
    control
  });

  const isDisabled = !Object.entries({
    isEmail,
    isName,
    isPassword,
    isPassword2,
    isUserName
  }).every(([_, value]) => value);

  const checkChangeValueForValidate = ({ value, type }: CheckValue) => {
    if (!value) {
      return;
    }
    const checkValue = VALIDATION_CHECK_VALUE[`${type}`].regex.test(value);
    return checkValue;
  };

  const validateEmail = useCallback(() => {
    if (!email) {
      dispatch({
        type: "SET_IS_EMAIL",
        payload: null
      });
      return;
    }
    dispatch({
      type: "SET_IS_EMAIL",
      payload: Boolean(
        checkChangeValueForValidate({ type: "email", value: email })
      )
    });
  }, [email]);

  const validateUserName = useCallback(() => {
    if (!userName) {
      dispatch({
        type: "SET_IS_USERNAME",
        payload: null
      });
      return;
    }
    dispatch({
      type: "SET_IS_USERNAME",
      payload: Boolean(
        checkChangeValueForValidate({ type: "userName", value: userName })
      )
    });
  }, [userName]);

  const validateName = useCallback(() => {
    if (!name) {
      dispatch({
        type: "SET_IS_NAME",
        payload: null
      });
      return;
    }
    dispatch({
      type: "SET_IS_NAME",
      payload: Boolean(
        checkChangeValueForValidate({ type: "name", value: name })
      )
    });
  }, [name]);

  const validatePassword = useCallback(() => {
    if (!password || !password2) {
      dispatch({
        type: "SET_IS_PASSWORD",
        payload: null
      });
      dispatch({
        type: "SET_IS_PASSWORD2",
        payload: null
      });
      return;
    }
    dispatch({
      type: "SET_IS_PASSWORD",
      payload: Boolean(
        checkChangeValueForValidate({ type: "password", value: password })
      )
    });
    dispatch({
      type: "SET_IS_PASSWORD2",
      payload: Boolean(
        checkChangeValueForValidate({ type: "password2", value: password2 })
      )
    });

    if (password !== password2) {
      dispatch({
        type: "SET_IS_PASSWORD2",
        payload: false
      });
      return;
    }
  }, [password, password2]);

  const validateValue = () => {
    validateEmail();
    validateName();
    validateUserName();
    validatePassword();
  };

  useEffect(() => {
    validateValue();
  }, [email, password, password2, name, userName]);

  return {
    validate: {
      isEmail,
      isUserName,
      isName,
      isPassword,
      isPassword2,
      isDisabled
    },
    formValues: {
      email,
      name,
      password2,
      password,
      userName
    },
    formMethod: {
      control,
      ...rest
    },
    dispatch,
    checkChangeValueForValidate
  };
};

export default useJoinForm;
