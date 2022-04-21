// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    "fontColor-dark": string;
    "fontColor-light": string;
    basicColor: string;
    lineColor: string;
    warnColor: string;
    sucessColor: string;
    grayBackgroundColor: string;
    "grayBackgroundColor-light": string;
    white: string;
    screen: {
      mobile: string;
      tablet: string;
      labtop: string;
      labtopLarge: string;
      desktop: string;
    };
  }
}
