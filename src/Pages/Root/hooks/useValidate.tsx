import { useState } from "react";

const useValidate = () => {
  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [isUserName, setIsUserName] = useState<boolean | null>(null);
  const [isName, setIsName] = useState<boolean | null>(null);
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [isPassword2, setIsPassword2] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  return {
    isEmail,
    setIsEmail,
    isUserName,
    setIsUserName,
    isName,
    setIsName,
    isPassword,
    setIsPassword,
    isPassword2,
    setIsPassword2,
    isDisabled,
    setIsDisabled
  };
};

export default useValidate;
