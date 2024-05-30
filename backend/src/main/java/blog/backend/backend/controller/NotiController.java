package blog.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import blog.backend.backend.models.Notification;
import blog.backend.backend.services.NotiService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/notifications")
public class NotiController {
    @Autowired
    public NotiService service;  

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Notification createNoti(@RequestBody Notification noti) {
        return service.addNoti(noti);
    }
}
