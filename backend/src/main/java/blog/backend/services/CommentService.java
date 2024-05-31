package blog.backend.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import blog.backend.models.Comment;
import blog.backend.repository.CommentRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Comment addComment(Comment cmt, String userCommentId) {
        cmt.setCreatedAt(new Date());

        LookupOperation lookupOperation = LookupOperation.newLookup()
                            .from("users")
                            .localField(userCommentId)
                            .foreignField("_id")
                            .as("userComment");

        Aggregation aggregation = Aggregation.newAggregation(lookupOperation);
        System.out.println(aggregation);
        Comment results = mongoTemplate.aggregate(aggregation, "comments", Comment.class).getUniqueMappedResult();

        return repository.save(results);
    }

    // public List<Comment> findAllComments(String postID){
        
    //     System.out.println(results);

    //     return results;
    // }
}
