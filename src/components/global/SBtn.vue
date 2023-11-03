<script setup lang="ts">
import { _RouterLinkI, RouterLink } from "vue-router";
import { computed, ComputedRef } from "vue";

interface BtnProps {
  to?: string | null;
}

const props = withDefaults(defineProps<BtnProps>(), {
  to: null,
});

const isComponent: ComputedRef<string | _RouterLinkI> = computed(() =>
  props.to ? RouterLink : "button"
);
const isType: ComputedRef<string | null> = computed(() =>
  isComponent.value != "button" ? null : "button"
);
</script>

<template>
  <component :is="isComponent" class="btn" :type="isType" :to="to">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.btn {
  margin: 0;
  padding: 0;
  display: block;
  background: transparent;
  outline: none;
  border: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}
</style>
