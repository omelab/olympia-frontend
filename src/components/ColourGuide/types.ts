export interface Room {
  name: string;
  image: string;
  component: string;
  leftImage: string;
  rightImage: string;
  leftWidth: number;
  leftHeight: number;
  rightWidth: number;
  rightHeight: number;
}

export interface Pattern {
  name: string;
  code: string;
  color: string;
  bg: string;
}

export interface Palette {
  title: string;
  style: string;
  background: string;
  childrens?: Pattern[];
}
