package blog.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import blog.backend.models.Comment;
import blog.backend.services.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    public CommentService service;  

    // @GetMapping
    // @ResponseStatus(HttpStatus.CREATED)
    // public List<Comment> findAllComments(@RequestBody String postId) {
    //     return service.findAllComments(postId);
    // }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createComment(@RequestBody Comment cmt, @RequestParam String userCommentId) {
        return service.addComment(cmt, userCommentId);
    }
}
