import { FunctionObject } from '../../fragments/view/FunctionObject';
import { FolderItemData } from './FolderItemData';

export class InventoryItem extends FolderItemData {
  capacity: number;
  expirationDate: string;
  categoryKey: string;
  type: string;
  tags: string[];
  constructor(itemName: string, type:string, expirationDate: string,  categoryKey: string) {
    super(itemName, "none", "", new FunctionObject(() => { }, null, itemName + "'s TouchFunction"));
    this.capacity = 1;
    this.type=type;
    this.expirationDate = expirationDate;
    this.categoryKey = categoryKey;
    this.tags=[]
  }

  getTags () {
    if (this.tags.length == 0) return "";
    var res=this.tags[0];
    for (var i=1; i < this.tags.length; i++){
      res+=", " + this.tags[i]; 
    }

    return res;
  }
}
