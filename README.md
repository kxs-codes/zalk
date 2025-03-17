# 📚 ZALK, Learning Enhancement System
## 📖 Overview
This project is a **dynamic, web-based learning enhancement system** designed to improve student engagement and assessment through quizzes. It allows **teachers to view student performance and context**, while enabling other stakeholders (students, administrators, and parents) to interact based on that information.

## 🚀 Features
- 📊 **Real-time Student Insights** – Teachers can track student progress and quiz performance.
- 📝 **Interactive Quizzes** – Students can take quizzes dynamically generated based on learning needs.
- 🔗 **Stakeholder Interaction** – Administrators, parents, and other stakeholders can access relevant insights.
- 🎨 **Modern UI/UX** – Built with TailwindCSS for a sleek, responsive design.
- ⚡ **Fast & Scalable** – Powered by Vite, React, and Spring Boot for performance and flexibility.

## 🛠️ Tech Stack
| Technology       | Purpose |
|-----------------|---------|
| **Vite**        | Development build tool for React |
| **React**       | Frontend framework for dynamic UI |
| **TailwindCSS** | Utility-first CSS framework for styling |
| **Spring Boot** | Backend framework for APIs & business logic |
| **PostgreSQL**  | Database for storing quiz data & user insights |

## 📂 Project Structure
```
/frontend   - React + Vite frontend (TailwindCSS for styling)
/backend    - Spring Boot backend with PostgreSQL integration
/database   - Database schema and migration scripts
/docs       - Documentation and API specifications
```

## 🏗️ Installation & Setup

### Prerequisites
- **Node.js** (for Vite & React)
- **Java 17+** (for Spring Boot)
- **PostgreSQL** (for database)

### 💻 Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Configure **PostgreSQL** database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_db
   spring.datasource.username=your_user
   spring.datasource.password=your_password
   ```
3. Build and run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```

### 🌐 Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## 🤝 Contributing
Soon to come! 

## 📜 License
Soon to come!
