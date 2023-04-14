import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${normalize}
html{
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size:10px;
}
body{
    font-size:1.5rem;
    overflow-x: hidden;
    overflow-y: auto;
}
input{
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
    }
}
ul,li {
    list-style:none ;
}
h1,h2,h3,h4,h5,h6,p{
    margin:0;
    padding:0;
    word-spacing: -0.3rem;
    word-break: keep-all;
}
`;
