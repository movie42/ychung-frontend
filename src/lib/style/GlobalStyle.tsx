import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;900&display=swap');
${normalize}
html{
    font-family:'Noto Sans KR', sans-serif;
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
