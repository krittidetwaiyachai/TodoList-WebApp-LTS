<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/stores/todoStore'
import { useTodoStore } from '@/stores/todoStore'

const props = defineProps<{ item: Todo }>()
const todoStore = useTodoStore()

const isEditing = ref(false)
const editTitle = ref(props.item.title)

const toggle = () => { if (!isEditing.value) todoStore.toggleTodoStatus(props.item.id) }
const del = () => todoStore.deleteTodo(props.item.id)

function startEdit() {
  isEditing.value = true
  editTitle.value = props.item.title
}
async function saveEdit() {
  const t = editTitle.value.trim()
  if (!t) return
  await todoStore.updateTitle(props.item.id, t)
  isEditing.value = false
}
function cancelEdit() {
  editTitle.value = props.item.title
  isEditing.value = false
}
</script>

<template>
  <li
    class="relative flex items-stretch gap-3 rounded-xl bg-white p-3 ring-1 ring-inset ring-[#A11D33]/20 transition hover:bg-[#A11D33]/5"
    :class="{ 'opacity-60': props.item.is_completed && !isEditing }"
  >
    <button
      type="button"
      @click.stop="toggle"
      class="self-center grid h-5 w-5 place-items-center flex-shrink-0 rounded-md ring-1 ring-inset transition outline-none
             focus-visible:ring-2 focus-visible:ring-[#A11D33] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      :class="props.item.is_completed ? 'bg-[#A11D33]/20 ring-[#A11D33]' : 'bg-white ring-gray-400'"
      :aria-pressed="props.item.is_completed"
      title="ทำแล้ว/ยัง"
    >
      <svg v-if="props.item.is_completed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#A11D33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
      </svg>
    </button>

    <div class="min-w-0 flex-1 pr-16 sm:pr-20">
      <button
        v-if="!isEditing"
        type="button"
        @click.stop="toggle"
        class="block w-full text-left"
      >
        <span
          class="break-words break-all whitespace-pre-line text-gray-900"
          :class="{ 'line-through text-gray-400': props.item.is_completed }"
        >
          {{ props.item.title }}
        </span>
      </button>

      <div v-else>
        <textarea
          v-model="editTitle"
          rows="3"
          class="w-full min-h-[84px] resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400
                 focus:border-[#A11D33] focus:outline-none focus:ring-2 focus:ring-[#A11D33]/30"
          placeholder="แก้ไขชื่อรายการ..."
          @keyup.enter.exact.prevent="saveEdit"
          @keyup.esc.prevent="cancelEdit"
        />
      </div>
    </div>

    <div class="pointer-events-none absolute right-2 top-2 flex w-14 sm:w-16 justify-end gap-1">
      <template v-if="!isEditing">
        <button
          type="button"
          @click.stop="startEdit"
          class="pointer-events-auto rounded-lg p-2 text-[#A11D33] hover:bg-[#A11D33]/10 hover:text-[#8E192C]"
          aria-label="แก้ไข"
          title="แก้ไข"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L8.25 18.463 4 20l1.537-4.25L16.862 3.487z" />
          </svg>
        </button>
        <button
          type="button"
          @click.stop="del"
          class="pointer-events-auto rounded-lg p-2 text-[#A11D33] hover:bg-[#A11D33]/10 hover:text-[#8E192C]"
          aria-label="ลบ"
          title="ลบ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6h18" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          @click.stop="saveEdit"
          class="pointer-events-auto rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
          aria-label="บันทึก"
          title="บันทึก"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </button>
        <button
          type="button"
          @click.stop="cancelEdit"
          class="pointer-events-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="ยกเลิก"
          title="ยกเลิก"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </template>
    </div>
  </li>
</template>
