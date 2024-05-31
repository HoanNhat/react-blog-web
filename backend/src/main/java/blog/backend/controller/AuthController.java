package blog.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.backend.models.User;
import blog.backend.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User input) {
        User userDetails = userService.findUserByEmail(input.getEmail());

        boolean checkPassInput = BCrypt.checkpw(input.getPassword(), userDetails.getPassword());
        if (checkPassInput) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(userDetails.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
