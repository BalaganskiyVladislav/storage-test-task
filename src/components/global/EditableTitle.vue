<script setup lang="ts">
import { Ref, ref } from "vue";

interface EditableTitleProps {
  editing: boolean;
  title: string;
}

const props = defineProps<EditableTitleProps>();
const emit = defineEmits<{
  edited: [title: string];
}>();
const editedTitle: Ref<string> = ref(props.title);

const createFinishEditingEmit = (newTitle: string): void => {
  if (props.editing) {
    emit("edited", newTitle);
  }
};
</script>

<template>
  <div class="editable-title">
    <span class="editable-title__text" v-if="!editing">
      {{ title }}
    </span>
    <input
      class="editable-title__input"
      ref="input"
      v-else
      type="text"
      v-model="editedTitle"
      @blur="createFinishEditingEmit(editedTitle)"
      @keydown.enter.stop.prevent="createFinishEditingEmit(editedTitle)"
    />
  </div>
</template>

<style scoped lang="scss">
.editable-title {
  &__input {
    background: transparent;
    color: var(--c-white);

    &:focus {
      color: var(--c-white);
      outline: none;
      border: none;
    }
  }
}
</style>
