<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
const todoStore = useTodoStore()
const newTodoTitle = ref('')
function handleSubmit() {
  if (!newTodoTitle.value.trim()) return
  todoStore.addTodo(newTodoTitle.value.trim())
  newTodoTitle.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="group grid w-full grid-cols-[1fr_auto] gap-2">
    <div
      class="relative flex items-center rounded-xl bg-white pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-[#A11D33]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="pointer-events-none absolute left-3 h-5 w-5 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>

      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="เพิ่มรายการใหม่..."
        class="w-full rounded-xl bg-transparent py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
    </div>

    <button
      type="submit"
      :disabled="!newTodoTitle.trim()"
      class="rounded-xl bg-[#A11D33] px-5 py-3 font-semibold text-white shadow-md transition hover:bg-[#8E192C] disabled:cursor-not-allowed disabled:opacity-40"
    >
      เพิ่ม
    </button>
  </form>
</template>
