package blog.backend.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import blog.backend.models.Post;
import blog.backend.services.PostService;
import blog.backend.services.UserService;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    public PostService service;  
    @Autowired
    public UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@RequestBody Post post) {
        return service.addPost(post);
    }

    @GetMapping 
    public List<Post> getPost() {
        List<Post> posts = service.findAllPosts();

        SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        posts.forEach(post -> {
            String createdDateFormatted = outputFormat.format(post.getCreatedAt());
            String updatedDateFormatted = outputFormat.format(post.getUpdatedAt());

            post.setCreatedAtString(createdDateFormatted);
            post.setUpdatedAtString(updatedDateFormatted);
            
            post.setUser(userService.findUserById(post.getUserId().toString()));
        });

        return posts;
    }

    @GetMapping("/details/{postId}")
    public Post getPostById(@PathVariable String postId) {
        Post post = service.findPostById(postId);
        SimpleDateFormat outputFormat = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        String createdDateFormatted = outputFormat.format(post.getCreatedAt());
        String updatedDateFormatted = outputFormat.format(post.getUpdatedAt());

        post.setCreatedAtString(createdDateFormatted);
        post.setUpdatedAtString(updatedDateFormatted);
        
        post.setUser(userService.findUserById(post.getUserId().toString()));
        return post;
    }

    @GetMapping("/title/{postTitle}")
    public List<Post> getPostByTitle(@PathVariable String postTitle) {
        return service.findPostByTitle(postTitle);
    }

    @PutMapping()
    public HttpStatus updatePost(@RequestBody Post post) {            
        return service.updatePost(post);  
    }

    @PutMapping("/likes/{postId}")
    public HttpStatus likePost(@PathVariable String postId) {
        Post post = service.findPostById(postId);
        Integer curLikes = post.getLikes();

        post.setLikes(curLikes + 1);
        return service.updatePost(post);       
    }

    @DeleteMapping("/{postId}")
    public HttpStatus deletePost(@PathVariable String postId) {
        return service.deletePostById(postId);
    }
}
