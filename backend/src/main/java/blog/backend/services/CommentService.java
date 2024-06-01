package blog.backend.services;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import blog.backend.models.Comment;
import blog.backend.models.User;
import blog.backend.repository.CommentRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;

    @Autowired
    private MongoTemplate mongo;
    
    @Autowired
    private UserService userRepository;

    public Comment addComment(Comment cmt, String userCommentId) {
        cmt.setCreatedAt(new Date());

        User userComment = userRepository.findUserById(userCommentId);
        cmt.setUserComment(userComment);

        return repository.save(cmt);
    }

    public List<Comment> findAllCommentsByPostId(String postID) {  
        return repository.findByPostId(postID);
    }

    public long countCommentOfPost(String postId) {
        Query query = new Query();
        ObjectId postObjectId = new ObjectId(postId);

        query.addCriteria(Criteria.where("postId").is(postObjectId));

        return mongo.count(query, Comment.class);
    }
}
