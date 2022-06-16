import React from "react";
import styled from "styled-components";

const ConfirmModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
`;

const ModalItemContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 60vw;
  height: 30vh;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.background100};
  .info-container {
    p {
      margin-top: 1.5rem;
    }
  }
  .button-container {
    align-self: flex-end;
    button {
      font-size: 1.8rem;
      margin-left: 0.8rem;
      background-color: unset;
      border: 0;
      padding: 0.6rem 1.2rem;
      color: ${(props) => props.theme.color.fontColorWhite};
    }
    .cancel-button {
      background-color: ${(props) => props.theme.color.gray400};
    }
    .confirm-button {
      background-color: ${(props) => props.theme.color.error700};
    }
  }
`;

interface IConfirmDeleteModalProps {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDeleteModal = ({
  setIsDelete,
  setIsConfirmModal,
}: IConfirmDeleteModalProps) => {
  return (
    <ConfirmModal>
      <ModalItemContainer>
        <div className="info-container">
          <h1>정말 삭제하실껀가요?</h1>
          <p>삭제하면 복구할 수 없습니다.</p>
        </div>
        <div className="button-container">
          <button className="confirm-button" onClick={() => setIsDelete(true)}>
            삭제하기
          </button>
          <button
            className="cancel-button"
            onClick={() => setIsConfirmModal(false)}>
            돌아가기
          </button>
        </div>
      </ModalItemContainer>
    </ConfirmModal>
  );
};

export default ConfirmDeleteModal;
