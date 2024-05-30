package blog.backend.backend.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import blog.backend.backend.models.Notification;

public interface NotiRepository extends MongoRepository<Notification, String> {
    
}
