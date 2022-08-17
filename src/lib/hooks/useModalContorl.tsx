import { useState } from "react";

const useModalContorl = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isModal, setIsModal] = useState(false);

  return { isConfirm, setIsConfirm, isModal, setIsModal };
};

export default useModalContorl;
