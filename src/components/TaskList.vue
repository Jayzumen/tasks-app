<script setup lang="ts">
const props = defineProps<{ tasks: Task[] }>();
function toggleTask(task: Task) {
  task.done = !task.done;

  localStorage.setItem("tasks", JSON.stringify(props.tasks));
}

function startEditing(task: Task) {
  task.editing = true;
}

function saveEdit(task: Task, newTitle: string) {
  task.title = newTitle;
  task.editing = false;
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
      v-for="(task, index) in props.tasks"
      :key="task.id"
      :class="[
        { done: task.done },
        index === props.tasks.length - 1 ? 'last-task' : 'other-task',
      ]"
    >
      <div v-if="task.editing">
        <input v-model="task.title" @keyup.enter="saveEdit(task, task.title)" />
      </div>
      <h3 v-else>{{ task.title }}</h3>
      <div class="button-container">
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleTask(task)"
        />
        <button
          v-if="!task.editing"
          @click="startEditing(task)"
          class="secondary"
        >
          Edit
        </button>
        <button v-else @click="task.editing = false" class="contrast">
          Cancel
        </button>
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

.button-container {
  gap: 1rem;
  display: flex;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.last-task.list-enter-from,
.last-task.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.other-task.list-enter-from,
.other-task.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
