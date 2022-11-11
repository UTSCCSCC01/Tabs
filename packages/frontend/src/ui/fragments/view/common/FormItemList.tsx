import { FormItem } from "./FormItem";

export class FormItemList {
  list: FormItem[];
  title: string;

  constructor(list: FormItem[], title: string) {
    this.list = list;
    this.title = title;
  }
}
