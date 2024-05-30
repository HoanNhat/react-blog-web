package blog.backend.backend.services;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.backend.backend.models.Post;
import blog.backend.backend.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository repository;

    public List<Post> findAllPosts() {
        return repository.findAll();
    }

    public Post findPostById(String id) {
        return repository.findById(id).get();
    }

    public List<Post> findPostByTitle(String title) {
        return repository.findByTitle(title);
    }

    public List<Post> findPostsByUserId(String id) {
        return repository.findByUserId(id);
    }

    public Post addPost(Post post) {
        ObjectId userIdObjectId = new ObjectId(post.getUserIdString());
        post.setCreatedAt(new Date());
        post.setUpdatedAt(new Date());
        post.setLikes(0);
        post.setTags(post.getTags());;

        post.setUserId(userIdObjectId);
        post.setUserIdString(null);
        return repository.save(post);
    }

    public Post updatePost(Post post) {
        return repository.save(post);
    }

    public String deletePostById(String id) {
        repository.deleteById(id);
        return "Delete Successfull Post " + id;
    }
}
