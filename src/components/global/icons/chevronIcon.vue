<script setup lang="ts">
import { computed, ComputedRef } from "vue";

interface ChevronIconProps {
  direction: "top" | "bot" | "left" | "right";
}

const props = defineProps<ChevronIconProps>();

const chevronIconDirectionClass: ComputedRef<string> = computed(
  () => `chevron-icon_${props.direction}`
);
</script>

<template>
  <i class="chevron-icon" :class="chevronIconDirectionClass">
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 3.86981L7.67552 0.258435C7.97851 -0.0861448 8.46976 -0.0861448 8.77276 0.258435C9.07575 0.603016 9.07575 1.16169 8.77276 1.50627L5.04862 5.74156C4.74562 6.08614 4.25438 6.08614 3.95138 5.74156L0.227245 1.50627C-0.0757485 1.16169 -0.0757485 0.603016 0.227244 0.258436C0.530237 -0.0861445 1.02149 -0.0861445 1.32448 0.258436L4.5 3.86981Z"
        fill="white"
      />
    </svg>
  </i>
</template>

<style scoped lang="scss">
.chevron-icon {
  &_top {
    transform: rotate(180deg);
  }

  &_left {
    transform: rotate(90deg);
  }

  &_right {
    transform: rotate(-90deg);
  }
}
</style>
