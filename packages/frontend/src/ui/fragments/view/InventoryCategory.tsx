import { FunctionObject } from './FunctionObject';
import { FolderItemData } from './FolderItemData';

export class InventoryCategory extends FolderItemData {
  inventoryKey: string;
  description: string;
  categoryName:string;
  isRestricted: boolean;
  constructor(categoryName: string, description: string, isRestricted: boolean, inventoryKey: string) {
    super(categoryName, "", "1000", new FunctionObject(() => { }, null, categoryName + "'s TouchFunction"));
    this.inventoryKey = inventoryKey;
    this.description = description;
    this.isRestricted = isRestricted;
    this.categoryName = this.name
  }
}
