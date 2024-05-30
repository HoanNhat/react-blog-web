package blog.backend.backend.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    private String id;

    private String title;

    private String content;

    private String image;

    private String userIdString;

    private ObjectId userId;

    private User user;

    private List<String> tags;

    private Date createdAt;

    private String createdAtString;

    private Date updatedAt;

    private String updatedAtString;

    private Integer likes;

    // private List<Comment> comments;

}
