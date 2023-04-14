export const VALIDATION_CHECK_VALUE = {
  email: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "이메일이 아닙니다."
  },
  password: {
    value: 8,
    message: "비밀번호는 8자 이상이어야합니다."
  },
  password2: {
    value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[_*&!+-]).{8,}$/,
    message: "비밀번호는 앞에 입력한 것과 같아야합니다."
  },
  userName: {
    value: /^[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]{5,10}$/,
    message: "사용자 이름은 한글, 영문, 숫자 조합 5자 이상 10자 이하여야합니다."
  },
  name: {
    value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/,
    message: "한글 2글자 이상 6글자 이하로 실명을 입력해주세요. "
  },
  joinPassword: {
    value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[_*&!+-]).{8,}$/,
    message:
      "비밀번호는 영소, 영대문자, 특수문자(_,*,&,!,+,-), 숫자 조합으로만 이루어질 수 있습니다. 최소 8자 이상이어야합니다."
  }
};
