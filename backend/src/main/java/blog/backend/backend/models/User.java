package blog.backend.backend.models;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.lang.String;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    private String email;

    private String bio = "";

    private Map<String, String> social = new HashMap<>() {{
        put("facebook", "");
        put("twitter", "");
        put("linkedin", "");
    }};

    private Date createdAt;
    
    private String image = "";
    
    private String fullName = "";
    
    @NonNull
    private String password;
    
    @NonNull
    private String userName;
    
    private Date birthday;
    
    private boolean isActive = true;
    
    private String[] roles = new String[]{"user"};
    
}
