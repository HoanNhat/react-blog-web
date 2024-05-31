package blog.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import blog.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
}
