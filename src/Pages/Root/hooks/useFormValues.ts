import { useReducer } from "react";

export interface FormValues {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}
type FormValueAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD2"; payload: string };

const reducer = (state: FormValues, action: FormValueAction) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PASSWORD2":
      return { ...state, password2: action.payload };
  }
};

const initValues = {
  email: "",
  userName: "",
  name: "",
  password: "",
  password2: ""
};

const useFormValues = () => {
  const [{ email, userName, name, password, password2 }, dispatch] = useReducer(
    reducer,
    initValues
  );

  return {
    formValues: { email, name, userName, password, password2 },
    dispatch
  };
};

export default useFormValues;
