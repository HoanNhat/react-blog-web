package blog.backend.backend.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCrypt;

import blog.backend.backend.models.User;
import blog.backend.backend.models.Post;
import blog.backend.backend.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {
    @Autowired
    public UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        System.out.println(user.getPassword());
        return service.addUser(user);
    }

    @GetMapping 
    public List<User> getUser() {
        List<User> users = service.findAllUsers();

        SimpleDateFormat outputFormat = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        users.forEach(user -> {
            // String createdDateFormatted = outputFormat.format(user.getCreatedAt());

            // user.setCreatedAtString(createdDateFormatted);
            
        });

        return users;
    }

    @GetMapping("/details/{userId}")
    public User getUserById(@PathVariable String userId) {
        User user = service.findUserById(userId);
        SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        // String createdDateFormatted = outputFormat.format(user.getCreatedAt());

        // user.setCreatedAtString(createdDateFormatted);
            
        return user;
    }

    @GetMapping("/posts/{userId}")
    public List<Post> getAllUserPosts(@PathVariable String userId) {
        List<Post> posts = service.findPostsByUserId(userId);

        SimpleDateFormat outputFormat = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        posts.forEach(post -> {
            String createdDateFormatted = outputFormat.format(post.getCreatedAt());
            String updatedDateFormatted = outputFormat.format(post.getUpdatedAt());

            post.setCreatedAtString(createdDateFormatted);
            post.setUpdatedAtString(updatedDateFormatted);
        });

        return posts;
    }

    @PutMapping()
    public User updateUser(@RequestBody User user) {
        return service.updateUser(user);       
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable String userId) {
        return service.deleteUserById(userId);
    }
}
