import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const ClipbordStateMessage = styled(motion.span)`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 5rem;
  margin: 0 auto;
  text-align: center;
  font-size: 2.4rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  z-index: 20;
  box-sizing: border-box;
  padding: 3rem 2rem;
  border: 0;
  border-radius: 0.8rem;
  width: 100%;
  max-width: 1020px;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
`;

interface ICopyTextModalProps {
  text: string;
}

const CopyTextModal: React.FC<ICopyTextModalProps> = ({ text }) => {
  return (
    <AnimatePresence>
      {text !== "" && (
        <ClipbordStateMessage
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}>
          {text}
        </ClipbordStateMessage>
      )}
    </AnimatePresence>
  );
};

export default CopyTextModal;
