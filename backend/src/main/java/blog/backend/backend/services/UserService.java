package blog.backend.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.backend.backend.models.User;
import blog.backend.backend.models.Post;
import blog.backend.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    public PostService postService;

    public List<User> findAllUsers() {
        return repository.findAll();
    }

    public List<Post> findPostsByUserId(String id) {
        return postService.findPostsByUserId(id);
    }

    public User findUserById(String id) {
        return repository.findById(id).get();
    }

    public User findUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User addUser(User user) {
        return repository.save(user);
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

    public String deleteUserById(String id) {
        repository.deleteById(id);
        return "Delete Successfull User " + id;
    }
    
}
