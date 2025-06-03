<script lang="ts" setup>
const props = defineProps<{
  filter: TaskFilter;
  currentFilter: TaskFilter;
}>();

const emits = defineEmits<{
  setFilter: [filter: TaskFilter];
}>();
</script>

<template>
  <button
    class="secondary"
    @click="emits('setFilter', props.filter)"
    :class="{
      contrast: props.currentFilter === props.filter,
    }"
  >
    {{ props.filter }}
  </button>
</template>
