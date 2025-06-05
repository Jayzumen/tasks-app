<script setup lang="ts">
import { computed, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";

const storedTasks = localStorage.getItem("tasks");

const tasks = ref<Task[]>(storedTasks ? JSON.parse(storedTasks) : []);
const filter = ref<TaskFilter>("all");

function addTask(task: string) {
  tasks.value.push({ id: crypto.randomUUID(), title: task, done: false });

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

const openTasks = computed(() => tasks.value.filter((task) => !task.done));

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "all":
      return tasks.value;
    case "done":
      return tasks.value.filter((task) => task.done);
    case "todo":
      return tasks.value.filter((task) => !task.done);
  }
  return tasks.value;
});

function setFilter(value: TaskFilter) {
  filter.value = value;
}
</script>

<template>
  <main>
    <h1>Vue Task App</h1>
    <TaskForm @add-task="addTask" />

    <h3 v-if="!tasks.length">Add a task to get started</h3>
    <h3 v-else-if="tasks.length && openTasks.length">
      {{ tasks.length - openTasks.length }} / {{ tasks.length }}
      {{ tasks.length === 1 ? "task" : "tasks" }} open
    </h3>
    <h3 v-else>All tasks completed</h3>

    <div v-if="tasks.length" class="button-container-wrapper">
      <div class="button-container-layout">
        <h4>Filter tasks</h4>
        <div class="button-container">
          <FilterButton
            :currentFilter="filter"
            filter="all"
            @set-filter="setFilter"
          />
          <FilterButton
            :currentFilter="filter"
            filter="todo"
            @set-filter="setFilter"
          />
          <FilterButton
            :currentFilter="filter"
            filter="done"
            @set-filter="setFilter"
          />
        </div>
      </div>

      <div class="button-container-layout">
        <h4>Clear tasks</h4>
        <div class="button-container">
          <button @click="tasks = []">Clear all</button>
          <button
            class="secondary"
            @click="tasks = tasks.filter((task) => !task.done)"
          >
            Clear completed
          </button>
          <button
            class="contrast"
            @click="tasks = tasks.filter((task) => task.done)"
          >
            Clear open
          </button>
        </div>
      </div>
    </div>

    <TaskList :tasks="filteredTasks" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 800px;
  min-height: 100dvh;

  h1 {
    text-align: center;
    text-decoration: underline;
  }

  .button-container-wrapper {
    .button-container-layout {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    h4 {
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
