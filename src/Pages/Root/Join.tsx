import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import styled from "styled-components";

import { GUIDE_MESSAGE } from "./lib/guideMessage";

import { Input, Label } from "@/Components";
import { useJoin, useValidate } from "@/Pages/Root/hooks";
import { VALIDATION_CHECK_VALUE } from "@/Pages/Root/lib/validationCheckValue";
import {
  ErrorLabel,
  FormItemContainer,
  GuideLabel,
  RootFormItem,
  SubmitButton,
  Wrapper
} from "@/Pages/Root/Root.styles";

const MessageContainer = styled.div`
  margin-top: -8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

interface FormValues {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
    control
  } = useForm<FormValues>();
  const { email } = useWatch({ control });
  const {
    validate: { isEmail, isName, isPassword, isPassword2, isUserName },
    dispatch: validateDispatch,
    checkChangeValueForValidate
  } = useValidate();

  const validation = useCallback(() => {
    if (!email) {
      return;
    }
    validateDispatch({
      type: "SET_IS_EMAIL",
      payload: Boolean(
        checkChangeValueForValidate({ type: "email", value: email })
      )
    });
  }, [email]);

  useEffect(() => {
    validation();
  }, [email]);

  const isDisabled = Object.entries({
    isEmail,
    isName,
    isPassword,
    isPassword2,
    isUserName
  }).every(([_, value]) => value);

  const { mutate: joinMutate, isSuccess } = useJoin();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    joinMutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <Wrapper>
        <MessageContainer>
          <h1>가입하신것을 축하드립니다! 😙</h1>
          <p>로그인 화면으로 이동합니다.</p>
        </MessageContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>회원가입</h1>
      <form onSubmit={onSubmit}>
        <FormItemContainer>
          <RootFormItem error={isEmail}>
            <Label>이메일</Label>
            <Input
              type="text"
              {...register("email", {
                required: VALIDATION_CHECK_VALUE.email.errorMessage,
                pattern: VALIDATION_CHECK_VALUE.email.regex
              })}
            />
          </RootFormItem>
          {isEmail === null ? (
            <GuideLabel>{GUIDE_MESSAGE.email}</GuideLabel>
          ) : null}
          {isEmail !== null && !isEmail ? (
            <ErrorLabel>{errors?.email?.message}</ErrorLabel>
          ) : null}
        </FormItemContainer>
        <FormItemContainer>
          <RootFormItem error={isUserName}>
            <Label>사용자 이름</Label>
            <Input
              type="text"
              {...register("userName", {
                required: VALIDATION_CHECK_VALUE.userName.errorMessage,
                pattern: VALIDATION_CHECK_VALUE.userName.regex
              })}
            />
          </RootFormItem>

          {isUserName === null ? (
            <GuideLabel>{GUIDE_MESSAGE.userName}</GuideLabel>
          ) : null}
          {isUserName !== null && !isUserName ? (
            <ErrorLabel>{errors?.userName?.message}</ErrorLabel>
          ) : null}
        </FormItemContainer>
        <FormItemContainer>
          <RootFormItem error={isName}>
            <Label>실명</Label>
            <Input
              type="text"
              {...register("name", {
                required: VALIDATION_CHECK_VALUE.name.errorMessage,
                pattern: VALIDATION_CHECK_VALUE.name.regex
              })}
            />
          </RootFormItem>
          {isName === null ? (
            <GuideLabel>{GUIDE_MESSAGE.name}</GuideLabel>
          ) : null}
          {isName !== null && !isName ? (
            <ErrorLabel>{errors?.name?.message}</ErrorLabel>
          ) : null}
        </FormItemContainer>
        <FormItemContainer>
          <RootFormItem error={isPassword}>
            <Label>비밀번호</Label>
            <Input
              type="password"
              {...register("password", {
                required: VALIDATION_CHECK_VALUE.joinPassword.errorMessage,
                pattern: VALIDATION_CHECK_VALUE.joinPassword.regex
              })}
            />
          </RootFormItem>
          {isPassword === null ? (
            <GuideLabel>{GUIDE_MESSAGE.password}</GuideLabel>
          ) : null}
          {isPassword !== null && !isPassword ? (
            <ErrorLabel>{errors?.password?.message}</ErrorLabel>
          ) : null}
        </FormItemContainer>
        <FormItemContainer>
          <RootFormItem error={isPassword2}>
            <Label>비밀번호 확인</Label>
            <Input
              id="password2"
              type="password"
              {...register("password2", {
                required: VALIDATION_CHECK_VALUE.password2.errorMessage,
                pattern: VALIDATION_CHECK_VALUE.password2.regex
              })}
            />
          </RootFormItem>
          {isPassword2 === null ? (
            <GuideLabel>{GUIDE_MESSAGE.password2}</GuideLabel>
          ) : null}
          {isPassword2 !== null && !isPassword2 ? (
            <ErrorLabel>{errors?.password2?.message}</ErrorLabel>
          ) : null}
        </FormItemContainer>
        <SubmitButton
          buttonType="block"
          disabled={isDisabled}
        >
          가입하기
        </SubmitButton>
      </form>
    </Wrapper>
  );
}

export default Join;
