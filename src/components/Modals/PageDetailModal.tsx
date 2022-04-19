import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { movingCard, opacity } from "../../animation variants/modalAnimation";
import { SetterOrUpdater } from "recoil";
import { JsxChild, JsxElement } from "typescript";

const Wrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const ModalBackground = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.8);
`;

const DetailContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.white};
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 86%;
  padding: 1rem 2rem;
  border-radius: 2rem 2rem 0 0;
  z-index: 13;
  .toastui-editor-contents {
    h4 {
      font-size: 2.2rem;
      line-height: 1.5;
    }
    h5 {
      font-size: 2rem;
      line-height: 1.5;
    }
    p {
      font-size: 1.6rem;
    }
  }
`;

interface IPageDetailModal extends React.HTMLAttributes<HTMLDivElement> {
  setDetailItem: SetterOrUpdater<boolean>;
}

function PageDetailModal({ setDetailItem, children }: IPageDetailModal) {
  const modalHandler = () => {
    setDetailItem(false);
  };

  useEffect(() => {
    document.body.style.cssText = `position:fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position : ""; top:"";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <Wrapper variants={opacity} initial="initial" animate="animate" exit="exit">
      <DetailContainer
        variants={movingCard}
        initial="initial"
        animate="animate"
        exit="exit">
        {children}
      </DetailContainer>
      <ModalBackground onClick={modalHandler} />
    </Wrapper>
  );
}

export default PageDetailModal;
