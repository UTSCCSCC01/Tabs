import { FunctionObject } from '../../fragments/view/FunctionObject';

//a lot of the app uses folders so i made this class to store data to put into a list for a listview that renders inside
//the folder image
export class FolderItemData {
  text: string;
  iconName: string;
  id: string;
  touchFunction: FunctionObject;
  constructor(text: string, iconName: string, id: string, touchFunction: FunctionObject) {
    this.text = text;
    this.iconName = iconName;
    this.id = id;
    this.touchFunction = touchFunction;
  }
}
