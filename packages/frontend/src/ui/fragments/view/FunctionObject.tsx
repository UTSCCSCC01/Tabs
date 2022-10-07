export class FunctionObject {

  myFunction: Function;
  argument: any;
  name: string;
  constructor(myFunction: Function, argument: any, name: string) {
    this.myFunction = myFunction;
    this.argument = argument;
    this.name = name;
  }
}
