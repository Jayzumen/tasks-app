<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ addTask: [newTask: string] }>();
const newTask = ref("");

const error = ref("");

function addTask() {
  if (newTask.value.trim()) {
    emit("addTask", newTask.value);
  } else {
    error.value = "Please enter a valid task";
  }
  newTask.value = "";
}
</script>

<template>
  <form @submit.prevent="addTask">
    <label for="newTask">
      Add a new Task
      <input
        v-model="newTask"
        type="text"
        name="newTask"
        id="newTask"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
      />
      <small v-if="error" id="invalid-helper">{{ error }}</small>
    </label>
    <div class="button-container">
      <button>Add</button>
    </div>
  </form>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: end;
}
</style>
