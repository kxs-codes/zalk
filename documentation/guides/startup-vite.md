
##  Vite Startup Guide

Assuming all dependencies and tools are already installed, follow these steps to start the project.

### **1️⃣ Navigate to Project Directory**
Open a terminal and move to the project root directory:
```sh
cd /learning-enhancment-system/
```

### **2️⃣ Start the Backend (Spring Boot)**
```sh
cd backend
mvn spring-boot:run
```
- Ensure the backend starts without errors and is running on `http://localhost:8080`

### **3️⃣ Start the Frontend (Vite)**
```sh
cd frontend
npm run dev
```
- The frontend should start on `http://localhost:5173`

### **4️⃣ Verify Connection**
- Visit `http://localhost:5173` in your browser to confirm the app is running.
- Use an API testing tool (like Postman) to check the backend at `http://localhost:8080/api-endpoint`

