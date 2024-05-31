package blog.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import blog.backend.models.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {
    
}
