<script setup lang="ts">
import { computed, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";

const storedTasks = localStorage.getItem("tasks");

const tasks = ref<Task[]>(storedTasks ? JSON.parse(storedTasks) : []);

function addTask(task: string) {
  tasks.value.push({ id: crypto.randomUUID(), title: task, done: false });

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

const openTasks = computed(() => tasks.value.filter((task) => !task.done));

const filter = ref<"all" | "completed" | "open">("all");

const filteredTasks = computed(() => {
  if (filter.value === "completed") {
    return tasks.value.filter((task) => task.done);
  } else if (filter.value === "open") {
    return tasks.value.filter((task) => !task.done);
  } else {
    return tasks.value;
  }
});
</script>

<template>
  <main>
    <h1>Vue Task App</h1>
    <TaskForm @add-task="addTask" />

    <h2 v-if="!tasks.length">Add a task to get started</h2>
    <h2 v-else-if="tasks.length && openTasks.length">
      {{ tasks.length - openTasks.length }} / {{ tasks.length }}
      {{ tasks.length === 1 ? "task" : "tasks" }} open
    </h2>
    <h2 v-else>All tasks completed</h2>

    <div v-if="tasks.length" class="button-container-wrapper">
      <h3>Filter tasks</h3>
      <div class="button-container">
        <button @click="filter = 'all'">All</button>
        <button @click="filter = 'completed'">Completed</button>
        <button @click="filter = 'open'">Open</button>
      </div>

      <h3>Clear tasks</h3>
      <div class="button-container">
        <button @click="tasks = []">Clear all tasks</button>
        <button @click="tasks = tasks.filter((task) => !task.done)">
          Clear completed tasks
        </button>
        <button @click="tasks = tasks.filter((task) => task.done)">
          Clear open tasks
        </button>
      </div>
    </div>

    <TaskList :tasks="filteredTasks" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 800px;
  min-height: 100dvh;

  h1 {
    text-align: center;
    text-decoration: underline;
  }

  .button-container-wrapper {
    h3 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
}
</style>
