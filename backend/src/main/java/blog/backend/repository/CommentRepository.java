package blog.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import blog.backend.models.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {
    @Query("{'postId': ObjectId('?0')}")
    List<Comment> findByPostId(String postId);
}
