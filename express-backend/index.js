const express = require('express')
const cors = require('cors')
const db = require('./queries')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get('/api/todos', db.getTodos)
app.post('/api/todos', db.createTodo)
app.put('/api/todos/:id', db.updateTodo)
app.delete('/api/todos/:id', db.deleteTodo)

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`)
})