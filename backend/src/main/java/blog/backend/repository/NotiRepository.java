package blog.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import blog.backend.models.Notification;

public interface NotiRepository extends MongoRepository<Notification, String> {
    
}
