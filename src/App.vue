<script setup lang="ts">
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskItem from "./components/TaskList.vue";

const message = ref("Tasks App");
const tasks = ref<Task[]>([]);

function addTask(task: string) {
  tasks.value.push({ id: crypto.randomUUID(), title: task, done: false });
}
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask" />
    <h2>{{ tasks.length }} tasks open</h2>
    <TaskItem :tasks />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem auto;
  max-width: 800px;
  min-height: 100dvh;
}
</style>
