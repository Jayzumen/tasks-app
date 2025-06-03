<script setup lang="ts">
const props = defineProps<{ tasks: Task[] }>();
</script>

<template>
  <article v-for="task in props.tasks" :key="task.id">
    <h3>{{ task.title }}</h3>
  </article>
</template>
