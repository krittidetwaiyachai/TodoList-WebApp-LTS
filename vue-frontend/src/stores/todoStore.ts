// src/stores/todoStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3333/api'

export type Todo = {
  id: number
  title: string
  is_completed: boolean
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
  }),

  getters: {
    total: (state) => state.todos.length,
    done: (state) => state.todos.filter((t) => t.is_completed).length,
    active(): number {
      return this.total - this.done
    },
    percent(): number {
      return this.total ? Math.round((this.done / this.total) * 100) : 0
    },
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/todos`)
        this.todos = response.data
      } catch (error) {
        console.error('Failed to fetch todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addTodo(title: string) {
      if (!title.trim()) return
      this.loading = true
      try {
        const response = await axios.post(`${API_URL}/todos`, { title: title.trim() })
        this.todos.unshift(response.data)
      } catch (error) {
        console.error('Failed to add todo:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleTodoStatus(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (!todo) return

      this.loading = true
      try {
        const response = await axios.put(`${API_URL}/todos/${id}`, {
          title: todo.title,
          isCompleted: !todo.is_completed,
        })
        Object.assign(todo, response.data)
      } catch (error) {
        console.error('Failed to toggle todo status:', error)
      } finally {
        this.loading = false
      }
    },

    async updateTitle(id: number, title: string) {
      const todo = this.todos.find((t) => t.id === id)
      if (!todo || !title.trim() || todo.title === title.trim()) return

      this.loading = true
      try {
        const response = await axios.put(`${API_URL}/todos/${id}`, {
          title: title.trim(),
          isCompleted: todo.is_completed, // ส่งสถานะเดิมไป
        })
        Object.assign(todo, response.data)
      } catch (error) {
        console.error('Failed to update todo title:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteTodo(id: number) {
      this.loading = true
      try {
        await axios.delete(`${API_URL}/todos/${id}`)
        this.todos = this.todos.filter((t) => t.id !== id)
      } catch (error) {
        console.error('Failed to delete todo:', error)
      } finally {
        this.loading = false
      }
    },
  },
})