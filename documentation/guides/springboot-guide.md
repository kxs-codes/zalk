

## 🟢 Step 1: Domain (Model)

📘 **Definition**: Domain classes map to the database. They define the shape of the data.

✅ **What to do**:
- Create constructors, getters/setters
- Use PascalCase for the class name  
- Name it after the real-world object (e.g., `Classroom`)

```java
// src/main/java/com/example/project/domain/Classroom.java
package com.example.project.domain;

import jakarta.persistence.*;

@Entity
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int capacity;

    public Classroom() {}

    public Classroom(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    // Getters and setters...
}
```

---

## 🟡 Step 2: Controller

📘 **Definition**: The controller handles HTTP requests (`GET`, `POST`, etc.) and connects the frontend to backend logic.

✅ **What to do**:
- Use `@RestController` and define endpoints using `@GetMapping`, `@PostMapping`, etc.
- Accept input through parameters or request bodies
- Return data to frontend

```java
// src/main/java/com/example/project/controller/ClassroomController.java
package com.example.project.controller;

import com.example.project.domain.Classroom;
import com.example.project.service.ClassroomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @GetMapping
    public List<Classroom> getAllClassrooms() {
        return classroomService.getAllClassrooms();
    }

    @PostMapping
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomService.createClassroom(classroom);
    }
}
```

---

## 🔵 Step 3: Service

📘 **Definition**: The service layer contains business logic. It calls the repository and returns processed data to the controller.

✅ **What to do**:
- Create service classes for each domain
- Inject the repository
- Add specific logic methods here

```java
// src/main/java/com/example/project/service/ClassroomService.java
package com.example.project.service;

import com.example.project.domain.Classroom;
import com.example.project.repository.ClassroomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    public List<Classroom> getAllClassrooms() {
        return classroomRepository.findAll();
    }

    public Classroom createClassroom(Classroom classroom) {
        return classroomRepository.save(classroom);
    }
}
```

---

## 🔴 Step 4: Repository

📘 **Definition**: This layer interacts directly with the database.

✅ **What to do**:
- Extend `JpaRepository` or `CrudRepository`
- Auto-implement basic CRUD operations

```java
// src/main/java/com/example/project/repository/ClassroomRepository.java
package com.example.project.repository;

import com.example.project.domain.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    // You can add custom queries here if needed
}
```
