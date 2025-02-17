const express = require('express');
const tasksController = require('./tasksController');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database schema
async function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('✅ Tasks table ready.');
  } catch (err) {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
  }
}

// Routes
app.get('/api/tasks', tasksController.getTasks);
app.post('/api/tasks', tasksController.addTask);
app.patch('/api/tasks/:id/complete', tasksController.completeTask);
app.delete('/api/tasks/:id', tasksController.deleteTask);

// Start server after initializing DB
initDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
