import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Wrapper,
  ErrorLabel,
  SubmitButton,
  RootFormItem,
  FormItemContainer
} from "@/page/Root/Root.styles";
import { VALIDATION_CHECK_VALUE } from "@/page/Root/lib/validationCheckValue";
import { Label, Input, SEO } from "@/components";
import { useLogin, useValidate } from "@/page/Root/hooks";

interface LoginFormVariable {
  email: string;
  password: string;
}

function Login() {
  const {
    isEmail,
    isPassword,
    setIsEmail,
    setIsPassword,
    isDisabled,
    setIsDisabled
  } = useValidate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<LoginFormVariable>();

  const { mutate: loginMutate } = useLogin();

  const onSubmit = handleSubmit((data) => {
    loginMutate(data, {
      onError: (error) => {
        const status = error?.response?.status as number;
        if (status >= 400) {
          setError("password", {
            message: "존재하지 않는 회원이거나 비밀번호가 다른 것 같아요."
          });
          setIsPassword(false);
        }
      }
    });
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    const checkValue = VALIDATION_CHECK_VALUE.email.value.test(email);
    if (checkValue) {
      setIsEmail(checkValue);
      setError("email", { message: "" });
    }
    if (isEmail !== null && !checkValue) {
      setIsEmail(false);
      setError("email", { message: "이메일이 아닙니다." });
    }
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    if (password.length >= 8) {
      setIsPassword(true);
      setError("password", {
        message: ""
      });
      return;
    }
    if (isPassword !== null && password.length < 8) {
      setIsPassword(false);
      setError("password", {
        message: "비밀번호는 8자 이상이어야합니다."
      });
    }
  };

  useEffect(() => {
    if (isEmail && isPassword) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [isEmail, isPassword]);

  return (
    <>
      <SEO title="로그인" />
      <Wrapper>
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <FormItemContainer>
            <RootFormItem error={isEmail}>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: VALIDATION_CHECK_VALUE.email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeEmail(e)
                })}
              />
            </RootFormItem>
            <ErrorLabel>{errors?.email?.message}</ErrorLabel>
          </FormItemContainer>
          <FormItemContainer>
            <RootFormItem error={isPassword}>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangePassword(e)
                })}
              />
            </RootFormItem>
            <ErrorLabel>{errors?.password?.message}</ErrorLabel>
          </FormItemContainer>
          <SubmitButton buttonType="block" disabled={isDisabled}>
            로그인
          </SubmitButton>
        </form>
      </Wrapper>
    </>
  );
}

export default Login;
