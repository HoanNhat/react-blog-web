package blog.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import blog.backend.models.Post;

public interface PostRepository extends MongoRepository<Post, String>{
    @Query("{ \"title\": { $regex: /?0/i } }")
    List<Post> findByTitle(String title);

    @Query("{'userId': ObjectId('?0')}")
    List<Post> findByUserId(String userId);
}
