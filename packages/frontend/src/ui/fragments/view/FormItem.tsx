import { ReactElement } from 'react';



export class FormItem {

  id: string;
  title: string;
  component: ReactElement;
  constructor(title: string, id: string, component: ReactElement) {
    this.title = title;
    this.id = id;
    this.component = component;
  }

}
