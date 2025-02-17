// Updated main.js with PostgreSQL + Node.js integration

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', handleTaskAction);
document.addEventListener("DOMContentLoaded", fetchTasks);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

let savedTheme = localStorage.getItem('savedTheme') || 'standard';
changeTheme(savedTheme);

async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    tasks.forEach(task => renderTask(task));
}

async function addToDo(event) {
    event.preventDefault();
    const title = toDoInput.value;
    if (!title) {
        alert("You must write something!");
        return;
    }

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    const task = await response.json();
    renderTask(task);
    toDoInput.value = '';
}

function renderTask(task) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = task.title;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const timestamp = document.createElement('span');
    timestamp.textContent = `Added: ${task.created_at}`;
    timestamp.classList.add('task-timestamp');
    toDoDiv.appendChild(timestamp);

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn', `${savedTheme}-button`);
    checkBtn.dataset.id = task.id;
    checkBtn.innerHTML = '<img src="assets/check.png" class="icon"/>';
    toDoDiv.appendChild(checkBtn);

    if (task.completed_at) {
        const completedSpan = document.createElement('span');
        completedSpan.textContent = `Completed at: ${task.completed_at}`;
        completedSpan.classList.add('completion-timestamp');
        toDoDiv.appendChild(completedSpan);
        newToDo.style.textDecoration = 'line-through';
        checkBtn.style.display = 'none';
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn', `${savedTheme}-button`);
    deleteBtn.dataset.id = task.id;
    deleteBtn.innerHTML = '<img src="assets/trash.png" class="icon"/>';
    toDoDiv.appendChild(deleteBtn);

    toDoList.appendChild(toDoDiv);
}

async function handleTaskAction(event) {
    const target = event.target.closest('button');
    if (!target) return;

    const taskId = target.dataset.id;

    if (target.classList.contains('check-btn')) {
        await fetch(`/api/tasks/${taskId}/complete`, { method: 'PATCH' });
        location.reload();
    }

    if (target.classList.contains('delete-btn')) {
        await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
        target.parentElement.remove();
    }
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;

    document.body.className = color;

    const title = document.getElementById('title');
    title.classList.toggle('darker-title', color === 'darker');

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        const isCompleted = todo.classList.contains('completed');
        todo.className = `todo ${color}-todo${isCompleted ? ' completed' : ''}`;
    });

    document.querySelectorAll('.check-btn, .delete-btn, .todo-btn').forEach(btn => {
        if (btn.classList.contains('check-btn')) {
            btn.className = `check-btn ${color}-button`;
        } else if (btn.classList.contains('delete-btn')) {
            btn.className = `delete-btn ${color}-button`;
        } else if (btn.classList.contains('todo-btn')) {
            btn.className = `todo-btn ${color}-button`;
        }
    });
}

