import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { useFetch } from "../../utils/customhooks/useFetch";
import { postOrPatchRequest } from "../../utils/utilities/httpMethod";
import { LoginProps, loginState } from "../../state/Authrization";

import Button from "../../components/Buttons/Button";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import FormItem from "../../components/Form/FormItem";
import SEO from "../../components/SEO/SEO";
import usePostOrPatch from "../../utils/customhooks/usePost";
import { FetchDataProps } from "../../lib/interface";
import Loading from "../../components/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 8rem;
  form {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    height: inherit;
    width: 100%;
    max-width: 90rem;
  }
`;

const LoginButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 10rem;
  font-size: 2rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.primary400};
`;

const FormItemContainer = styled.div`
  margin-bottom: 2rem;
`;

interface LoginType {
  email: string;
  password: string;
}

function Login() {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>();

  const {
    mutate,
    isLoading,
    isSuccess,
    data: response,
  } = usePostOrPatch<FetchDataProps<LoginProps>, Error, LoginType>({
    url: `/api/login`,
    queryKey: "login",
    method: "POST",
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      const { data } = response;
      if (data) {
        setIsLogin(data);
        localStorage.setItem("ycUser", JSON.stringify(data));
        navigate("/");
      }
    }
  }, [isSuccess]);

  return (
    <>
      <SEO title="로그인" />
      <Wrapper>
        <h1>로그인</h1>
        {/* {error?.message && <Label>{error?.message}</Label>} */}
        <form onSubmit={onSubmit}>
          <FormItemContainer>
            <FormItem>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "이메일이 아닙니다.",
                  },
                })}
              />
            </FormItem>
            <Label>{errors?.email?.message}</Label>
          </FormItemContainer>
          <FormItemContainer>
            <FormItem>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "비밀번호를 입력하세요" })}
              />
            </FormItem>
            <Label>{errors?.password?.message}</Label>
          </FormItemContainer>
          <LoginButton buttonType="block">로그인</LoginButton>
        </form>
      </Wrapper>
    </>
  );
}

export default Login;
