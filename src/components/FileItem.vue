<script setup lang="ts">
import { StorageFile } from "@/types/storage";
import FileIcon from "@/components/global/icons/fileIcon.vue";
import EditIcon from "@/components/global/icons/editIcon.vue";
import TrashIcon from "@/components/global/icons/trashIcon.vue";
import SBtn from "@/components/global/SBtn.vue";
import EditableTitle from "@/components/global/EditableTitle.vue";
import { Ref, ref } from "vue";

interface FileItemProps {
  data: StorageFile;
}

const props = defineProps<FileItemProps>();

const emit = defineEmits<{
  edited: [{ title: string; id: number }];
  delete: [id: number];
}>();

const editing: Ref<boolean> = ref(false);

const startEditingTitle = (): void => {
  editing.value = true;
};

const createFinishEditingEmit = (newTitle: string): void => {
  emit("edited", { title: newTitle, id: props.data.id });
};

const finishEditingTitle = (newTitle: string): void => {
  createFinishEditingEmit(newTitle);
  editing.value = false;
};

const createDeleteEvent = (): void => {
  emit("delete", props.data.id);
};
</script>

<template>
  <div class="file">
    <FileIcon class="file__icon" />
    <span class="file__name">
      <EditableTitle
        @edited="finishEditingTitle"
        :title="props.data.name"
        :editing="editing"
      />
    </span>
    <div class="file__actions">
      <SBtn v-if="!editing" @click="startEditingTitle" class="file__edit-btn">
        <EditIcon class="file__edit-icon" />
      </SBtn>
      <SBtn @click="createDeleteEvent" class="file__delete-btn">
        <TrashIcon class="file__delete-icon" />
      </SBtn>
    </div>
  </div>
</template>

<style lang="scss">
.file {
  margin-bottom: var(--spacing-m);
  position: relative;
  display: flex;
  align-items: center;

  &__icon {
    svg {
      width: var(--folder-icon-w);
      height: var(--folder-icon-h);
    }
  }

  &__name {
    margin: 0 var(--spacing-s);
  }

  &__actions {
    display: flex;
    column-gap: var(--spacing-s);
    margin-left: auto;
  }
}
</style>
