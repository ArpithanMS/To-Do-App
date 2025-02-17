# 📝 To-Do App: Full-Stack with Node.js, Flask, PostgreSQL, Docker, and EC2

## 🚀 Project Overview
This repository hosts a full-stack to-do application designed to demonstrate modern web development practices with a robust and scalable architecture.

### 🌐 Live Demo
Accessible via the AWS EC2 public IP (replace with your IP).

## 🛠️ Tech Stack
- **Backend:** Node.js & Flask
- **Database:** PostgreSQL
- **Frontend:** Node.js with Nginx
- **Containerization:** Docker & Docker Compose
- **Deployment:** AWS EC2 with Nginx & Gunicorn
- **CI/CD:** GitHub Actions

---

## 📋 Features
- 🗂️ **Task Management:** Add, complete, and delete tasks effortlessly.
- ⏱️ **Timestamp Tracking:** Track task creation and completion times.
- 🔍 **Status Monitoring:** Monitor task statuses (pending/completed).
- 🛠️ **Scalability:** Easily extendable for production environments.
- ⚙️ **Automated Deployment:** GitHub Actions pipeline for continuous deployment.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ArpithanMS/To-Do-App.git
cd To-Do-App
```

### 2️⃣ Configure Environment Variables
Create a `.env` file for your environment-specific settings:
```bash
DATABASE_URL=postgresql://postgres:password@db:5432/todo_db
SECRET_KEY=your_secret_key
```

### 3️⃣ Run with Docker Compose
```bash
docker-compose up --build -d
```

### 4️⃣ Access the App
- Frontend: `http://<EC2-PUBLIC-IP>`
- Backend API: `http://<EC2-PUBLIC-IP>:5000`

---

## 🚚 Deployment Pipeline (GitHub Actions)

### 🔑 Prerequisites
- Add the following secrets to your GitHub repository:
  - `EC2_HOST`: Public IP of your EC2 instance.
  - `EC2_USER`: Default is `ubuntu`.
  - `EC2_KEY`: SSH private key for EC2.

### 📄 Workflow Overview
- On each `push` to the `main` branch, the workflow:
  1. Checks out the code.
  2. SSHs into the EC2 instance.
  3. Pulls the latest code.
  4. Restarts the Docker containers.

### 🚀 Deployment Command
No manual steps needed after pushing to `main`. GitHub Actions handles it automatically.

---

## 🧩 Project Structure
```bash
.
├── backend/       # Node.js backend code
├── frontend/      # Frontend with Nginx
├── docker-compose.yml # Docker configuration
└── README.md      # Project documentation
```

---

## 🔍 API Endpoints

### 1️⃣ Get All Tasks
```http
GET /api/tasks
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "completed",
    "created_at": "2024-02-17T10:00:00",
    "completed_at": "2024-02-18T14:30:00"
  }
]
```

### 2️⃣ Add a Task
```http
POST /api/tasks
```
**Body:**
```json
{
  "title": "Finish project",
  "description": "Submit by Monday"
}
```

### 3️⃣ Complete a Task
```http
PUT /api/tasks/:id/complete
```

### 4️⃣ Delete a Task
```http
DELETE /api/tasks/:id
```

---

## 🛟 Troubleshooting

- **Docker Issues:**
  - Check container logs:
    ```bash
    docker-compose logs -f
    ```

- **Database Connection:**
  - Verify `DATABASE_URL` in `.env` matches the service name in `docker-compose.yml`.

- **GitHub Actions Failures:**
  - Inspect workflow logs directly in GitHub.

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

---

## 📜 License
This project is licensed under the MIT License.


