package blog.backend.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import blog.backend.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
}
