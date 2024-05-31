package blog.backend.models;

import java.util.Date;
import java.lang.String;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    private String id;

    private Date time = new Date();
    
    private String description = "";

    @NonNull
    private ObjectId fromPostId;

    @NonNull
    private ObjectId toUserId;
    
    @NonNull
    private ObjectId fromUserId;
     
}
