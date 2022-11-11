import { FunctionObject } from './FunctionObject';

//a lot of the app uses folders so i made this class to store data to put into a list for a listview that renders inside
//the folder image
export class FolderItemData {
  name: string;
  iconName: string;
  id: string;
  touchFunction: FunctionObject;
  constructor(text: string, iconName: string, id: string, touchFunction: FunctionObject) {
    this.name = text;
    this.iconName = iconName;
    this.id = id;
    this.touchFunction = touchFunction;
  }
}
