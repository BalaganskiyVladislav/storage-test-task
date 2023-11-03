import FileFolder from "@/components/FileFolder.vue";
import FileItem from "@/components/FileItem.vue";
import { BaseStorageItem } from "@/types/storage";

export const getComponentByStorageItemType = (type: BaseStorageItem["type"]) =>
  type ? FileFolder : FileItem;
