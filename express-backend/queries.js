const pool = require('./db')

const getTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createTodo = async (req, res) => {
  const { title } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO todos (title, is_completed) VALUES ($1, false) RETURNING *',
      [title]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateTodo = async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, isCompleted } = req.body
  try {
    const result = await pool.query(
      'UPDATE todos SET title = $1, is_completed = $2 WHERE id = $3 RETURNING *',
      [title, isCompleted, id]
    )
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id])
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }