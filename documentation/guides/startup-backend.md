
#  Spring Boot Startup Guide

Assuming **Spring Boot** and **Maven** are installed, follow these steps to start the backend.

### **1️⃣ Navigate to Backend Directory**
```sh
cd backend
```

### **2️⃣ Configure Database (If Needed)**
Ensure the correct **PostgreSQL** credentials are set in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### **3️⃣ Build the Project** *(Optional but recommended before running)*
```sh
mvn clean install
```

### **4️⃣ Start Spring Boot Application**
```sh
mvn spring-boot:run
```
- The backend will start on `http://localhost:8080`

### **5️⃣ Verify API is Running (Optional)**
Test with:
```sh
curl http://localhost:8080/actuator/health
```
If it returns `{"status":"UP"}`, Spring Boot is running successfully!



