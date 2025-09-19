<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})

const stats = computed(() => {
  const total = todoStore.todos.length
  const done = todoStore.todos.filter(t => t.is_completed).length
  const active = total - done
  const percent = total ? Math.round((done / total) * 100) : 0
  return { total, done, active, percent }
})
</script>

<template>
  <main
    class="min-h-screen bg-white text-gray-900 selection:bg-[#A11D33]/20 selection:text-[#A11D33]"
  >
    <header class="pt-10 pb-6">
      <div class="mx-auto max-w-2xl px-4">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold tracking-tight text-[#A11D33]">
            Todo List
          </h1>
          <span
            class="rounded-full bg-[#A11D33]/10 px-3 py-1 text-sm font-semibold text-[#A11D33] ring-1 ring-inset ring-[#A11D33]/30"
          >
            {{ stats.percent }}% เสร็จแล้ว
          </span>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          Tasks for Today
        </p>
      </div>
    </header>

    <section class="mx-auto max-w-2xl px-4 pb-20">
      <div
        class="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-[#A11D33]/15"
      >
        <TodoForm />

         <transition-group
          name="list"
          tag="div"
          class="mt-5 space-y-2"
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0 -translate-y-1"
          >
            <TodoItem
              v-for="todo in todoStore.todos"
              :key="todo.id"
              :item="todo"
            />
          </transition-group>

        <div
          v-if="todoStore.todos.length === 0"
          class="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#A11D33]/40 p-10 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-[#A11D33]/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h8m-8 4h8m-8 4h5M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-5 2v-2.5A2 2 0 0 1 4 18V6z"
            />
          </svg>
          <p class="mt-3 text-gray-600">ไม่มีรายการที่ต้องทำ</p>
          <p class="text-sm text-gray-500">ลองเพิ่มรายการดูสักหน่อยมั้ย</p>
        </div>

        <div
          class="mt-6 grid grid-cols-3 gap-3 text-center text-sm text-gray-600"
        >
          <div class="rounded-xl bg-white p-3 ring-1 ring-inset ring-[#A11D33]/15">
            ทั้งหมด
            <div class="mt-1 text-xl font-semibold text-gray-900">
              {{ stats.total }}
            </div>
          </div>
          <div class="rounded-xl bg-white p-3 ring-1 ring-inset ring-[#A11D33]/15">
            ค้างอยู่
            <div class="mt-1 text-xl font-semibold text-[#A11D33]">
              {{ stats.active }}
            </div>
          </div>
          <div class="rounded-xl bg-white p-3 ring-1 ring-inset ring-[#A11D33]/15">
            เสร็จแล้ว
            <div class="mt-1 text-xl font-semibold text-emerald-600">
              {{ stats.done }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
