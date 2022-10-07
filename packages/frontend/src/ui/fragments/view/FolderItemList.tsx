import { FolderItemData } from './FolderItemData';
import { InventoryItem } from './InventoryItem';
import { InventoryCategory } from './InventoryCategory';

//list of the above class with a title... basically all u need for the folder composition
//technically i could make the data class abstract so that we can use it across all folder images as a couple have
//different structures but not right now cuz i am lazy
export class FolderItemList {
  list: InventoryItem[] | InventoryCategory[] | FolderItemData[];
  title: string;
  constructor(list: InventoryItem[] | InventoryCategory[] | FolderItemData[], title: string) {
    this.list = list;
    this.title = title;
  }
}
