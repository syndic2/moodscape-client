interface ThemeColor {
    primary: string,
    primaryRgb: string,
    primaryContrast: string,
    primaryContrastRgb: string,
    primaryShade: string,
    primaryTint: string
  };
  
  export interface Theme {
    Id: string,
    name: string,
    //imgUrl: string,
    colors: ThemeColor,
    isActive: boolean
  };