import { FunctionObject } from '../../fragments/view/FunctionObject';
import { FolderItemList } from './FolderItemList';

export class FolderSvgClass {
  folder: FolderItemList;
  swipeFunction: FunctionObject;
  itemFunction: FunctionObject;
  constructor(folder: FolderItemList, swipeFunction: FunctionObject, itemFunction: FunctionObject) {
    this.folder = folder;
    this.swipeFunction = swipeFunction;
    this.itemFunction = itemFunction;
  }
}
