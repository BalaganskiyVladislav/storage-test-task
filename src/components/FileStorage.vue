<script setup lang="ts">
import {
  StorageItem,
  StorageItemFinishEditingEventData,
} from "@/types/storage";
import { getComponentByStorageItemType } from "@/helpers/getComponentByStorageItemType";

interface FileStorageProps {
  storageData: StorageItem[];
}

const props = defineProps<FileStorageProps>();

const emit = defineEmits<{
  edited: [{ title: string; id: number }];
  delete: [id: number];
}>();

const createFinishEditingEmit = (
  data: StorageItemFinishEditingEventData
): void => {
  emit("edited", data);
};

const createDeleteEmit = (id: number): void => {
  emit("delete", id);
};
</script>

<template>
  <section class="storage">
    <div
      class="storage-item"
      v-for="storageItem in props.storageData"
      :key="storageItem.id"
    >
      <component
        @delete="createDeleteEmit"
        @edited="createFinishEditingEmit"
        :is="getComponentByStorageItemType(storageItem.type)"
        :data="storageItem"
      />
    </div>
  </section>
</template>

<style lang="scss">
.storage {
  min-width: 300px;
  max-height: 700px;
  background-color: var(--c-transparent);
  border-radius: var(--spacing-s);
  padding: var(--spacing-s);

  &-item {
    padding: var(--spacing-s) var(--spacing-m);
  }
}
</style>
