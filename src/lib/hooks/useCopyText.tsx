import { useState } from "react";

const useCopyText = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");

  const copyText = async (text: string, message: string) => {
    setIsLoading(false);
    if (!isLoading) {
      navigator.clipboard.writeText(text).then(() => {
        setCopyMessage(message);
      });
    }
  };

  return { copyMessage, copyText };
};

export default useCopyText;
