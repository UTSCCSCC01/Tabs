import { FunctionObject } from '../../fragments/view/FunctionObject';






export class HeaderData {
  title: string;
  backFunction: FunctionObject;
  constructor(title: string, backFunction: FunctionObject) {
    this.backFunction = backFunction;
    this.title = title;
  }
}
