

# Mapping and Flow of the files ( in this order) 

## Creation of Domains
- Definition of a *Domain*. A domain is the file to where everything is mapping to the to the database, and also the getters and setters for functions. 

### Must Haves for a Domain 

- Annotation
    - Research Springboot annotations, understand how springboot will identify them, and then compile them 
    - Pascal Case (First Letter will be capatalize)
    - Examples within `User.java`:
        - @Entity
        - @ID

- Variables

- Getters and Setters
    - Just the setting of it, not the full implementation 

## Creation of Repositories 
- Definition: Link the Domain to the Database

- Will extend either the JPA or CRUD (Create, Read, Update, Delete)
    - Research the differences 

- Example:
    ```
    // UserRepository.java

        @Repository
        public interface UserRepository extends JDA repo <User, Long>
                                                // JDA can be replaced with CRUD for different functionality. 

    ```

## Services 
- Defitions: Logics of the functions. 

- @autowired
    - shows you will be using a function for the user repo 

- Example 

```
@Service
public class userService {
    @Autowired
    privateUserRepository userRepo

    public user getUser(long id) {
        // `.findbyID` is a example of method from the JDA/CRUD will have 
        return userRepository.findbyID(id);
    }
}

```

## Controller
- Definitions: Connection to the frontend

- Example:

    ```
        @Controller
        @RequestMapping("/users")
        public class userController {
            @autowired
            privateUserService userServ;

        @GetMapping("/id)
            public user getPerson(Long id) {
                userService.getUser(id).else(null)
            }
        
        }


    ```