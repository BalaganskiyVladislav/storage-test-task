<script setup lang="ts">
import {
  StorageFolder,
  StorageItemFinishEditingEventData,
} from "@/types/storage";
import FolderIcon from "@/components/global/icons/folderIcon.vue";
import EditIcon from "@/components/global/icons/editIcon.vue";
import TrashIcon from "@/components/global/icons/trashIcon.vue";
import SBtn from "@/components/global/SBtn.vue";
import { getComponentByStorageItemType } from "@/helpers/getComponentByStorageItemType";
import ChevronIcon from "@/components/global/icons/chevronIcon.vue";
import { computed, ComputedRef, Ref, ref } from "vue";
import EditableTitle from "@/components/global/EditableTitle.vue";

interface FileFolderProps {
  data: StorageFolder;
}

const props = defineProps<FileFolderProps>();
const emit = defineEmits<{
  edited: [{ title: string; id: number }];
  delete: [id: number];
}>();

const isFileFolderOpen: Ref<boolean> = ref(false);
const editing: Ref<boolean> = ref(false);

const fileFolderChevronIconDirection: ComputedRef<"bot" | "right"> = computed(
  () => (isFileFolderOpen.value ? "bot" : "right")
);

const isFileFolderHasChildren: ComputedRef<boolean> = computed(
  () => !!props.data.children.length
);

const toggleFileFolder = (): void => {
  isFileFolderOpen.value = !isFileFolderOpen.value;
};

const startEditingTitle = (): void => {
  editing.value = true;
};

type finishEditedEventData = string | StorageItemFinishEditingEventData;

const createFinishEditingEmit = (eventData: finishEditedEventData): void => {
  if (typeof eventData === "object") {
    emit("edited", { title: eventData.title, id: eventData.id });
  } else {
    emit("edited", { title: eventData, id: props.data.id });
  }
};

const createDeleteStorageEmit = (id: number): void => {
  emit("delete", id);
};

const finishEditingTitle = (eventData: finishEditedEventData): void => {
  createFinishEditingEmit(eventData);
  editing.value = false;
};
</script>

<template>
  <div class="folder">
    <div class="folder__wrap">
      <SBtn
        v-if="isFileFolderHasChildren"
        @click="toggleFileFolder"
        class="folder__open-btn"
      >
        <ChevronIcon
          class="folder__open-btn-icon"
          :direction="fileFolderChevronIconDirection"
        />
      </SBtn>
      <FolderIcon class="folder__icon" />
      <span class="folder__name">
        <EditableTitle
          @edited="finishEditingTitle"
          :title="props.data.name"
          :editing="editing"
        />
      </span>
      <div class="folder__actions">
        <SBtn
          v-if="!editing"
          @click="startEditingTitle"
          class="folder__edit-btn"
        >
          <EditIcon class="folder__edit-icon" />
        </SBtn>
        <SBtn
          @click="createDeleteStorageEmit(props.data.id)"
          class="folder__delete-btn"
        >
          <TrashIcon class="folder_delete--icon" />
        </SBtn>
      </div>
    </div>
    <div
      v-if="isFileFolderHasChildren && isFileFolderOpen"
      class="folder__children"
    >
      <component
        v-for="folderChild in props.data.children"
        @edited="finishEditingTitle"
        @delete="createDeleteStorageEmit"
        :key="folderChild.id"
        :is="getComponentByStorageItemType(folderChild.type)"
        :data="folderChild"
      />
    </div>
  </div>
</template>

<style lang="scss">
.folder {
  margin-bottom: var(--spacing-m);
  position: relative;

  &__wrap {
    display: flex;
    column-gap: var(--spacing-s);
    align-items: center;
  }

  &__open-btn {
    &-icon {
    }
  }

  &__icon {
    svg {
      width: var(--folder-icon-w);
      height: var(--folder-icon-h);
    }
  }

  &__actions {
    display: flex;
    column-gap: var(--spacing-s);
    margin-left: auto;
  }

  &__children {
    border-left: 1px solid var(--c-transparent);
    padding: var(--spacing-m) 0 0 var(--spacing-m);
  }
}
</style>
