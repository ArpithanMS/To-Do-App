const { Pool } = require('pg');

// Connect to PostgreSQL using Docker service name 'db'
const pool = new Pool({
    user: 'postgres',
    host: 'db', // Docker Compose service name
    database: 'todo_db',
    password: 'Setup',
    port: 5432,
});

module.exports = pool;
