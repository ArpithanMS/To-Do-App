const pool = require('./db');

// Get all tasks
exports.getTasks = async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
};

// Add a new task
exports.addTask = async (req, res) => {
    const { title } = req.body;
    const result = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    res.json(result.rows[0]);
};

// Mark a task as completed
exports.completeTask = async (req, res) => {
    const { id } = req.params;
    const completedAt = new Date();
    const result = await pool.query(
        'UPDATE tasks SET completed_at = $1 WHERE id = $2 RETURNING *',
        [completedAt, id]
    );
    res.json(result.rows[0]);
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
};
