import { DescBoxData } from './DescBoxData';

//react wouldnt let me pass a normal list of the box data class so 
//i had to make another class just to hold the list and pass that
export class DescBoxList {
  data: DescBoxData[];

  constructor(dbl: DescBoxData[]) {
    this.data = dbl;
  }
}
