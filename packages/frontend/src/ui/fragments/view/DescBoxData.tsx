//template for the rounded corner boxes across the ui with 3 parts, 1 icon and 2 strings
export class DescBoxData {
  iconName: string;
  text1: string;
  text2: string;

  constructor(iconName: string, text1: string, text2: string) {
    this.iconName = iconName;
    this.text1 = text1;
    this.text2 = text2;
  }
}
