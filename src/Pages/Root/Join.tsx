import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Input, Label, SEO } from "@/Components";
import { useJoin, useValidate } from "@/Pages/Root/hooks";
import { VALIDATION_CHECK_VALUE } from "@/Pages/Root/lib/validationCheckValue";
import {
  Wrapper,
  ErrorLabel,
  SubmitButton,
  RootFormItem,
  FormItemContainer
} from "@/Pages/Root/Root.styles";
import axios from "axios";

const MessageContainer = styled.div`
  margin-top: -8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

interface SubmitProps {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}

interface CheckValue {
  event: React.ChangeEvent<HTMLInputElement>;
  type: "email" | "name" | "userName" | "joinPassword" | "password2";
}

function Join() {
  const [email, setEamil] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {
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
  } = useValidate();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SubmitProps>();

  const { mutate: joinMutate, isSuccess } = useJoin();

  const onSubmit = handleSubmit(async (data: SubmitProps) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        {
          message: "앞에서 입력한 비밀번호와 같아야합니다."
        },
        { shouldFocus: true }
      );
      return;
    }

    joinMutate(data);
  });

  const checkValueFromServer = async (
    value: string,
    type: "email" | "userName"
  ) => {
    try {
      const check = await axios.get(`/api/user/checked-db?${type}=${value}`);

      const { exist } = check.data;

      if (!exist) {
        return true;
      }

      throw check;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const checkChangeValueForValidate = ({ event, type }: CheckValue) => {
    const value = event.currentTarget.value;
    const checkValue = VALIDATION_CHECK_VALUE[`${type}`].value.test(value);
    return checkValue;
  };

  const validateEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEamil(e.currentTarget.value);

    const checkValue = checkChangeValueForValidate({
      event: e,
      type: "email"
    });

    if (checkValue) {
      const canUseValue = await checkValueFromServer(
        e.currentTarget.value,
        "email"
      );

      if (canUseValue) {
        setIsEmail(canUseValue);
        setError("email", { message: "" });
      } else {
        setIsEmail(canUseValue);
        setError("email", {
          message: "이미 다른 사람이 사용중이에요."
        });
      }
    }

    if (isEmail !== null && !checkValue) {
      setIsEmail(false);
      setError("email", { message: VALIDATION_CHECK_VALUE.email.message });
    }
  };
  const validateUserName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);

    const checkValue = checkChangeValueForValidate({
      event: e,
      type: "userName"
    });

    if (checkValue) {
      const canUseValue = await checkValueFromServer(
        e.currentTarget.value,
        "userName"
      );

      if (canUseValue) {
        setIsUserName(canUseValue);
        setError("userName", { message: "" });
      } else {
        setIsUserName(canUseValue);
        setError("userName", {
          message: "이미 다른 사람이 사용중이에요."
        });
      }
    }

    if (isUserName !== null && !checkValue) {
      setIsUserName(false);
      setError("userName", {
        message: VALIDATION_CHECK_VALUE.userName.message
      });
    }
  };

  useEffect(() => {
    if (isEmail && isPassword && isPassword2 && isUserName && isName) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [isEmail, isPassword, isPassword2, isUserName, isName]);

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
    <>
      <SEO title="회원가입" keywords="회원가입" />
      <Wrapper>
        <h1>회원가입</h1>
        <form onSubmit={onSubmit}>
          <FormItemContainer>
            <RootFormItem error={isEmail}>
              <Label>이메일</Label>
              <Input
                type="text"
                value={email}
                {...register("email", {
                  required: "이메일을 입력해야합니다.",
                  pattern: VALIDATION_CHECK_VALUE.email,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    validateEmail(e)
                })}
              />
            </RootFormItem>
            <ErrorLabel error={isEmail}>
              {isEmail === null
                ? "사용하고 있는 이메일을 입력해주세요."
                : errors?.email?.message}
            </ErrorLabel>
          </FormItemContainer>
          <FormItemContainer>
            <RootFormItem error={isUserName}>
              <Label>사용자 이름</Label>
              <Input
                type="text"
                value={userName}
                {...register("userName", {
                  required: VALIDATION_CHECK_VALUE.userName.message,
                  pattern: VALIDATION_CHECK_VALUE.userName,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    validateUserName(e)
                })}
              />
            </RootFormItem>
            <ErrorLabel error={isUserName}>
              {isUserName === null
                ? "사용자 이름은 한글, 영문, 숫자 조합 5자 이상 10자 이하로 입력해주세요."
                : errors?.userName?.message}
            </ErrorLabel>
          </FormItemContainer>
          <FormItemContainer>
            <RootFormItem error={isName}>
              <Label>실명</Label>
              <Input
                type="text"
                {...register("name", {
                  required: VALIDATION_CHECK_VALUE.name.message,
                  pattern: VALIDATION_CHECK_VALUE.name,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const checkValue = checkChangeValueForValidate({
                      event: e,
                      type: "name"
                    });
                    if (checkValue) {
                      setIsName(checkValue);
                      setError("name", { message: "" });
                    }
                    if (isName !== null && !checkValue) {
                      setIsName(false);
                      setError("name", {
                        message: VALIDATION_CHECK_VALUE.name.message
                      });
                    }
                  }
                })}
              />
            </RootFormItem>
            <ErrorLabel error={isName}>
              {isName === null
                ? VALIDATION_CHECK_VALUE.name.message
                : errors?.name?.message}
            </ErrorLabel>
          </FormItemContainer>
          <FormItemContainer>
            <RootFormItem error={isPassword}>
              <Label>비밀번호</Label>
              <Input
                type="password"
                {...register("password", {
                  required: VALIDATION_CHECK_VALUE.joinPassword.message,
                  pattern: VALIDATION_CHECK_VALUE.joinPassword,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.currentTarget.value);
                    const checkValue = checkChangeValueForValidate({
                      event: e,
                      type: "joinPassword"
                    });
                    if (checkValue) {
                      setIsPassword(checkValue);
                      setError("password", { message: "" });
                    }
                    if (isPassword !== null && !checkValue) {
                      setIsPassword(false);
                      setError("password", {
                        message: VALIDATION_CHECK_VALUE.joinPassword.message
                      });
                    }
                  }
                })}
              />
            </RootFormItem>
            <ErrorLabel error={isPassword}>
              {isPassword === null
                ? VALIDATION_CHECK_VALUE.joinPassword.message
                : errors?.password?.message}
            </ErrorLabel>
          </FormItemContainer>
          <FormItemContainer>
            <RootFormItem error={isPassword2}>
              <Label>비밀번호 확인</Label>
              <Input
                id="password2"
                type="password"
                {...register("password2", {
                  required: VALIDATION_CHECK_VALUE.password2.message,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (password === e.currentTarget.value) {
                      setIsPassword2(true);
                      setError("password2", { message: "" });
                      return;
                    }
                    setIsPassword2(false);
                    setError("password2", {
                      message: VALIDATION_CHECK_VALUE.password2.message
                    });
                  }
                })}
              />
            </RootFormItem>
            <ErrorLabel error={isPassword2}>
              {isPassword2 === null
                ? "앞에서 입력한 비밀번호와 같은 값을 입력해주세요."
                : errors?.password2?.message}
            </ErrorLabel>
          </FormItemContainer>
          <SubmitButton buttonType="block" disabled={isDisabled}>
            가입하기
          </SubmitButton>
        </form>
      </Wrapper>
    </>
  );
}

export default Join;
