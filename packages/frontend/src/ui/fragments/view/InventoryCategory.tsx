import { FunctionObject } from './FunctionObject';
import { FolderItemData } from './FolderItemData';

export class InventoryCategory extends FolderItemData {
  inventoryKey: string;
  description: string;
  categoryName:string;
  constructor(categoryName: string, description: string, inventoryKey: string) {
    super(categoryName, "", "1000", new FunctionObject(() => { }, null, categoryName + "'s TouchFunction"));
    this.inventoryKey = inventoryKey;
    this.description = description;
    this.categoryName = this.name
  }
}
