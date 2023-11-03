export interface BaseStorageItem {
  id: number;
  type: 1 | 0;
  name: string;
  parentID: number | null;
}

export interface StorageFile extends BaseStorageItem {
  type: 0;
}

export interface StorageFolder extends BaseStorageItem {
  type: 1;
  children: Array<StorageFile | StorageFolder>;
}

export type StorageItem = StorageFile | StorageFolder;

export type StorageItemFinishEditingEventData = { title: string; id: number };
