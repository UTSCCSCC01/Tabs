import { FunctionObject } from './FunctionObject';
import { FormItemList } from "./FormItemList";

export class FolderSvgForm {
  folder: FormItemList;
  swipeFunction: FunctionObject;
  constructor(folder: FormItemList, swipeFunction: FunctionObject) {
    this.folder = folder;
    this.swipeFunction = swipeFunction;
  }
}
