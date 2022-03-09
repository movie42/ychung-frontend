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
}
ul,li {
    list-style:none ;
}
`;
