<script setup lang="ts">
import FileStorage from "@/components/FileStorage.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { StorageItemFinishEditingEventData } from "@/types/storage";

const store = useStore();

const storageData = computed(() => store.state.storage);

const setNewTitleForStorageItem = (
  data: StorageItemFinishEditingEventData
): void => {
  store.dispatch("updateStorageItemName", {
    id: data.id,
    name: data.title,
  });
};

const deleteStorageItemById = (id: number): void => {
  store.dispatch("deleteStorageItemById", id);
};
</script>

<template>
  <div class="main">
    <div class="container">
      <FileStorage
        v-if="storageData.length"
        @delete="deleteStorageItemById"
        @edited="setNewTitleForStorageItem"
        :storage-data="storageData"
      />
      <h1 v-else>Папок и файлов нет :(</h1>
    </div>
  </div>
</template>
