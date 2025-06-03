<script setup lang="ts">
const props = defineProps<{ tasks: Task[] }>();

function toggleTask(task: Task) {
  task.done = !task.done;

  localStorage.setItem("tasks", JSON.stringify(props.tasks));
}

function deleteTask(task: Task) {
  props.tasks.splice(props.tasks.indexOf(task), 1);

  localStorage.setItem("tasks", JSON.stringify(props.tasks));
}
</script>

<template>
  <TransitionGroup name="list" tag="div" class="task-list">
    <article
      v-for="task in props.tasks"
      :key="task.id"
      :class="{ done: task.done }"
    >
      <h3>{{ task.title }}</h3>
      <div>
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleTask(task)"
        />
        <button @click="deleteTask(task)">Remove</button>
      </div>
    </article>
  </TransitionGroup>
</template>

<style scoped>
article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.done {
  background-color: green;
  text-decoration: line-through;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
